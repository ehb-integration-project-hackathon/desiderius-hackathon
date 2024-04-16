from odoo import models, fields, api
import pika
import json

class ResPartner(models.Model):
    _inherit = 'res.partner'

    @api.model
    def create(self, vals):
        new_partner = super(ResPartner, self).create(vals)
        self.send_user_webhook(new_partner, 'odoo_created_user')
        return new_partner

    @api.model
    def write(self, vals):
        res = super(ResPartner, self).write(vals)
        if res:
            self.send_user_webhook(self, 'odoo_updated_user')
        return res

    def unlink(self):
        self.send_user_webhook(self, 'odoo_deleted_user')
        return super(ResPartner, self).unlink()

    def send_user_webhook(self, partner, event_type):
        # Connect to RabbitMQ server
        connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
        channel = connection.channel()

        # Create XML message
        xml_message = self.create_xml_message(partner, event_type)

        # Publish XML message to RabbitMQ queue
        channel.basic_publish(exchange='', routing_key='odoo-queue', body=xml_message)

        # Close connection
        connection.close()

    def create_xml_message(self, partner, event_type):
        # Construct XML message according to the schema
        user_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
        user_xml += '<user xmlns="http://www.example.com/user">\n'
        user_xml += ' <id>{}</id>\n'.format(partner.id)
        user_xml += ' <firstName>{}</firstName>\n'.format(partner.name)
        user_xml += ' <lastName>Unknown</lastName>\n'
        user_xml += ' <email>{}</email>\n'.format(partner.email or "")
        user_xml += ' <phoneNumber>{}</phoneNumber>\n'.format(partner.phone or "")
        user_xml += ' <birthDate>2000-01-01</birthDate>\n'
        user_xml += ' <companyName>Unknown</companyName>\n'
        user_xml += ' <personalAddress>\n'
        user_xml += ' <id>0</id>\n'
        user_xml += ' <street>{}</street>\n'.format(partner.street or "")
        user_xml += ' <streetNumber>{}</streetNumber>\n'.format("") # Use street_number field
        user_xml += ' <city>{}</city>\n'.format(partner.city or "")
        user_xml += ' <zip>{}</zip>\n'.format(partner.zip or "")
        user_xml += ' <country>Unknown</country>\n'
        user_xml += ' </personalAddress>\n'
        user_xml += ' <companyAddress>\n'
        user_xml += ' <id>0</id>\n'
        user_xml += ' <street>Unknown</street>\n'
        user_xml += ' <streetNumber>1</streetNumber>\n'
        user_xml += ' <city>Unknown</city>\n'
        user_xml += ' <zip>00000</zip>\n'
        user_xml += ' <country>Unknown</country>\n'
        user_xml += ' </companyAddress>\n'
        user_xml += ' <event_type>{}</event_type>\n'.format(event_type)
        user_xml += '</user>\n'
        return user_xml