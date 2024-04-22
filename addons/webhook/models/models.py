from odoo import models, fields, api
import pika
import json
import datetime
import uuid

class WebhookWebhook(models.Model):
    _name = 'webhook.webhook'
    _description = 'Webhook Webhook'

    name = fields.Char('name', required=True)
    uid = fields.Char('uid')  # Define custom_id as a Char field to store the custom ID


class ResPartner(models.Model):
    _inherit = 'res.partner'

    uid = fields.Char('uid', unique=True)  # Define custom_id as a Char field to store the custom ID
    @api.model
    def create(self, vals):
        print("UPdate called 1")

        context = self._context or {}
        if context.get('bypass_webhook', False):
            new_partner = super(ResPartner, self).create(vals)
        else:
            # Generate a new UUID if uid is not provided
            if 'uid' not in vals or not vals['uid']:
                vals['uid'] = str(uuid.uuid4())  # Generate a new UUID
            print("UPdate called 2")

            new_partner = super(ResPartner, self).create(vals)
            self.send_user_webhook(new_partner, 'Create')

        return new_partner

    @api.model
    def create2(self, vals):
        new_partner = self.env['res.partner'].create(vals)
        print("create2 called")
        #self.send_user_webhook(new_partner, 'Create')
        return new_partner

    @api.model
    def write(self, vals):
        print("UPdate called")
        if 'uid' in vals:
            uid = vals.pop('uid')
            partners_to_update = self.env['res.partner'].sudo().search([('uid', '=', uid)])
            if partners_to_update:
                res = partners_to_update.write(vals)
                if res:
                    self.send_user_webhook(uid, 'Create')
                    self.send_user_webhook(uid, 'Update')

                return res
            else:
                return False
        else:
            res = super(ResPartner, self).write(vals)
            self.send_user_webhook(self.uid, 'Create')
            self.send_user_webhook(self.uid, 'Update')

            return res

    def unlink(self,uid):
        self.send_user_webhook(self, 'Delete')
        return super(ResPartner, self).unlink()


    def send_user_webhook(self, uid, crud_tag):
        # Connect to RabbitMQ server
        connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
        channel = connection.channel()

        # Get the partner record using the uid
        partner = self.env['res.partner'].sudo().search([('uid', '=', str(uid))], limit=1)

        # Check if a partner with the given uid exists
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
            # Handle the case when no partner is found with the given uid
            # You can log an error or take appropriate action here
            pass

        # Close connection
        connection.close()

    def create_xml_message(self, partner, crud_tag):
        # Construct XML message according to the schema
        user_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
        user_xml += '<User xmlns="http://www.example.com/user">\n'
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
        user_xml += ' <Uid>{}</Uid>\n'.format(partner.uid or "")
        user_xml += '</User>\n'
        return user_xml
