from odoo import models, fields, api
import pika
import datetime
import requests
import json
import logging

_logger = logging.getLogger(__name__)
class WebhookWebhook(models.Model):
    _name = 'webhook.webhook'
    _description = 'Webhook Webhook'

    name = fields.Char('name', required=True)
    Uuid = fields.Char('Uuid')  # Define custom_id as a Char field to store the custom ID


class ResPartner(models.Model):
    _inherit = 'res.partner'

    Uuid = fields.Char('Uuid', unique=True)  # Define custom_id as a Char field to store the custom ID

    @api.model
    def create(self, vals):
        # Check if the bypasshook flag is set to true in the context
        context = self._context or {}
        if context.get('bypass_webhook', False):
            new_partner = super(ResPartner, self).create(vals)
            return new_partner

        # Generate a new UUID using the UuidService
        headers = {'Content-Type': 'application/json'}
        print("Received vals:", vals)



        # Use default values if vals is empty or missing keys
        last_name = vals.get("LastName", "Default Last Name")
        street = vals.get("street", "Default Street")
        bus = vals.get("bus", "")
        city = vals.get("city", "Default City")
        zip_code = vals.get("zip", "12345")
        country = vals.get("country", "Belgium")
        email = vals.get("email", "default@example.com")
        first_name = vals.get("name", "Default First Name")

        # Create the data dictionary
        data = {
            "LastName": last_name,
            "Address": {
                "Street": street,
                "Bus": bus,
                "City": city,
                "Zip": zip_code,
                "Country": country
            },
            "Email": email,
            "FirstName": first_name,
        }

        response = requests.post('http://springamqp:8083/new-Odoouser', headers=headers, json=data)
        response_data = response.json()

        # Extract the uuid from the response data
        uuid = response_data.get('uuid')

        vals['Uuid'] = uuid
        print("Successful created=" + uuid)

        self.send_user_webhook(vals['Uuid'], 'Create')

        # Create the partner record with the generated UUID
        new_partner = super(ResPartner, self).create(vals)
        return new_partner
    @api.model
    def create2(self, vals):
        new_partner = self.env['res.partner'].create(vals)
        print("create2 called")
        #self.send_user_webhook(new_partner, 'Create')
        return new_partner

    @api.model
    def write(self, vals):
        res = super(ResPartner, self).write(vals)

        # Iterate over each updated partner record
        for partner in self:

            # Extract the UUID of the updated partner
            uuid = partner.Uuid

            # Prepare the data to be updated
            data = {
                "LastName": "Default Lastname",
                "Address": {
                    "Street": partner.street,
                    "Bus": "Default Bus",
                    "City": partner.city,
                    "Zip": partner.zip,
                    "Country": "Default Country"
                },
                "Email": partner.email,
                "FirstName": partner.name

            }

            # Send a request to update the user information
            headers = {'Content-Type': 'application/json'}
            response = requests.put(f'http://springamqp:8083/Odoo-update-user/{uuid}', headers=headers, json=data)
            self.send_user_webhook(partner.Uuid, 'Update')




        return res

    def unlink(self):
        for partner in self:
            self.send_user_webhook(partner.Uuid, 'Delete')
            # Assuming `uuid` is the UUID of the user you want to delete
            uuid = partner.Uuid

            # URL for the delete endpoint
            delete_url = f"http://springamqp:8083/delete-Odoouser/{uuid}"

            # Send DELETE request to delete user
            response = requests.delete(delete_url)

            # Print response
            print(response.text)

        return super(ResPartner, self).unlink()

    def send_user_webhook(self, Uuid, crud_tag):
        # Connect to RabbitMQ server
        connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
        channel = connection.channel()

        # Get the partner record using the Uuid
        partner = self.env['res.partner'].sudo().search([('Uuid', '=', str(Uuid))], limit=1)

        # Check if a partner with the given Uuid exists
        if partner:
            # Create XML message
            xml_message = self.create_xml_message(partner, crud_tag)

            # Publish XML message to RabbitMQ queue
            channel.basic_publish(exchange='', routing_key='fossBilling-queue', body=xml_message)
            channel.basic_publish(exchange='', routing_key='elastic-queue', body=xml_message)
            channel.basic_publish(exchange='', routing_key='salesforce-queue', body=xml_message)
            channel.basic_publish(exchange='', routing_key='sendgrid-queue', body=xml_message)
            channel.basic_publish(exchange='', routing_key='wordpress-queue', body=xml_message)
        else:
            # Handle the case when no partner is found with the given Uuid
            # You can log an error or take appropriate action here
            pass

        # Close connection
        connection.close()

    def create_xml_message(self, partner, crud_tag):
        # Construct XML message according to the schema
        user_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
        user_xml += '<User>\n'
        user_xml += ' <Uuid>{}</Uuid>\n'.format(partner.Uuid or "")
        user_xml += ' <FirstName>{}</FirstName>\n'.format(partner.name)
        user_xml += ' <LastName>Unknown</LastName>\n'
        user_xml += ' <BirthDate>2000-01-01</BirthDate>\n'
        user_xml += ' <Email>{}</Email>\n'.format(partner.email or "")
        user_xml += ' <Address>\n'
        user_xml += '  <Street>{}</Street>\n'.format(partner.street or "")
        user_xml += '  <Bus></Bus>\n'  # Optional element, leave it empty
        user_xml += '  <City>{}</City>\n'.format(partner.city or "")
        user_xml += '  <Zip>{}</Zip>\n'.format(partner.zip or "")
        user_xml += '  <Country>Unknown</Country>\n'
        user_xml += ' </Address>\n'
        user_xml += ' <Timestamp>{}</Timestamp>\n'.format(datetime.datetime.now().isoformat())
        user_xml += ' <CRUD>{}</CRUD>\n'.format(crud_tag)
        user_xml += '</User>\n'
        _logger.info("ODOO request=%s", user_xml)
        return user_xml