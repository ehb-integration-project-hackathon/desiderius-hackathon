from odoo import http, _
from odoo.http import request
from odoo.exceptions import ValidationError
import json
import xml.etree.ElementTree as ET
from odoo.http import Response


class PartnerController(http.Controller):
    @http.route('/api/partners', auth="public", type="http", methods=['POST'], csrf=False)
    def create_partner(self, **kw):

        try:
            print("Request HTTP data:")
            print(request.httprequest.data)

            # Extract XML data from the request
            xml_data = ET.fromstring(request.httprequest.data)

            print("Received XML data:")

            ET.dump(xml_data)            # Handle namespaces

            # Extract required parameters from the XML data using namespaces
            first_name = xml_data.find('.//FirstName')
            print("First Name:", first_name.text if first_name is not None else "Not Found")

            last_name = xml_data.find('.//LastName')
            print("LAST Name:", last_name.text if first_name is not None else "Not Found")

            birth_date = xml_data.find('.//BirthDate')
            email = xml_data.find('.//Email')
            print("EMAIL:", email.text if first_name is not None else "Not Found")
            Uuid = xml_data.find('.//Uuid')

            # Extract address data
            address_element = xml_data.find('.//Address')
            if address_element is not None:
                street = address_element.find('.//Street')
                city = address_element.find('.//City')
                zip_code = address_element.find('.//Zip')
                country = address_element.find('.//Country')
            else:
                # Set default dummy address values
                street = "Unknown"
                city = "Unknown"
                zip_code = "00000"
                country = "Unknown"

            # Validate required fields
            if not (first_name.text and last_name.text and email.text):
                raise ValidationError(_("First name, last name, and email are required"))
            # Check if a partner with the same UID already exists
            existing_partner = request.env['res.partner'].sudo().search([('Uuid', '=', Uuid.text)], limit=1)
            if existing_partner:
                raise ValidationError(_("A partner with the same UID already exists"))
            # Create a new partner record

            partner = request.env['res.partner'].with_context(bypass_webhook=True).sudo().create2({
                'name': f"{first_name.text} {last_name.text}",
                'email': email.text,
                'phone': '',  # Assuming phone number is not provided in XML
                'street': street.text,
                'city': city.text,
                'zip': zip_code.text,
                'country_id': request.env['res.country'].search([('name', '=', country)], limit=1).id,
                'Uuid': Uuid.text,
                # Add other fields as needed
            })
            # Return success response with the ID of the created partner
            response_data = f"""
                <response>
                    <result>{partner.Uuid}</result>
                    <message>Successfully created partner</message>
                </response>
            """
            return Response(response_data, content_type='application/xml')

        except ValidationError as ve:
            # Return an XML response with validation error
            error_response = f"""
                <response>
                    <result>False</result>
                    <message>{str(ve)}</message>
                </response>
            """
            return Response(error_response, content_type='application/xml', status=400)

        except Exception as e:
            # Return an XML response with exception details
            error_response = f"""
                    <response>
                        <result>False</result>
                        <message>An error occurred: {str(e)}</message>
                    </response>
                """
            return Response(error_response, content_type='application/xml', status=500)



    @http.route('/api/partners/<string:Uuid>', auth="public", type="http", methods=['PUT'], csrf=False)
    def update_partner(self, Uuid, **kwargs):
        try:
            # Extract XML data from the request
            xml_data = ET.fromstring(request.httprequest.data)

            # Handle namespaces
            namespace = {'ns': 'http://www.example.com/user'}

            # Extract required parameters from the XML data using namespaces
            first_name = xml_data.find('.//ns:FirstName', namespace)
            last_name = xml_data.find('.//ns:LastName', namespace)
            email = xml_data.find('.//ns:Email', namespace)
            print("First Name:", first_name.text if first_name is not None else "Not Found")
            address_element = xml_data.find('.//ns:Address', namespace)
            if address_element is not None:
                street = address_element.find('.//ns:Street', namespace)
                city = address_element.find('.//ns:City', namespace)
                zip_code = address_element.find('.//ns:Zip', namespace)
                country = address_element.find('.//ns:Country', namespace)
            else:
                # Set default dummy address values
                street = "Unknown"
                city = "Unknown"
                zip_code = "00000"
                country = "Unknown"

            # Extract address data
            address_element = xml_data.find('.//ns:Address', namespace)
            if address_element is not None:
                street = address_element.find('.//ns:Street', namespace)
                city = address_element.find('.//ns:City', namespace)
                zip_code = address_element.find('.//ns:Zip', namespace)
                country = address_element.find('.//ns:Country', namespace)

            # Prepare the update values
            update_vals = {
                'name': f"{first_name.text} {last_name.text}",
                'email': email.text,
                'street': street.text if street is not None else False,
                'city': city.text if city is not None else False,
                'zip': zip_code.text if zip_code is not None else False,
                'country_id': request.env['res.country'].search([('name', '=', country.text if country is not None else False)], limit=1).id,
            }
            # Find the partner to update using the uid field
            partner = request.env['res.partner'].sudo().search([('Uuid', '=', Uuid)], limit=1)
            if not partner:
                return Response(json.dumps({'result': False, 'message': _("Partner not found")}), content_type='application/json', status=404)

            # Update the partner
            partner.write(update_vals)

            return Response(json.dumps({'result': True, 'message': _("Partner updated successfully")}), content_type='application/json')

        except Exception as e:
            return Response(json.dumps({'result': False, 'message': _(f"Error updating partner: {str(e)}")}), content_type='application/json', status=500)



    @http.route('/api/partners/<string:Uuid>', auth="public", type="http", methods=['DELETE'], csrf=False)
    def delete_partner(self, Uuid):
        try:
            # Find the partner to delete using the uid field
            partner = request.env['res.partner'].sudo().search([('Uuid', '=', Uuid)], limit=1)
            if not partner:
                return Response(json.dumps({'result': False, 'message': _("Partner not found")}), content_type='application/json', status=404)

            # Delete the partner
            partner.unlink()  # No need to pass Uuid here

            return Response(json.dumps({'result': True, 'message': _("Partner deleted successfully")}), content_type='application/json')

        except Exception as e:
            return Response(json.dumps({'result': False, 'message': _(f"Error deleting partner: {e}")}), content_type='application/json', status=500)

