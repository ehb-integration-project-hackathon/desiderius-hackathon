# import math

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
            namespace = {'ns': 'http://www.example.com/user'}

            # Extract required parameters from the XML data using namespaces
            first_name = xml_data.find('.//ns:FirstName', namespace)
            print("First Name:", first_name.text if first_name is not None else "Not Found")

            last_name = xml_data.find('.//ns:LastName', namespace)
            print("LAST Name:", last_name.text if first_name is not None else "Not Found")

            birth_date = xml_data.find('.//ns:BirthDate', namespace)
            email = xml_data.find('.//ns:Email', namespace)
            print("EMAIL:", email.text if first_name is not None else "Not Found")
            uid = xml_data.find('.//ns:Uid', namespace)

            # Extract address data
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

            # Validate required fields
            if not (first_name.text and last_name.text and email.text):
                raise ValidationError(_("First name, last name, and email are required"))
            # Check if a partner with the same UID already exists
            existing_partner = request.env['res.partner'].sudo().search([('uid', '=', uid.text)], limit=1)
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
                'uid': uid.text,
                # Add other fields as needed
            })
            # Return success response with the ID of the created partner
            response_data = f"""
                <response>
                    <result>{partner.uid}</result>
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



    @http.route('/api/partners/<string:uid>', auth="public", type="http", methods=['PUT'], csrf=False)
    def update_partner(self, uid, **kwargs):
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
            partner = request.env['res.partner'].sudo().search([('uid', '=', uid)], limit=1)
            if not partner:
                return Response(json.dumps({'result': False, 'message': _("Partner not found")}), content_type='application/json', status=404)

            # Update the partner
            partner.write(update_vals)

            return Response(json.dumps({'result': True, 'message': _("Partner updated successfully")}), content_type='application/json')

        except Exception as e:
            return Response(json.dumps({'result': False, 'message': _(f"Error updating partner: {str(e)}")}), content_type='application/json', status=500)


    # @http.route('/api/partners/<int:partner_id>', auth="public", type="http", methods=['DELETE'], csrf=False)
    # def delete_partner(self, partner_id):
    #     try:
    #         # Find the partner to delete
    #         partner = request.env['res.partner'].sudo().browse(partner_id)
    #         if not partner:
    #             return Response(json.dumps({'result': False, 'message': _("Partner not found")}), content_type='application/json', status=404)
    #
    #         # Delete the partner
    #         partner.unlink()
    #
    #         return Response(json.dumps({'result': True, 'message': _("Partner deleted successfully")}), content_type='application/json')
    #
    #     except Exception as e:
    #         return Response(json.dumps({'result': False, 'message': _(f"Error deleting partner: {e}")}), content_type='application/json', status=500)
    @http.route('/api/partners/<string:uid>', auth="public", type="http", methods=['DELETE'], csrf=False)
    def delete_partner(self, uid):
        try:
            # Find the partner to delete using the uid field
            partner = request.env['res.partner'].sudo().search([('uid', '=', uid)], limit=1)
            if not partner:
                return Response(json.dumps({'result': False, 'message': _("Partner not found")}), content_type='application/json', status=404)

            # Delete the partner
            partner.unlink(uid)

            return Response(json.dumps({'result': True, 'message': _("Partner deleted successfully")}), content_type='application/json')

        except Exception as e:
            return Response(json.dumps({'result': False, 'message': _(f"Error deleting partner: {e}")}), content_type='application/json', status=500)



# from odoo import http, _
# from odoo.http import request
# from odoo.exceptions import ValidationError
# import json

# class PartnerController(http.Controller):
#
#     @http.route('/api/model/partners', auth="public", type="json", methods=['POST'], csrf=False)
#     def create_partner(self, **kw):
#         try:
#             # Retrieve JSON data from the request
#             json_data = json.loads(request.httprequest.data)
#             print(json_data)
#             # Extract required parameters from the JSON data
#             name = json_data.get('name')
#             email = json_data.get('email')
#             phone = json_data.get('phone')
#
#             # Validate required fields using the res.partner model
#             partner = request.env['res.partner'].sudo().new({
#                 'name': name,
#                 'email': email,
#                 'phone': phone,
#             })
#            # partner.validate()
#
#             # Create the new partner record
#             new_partner = request.env['res.partner'].sudo().create({
#                 'name': name,
#                 'email': email,
#                 'phone': phone,
#                 # Add other fields as needed
#             })
#
#             # Return success response with the ID of the created partner
#             return {
#                 'result': new_partner.id,
#                 'message': _("Successfully created partner")
#             }
#         except ValidationError as ve:
#             return {
#                 'result': False,
#                 'message': str(ve)
#             }
#         except Exception as e:
#             return {
#                 'result': False,
#                 'message': _(f"An error occurred: {e}")
#             }






# -*- coding: utf-8 -*-
# from odoo import http
# from odoo.http import request
# from odoo.exceptions import ValidationError
# import xml.etree.ElementTree as ET
# import json
#
# class Webhook(http.Controller):
#     @http.route('/webhook/webhook', auth='public',methods=['POST'], csrf=False)
#     def index(self, **kw):
#         # Extract payload data from URL parameters
#         payload_data = {
#             'name': kw.get('name'),
#             'email': kw.get('email'),
#             'phone': kw.get('phone'),
#             # Add other fields as needed
#         }
#
#         # Create a new partner with the payload data
#         new_partner = http.request.env['res.partner'].create(payload_data)
#
#         return "Hello, world"
#
#     @http.route('/webhook/webhook/create', auth='public', methods=['POST'], csrf=False)
#     def create(self, **kw):
#         try:
#             # Extract JSON data from the request
#             json_data = json.loads(request.httprequest.data)
#
#             # Create a new record
#             new_record = request.env['res.partner'].create(json_data)
#             return "Record created successfully"
#         except ValidationError as e:
#             return str(e)
#
#     @http.route('/webhook/webhook/update', auth='public', methods=['PUT'], csrf=False)
#     def update(self, **kw):
#         # Extract data from the request
#         data = kw.get('data')
#         record_id = data.get('id')
#
#         # Find the record to update
#         record = request.env['webhook.webhook'].browse(record_id)
#         if not record:
#             return "Record not found"
#
#         # Update the record
#         try:
#             record.write(data)
#             return "Record updated successfully"
#         except ValidationError as e:
#             return str(e)
#
#     @http.route('/webhook/webhook/delete', auth='public', methods=['DELETE'], csrf=False)
#     def delete(self, **kw):
#         # Extract data from the request
#         data = kw.get('data')
#         record_id = data.get('id') if data else None
#
#         # Check if record ID is provided
#         if not record_id:
#             return "Record ID not provided in the request"
#
#         # Find the record to delete
#         record = request.env['res.partner'].browse(record_id)
#         if not record:
#             return "Record not found"
#
#         # Delete the record
#         try:
#             record.unlink()
#             return "Record deleted successfully"
#         except ValidationError as e:
#             return str(e)
#
#
#     @http.route('/webhook/webhook/list', auth='public', methods=['GET'])
#     def list(self, **kw):
#         # Retrieve all records
#         records = request.env['res.partner'].search([])
#
#         # Render the template with the partner records
#         return http.request.render('res.partner', {
#             'records': records,
#         })
#
#     @http.route('/webhook/webhook/object/<int:record_id>', auth='public', methods=['GET'])
#     def object(self, record_id, **kw):
#         # Find the record
#         record = request.env['res.partner'].browse(record_id)
#         if not record:
#             return "Record not found"
#
#         return http.request.render('webhook.object', {
#             'record': record,
#         })








# from odoo import http, _, exceptions
# from odoo.http import request
# from .RestHelper import RestHelper
# from typing import Optional, Dict
#
# ENDPOINT = '/api/model'
#
#
# class RestController(http.Controller):
#
#     """
#     just for example\n
#     Do not use json.dumps if type=='json'
#
#     ```
#     @http.route(
#         f'{ENDPOINT}/test/<type:param>',
#         auth="user", type="json", methods=['GET'], csrf=False
#     )
#     def SampleRoute(self, param: Dict[str, any]) -> Dict[str, any]:
#         args = request.httprequest.args # get parameter from url
#         jsonargs = request.jsonrequest # get parameter from json
#         data = {
#             'param1': args.get('param1'),
#             'param2': args.get('param2'),
#         }
#         return JsonValidResponse(data)
#     ```
#     """
#
#     @http.route([
#         f'{ENDPOINT}/<string:model>',
#         f'{ENDPOINT}/<string:model>/<string:field>',
#         f'{ENDPOINT}/<string:model>/<int:rec_id>',
#         f'{ENDPOINT}/<string:model>/<int:rec_id>/<string:field>',
#     ], auth="user", type="json", methods=['GET'], csrf=False)
#     def GetData(
#             self,
#             model: str, rec_id: Optional[int] = None,
#             field: Optional[str] = None
#     ) -> Dict[str, any]:
#
#         args = request.httprequest.args
#
#         # Querying all data
#         try:
#             if rec_id:
#                 record = request.env[model].sudo().browse(rec_id)
#             else:
#                 if args.get('rec_ids'):
#                     rec_ids = list(map(int, args.get('rec_ids').split(',')))
#                     record = request.env[model].sudo().browse(rec_ids)
#                 else:
#                     if args.get('order'):
#                         order = args.get('order')
#                     else:
#                         order = None
#
#                     if args.get('limit'):
#                         limit = int(args.get('limit'))
#                     else:
#                         limit = None
#
#                     if args.get('filter'):
#                         filter = eval(args.get('filter'))
#                     else:
#                         filter = []
#
#                     if args.get('offset'):
#                         offset = int(args.get('offset'))
#                     else:
#                         offset = 0
#                     record = request.env[model].sudo().search(
#                         filter, order=order, limit=limit, offset=offset)
#         except Exception as e:
#             return RestHelper.JsonErrorResponse(_(f"Invalid: {e}"))
#
#         # Querying all data but based from a field or the fields
#         try:
#             if field:
#                 records = record.read([field])
#             else:
#                 if args.get('fields') and args.get('fields').strip() != '':
#                     fields = args.get('fields').split(',')
#                     records = record.read(fields)
#                 else:
#                     records = record.read()
#         except Exception as e:
#             return RestHelper.JsonErrorResponse(_(e))
#
#         # from: https://github.com/yezyilomo/odoo-rest-api/blob/master/controllers/controllers.py
#         prev_page = None
#         next_page = None
#         total_page_number = 1
#         current_page = 1
#
#         if args.get('page_size'):
#             page_size = int(args.get('page_size'))
#             count = len(records)
#             total_page_number = math.ceil(count / page_size)
#
#             if args.get('page'):
#                 current_page = int(args.get('page'))
#             else:
#                 current_page = 1  # Default page Number
#             start = page_size * (current_page - 1)
#             stop = current_page * page_size
#             records = records[start:stop]
#             next_page = current_page + 1 if 0 < current_page + 1 <= total_page_number else None
#             prev_page = current_page - 1 if 0 < current_page - 1 <= total_page_number else None
#
#         return RestHelper.JsonValidResponse({
#             "prev": prev_page,
#             "current": current_page,
#             "next": next_page,
#             "total_pages": total_page_number,
#             'length_record': len(records),
#             'record': records,
#         })
#
#     @http.route([
#         f'{ENDPOINT}/<string:model>',
#     ], auth="user", type="json", methods=['POST'], csrf=False)
#     def PostData(self, model: str) -> Dict[str, any]:
#
#         params = request.jsonrequest
#
#         try:
#             record = request.env[model].sudo().create(params)
#         except Exception as e:
#             return RestHelper.JsonErrorResponse(_(e))
#
#         return RestHelper.JsonValidResponse({
#             'result': record.id,
#         })
#
#     @http.route([
#         f'{ENDPOINT}/<string:model>',
#         f'{ENDPOINT}/<string:model>/<int:rec_id>',
#     ], auth="user", type="json", methods=['PUT'], csrf=False)
#     def PutData(self, model: str, rec_id: Optional[int] = None) -> Dict[str, any]:
#
#         params = request.jsonrequest
#         args = request.httprequest.args
#
#         try:
#             records = request.env[model].sudo()
#             if rec_id:  # return singleton record
#                 record = records.browse(rec_id).ensure_one()
#                 data = rec_id
#             else:
#                 if args.get('rec_ids'):  # return multiple records
#                     rec_ids = list(map(int, args.get('rec_ids').split(',')))
#                     record = records.browse(rec_ids)
#                     data = rec_ids
#                 else:
#                     # return multiple records (or maybe single record) by filter
#                     if args.get('filter'):
#                         filter = eval(args.get('filter'))
#                         record = records.search(filter)
#                         data = args.get('filter')
#                     else:  # if no filter, raise error
#                         data = None
#                         raise exceptions.ValidationError(_('Invalid filter'))
#         except Exception as e:
#             return RestHelper.JsonErrorResponse({
#                 'result': False,
#                 'message': _(f"Invalid update {data}: {e}"),
#             })
#
#         try:
#             result = record.write(params)
#         except Exception as e:
#             return RestHelper.JsonErrorResponse({
#                 'result': False,
#                 'message': _(f"Invalid update {data}: {e}"),
#             })
#
#         return RestHelper.JsonValidResponse({
#             'result': True,
#             'message': _(f"Successfully update {data}"),
#         })
#
#     @http.route([
#         f'{ENDPOINT}/<string:model>',
#         f'{ENDPOINT}/<string:model>/<int:rec_id>',
#     ], auth="user", type="json", methods=['DELETE'], csrf=False)
#     def DeleteData(self, model: str, rec_id: Optional[int] = None) -> Dict[str, any]:
#
#         params = request.jsonrequest
#         args = request.httprequest.args
#
#         try:
#             records = request.env[model].sudo()
#             if rec_id:  # return singleton record
#                 record = records.browse(rec_id).ensure_one()
#                 data = rec_id
#             else:
#                 if args.get('rec_ids'):  # return multiple records
#                     rec_ids = list(map(int, args.get('rec_ids').split(',')))
#                     record = records.browse(rec_ids)
#                     data = rec_ids
#                 else:
#                     # return multiple records (or maybe single record) by filter
#                     if args.get('filter'):
#                         filter = eval(args.get('filter'))
#                         record = records.search(filter)
#                         data = args.get('filter')
#                     else:  # if no filter, raise error
#                         data = None
#                         raise exceptions.ValidationError(_('Invalid filter'))
#         except Exception as e:
#             return RestHelper.JsonErrorResponse({
#                 'result': False,
#                 'message': _(f"Invalid delete {data}: {e}"),
#             })
#
#         try:
#             result = record.unlink()
#         except Exception as e:
#             return RestHelper.JsonErrorResponse({
#                 'result': False,
#                 'message': _(f"Invalid delete {data}: {e}"),
#             })
#
#         return RestHelper.JsonValidResponse({
#             'result': True,
#             'message': _(f"Successfully delete {data}"),
#         })
#     @http.route([
#         f'{ENDPOINT}/partners/names',
#     ], auth="user", type="json", methods=['GET'], csrf=False)
#     def get_partner_names(self) -> Dict[str, any]:
#         try:
#             partner_names = request.env['res.partner'].sudo().search([]).mapped('name')
#             return RestHelper.JsonValidResponse(partner_names)
#         except Exception as e:
#             return RestHelper.JsonErrorResponse(_(f"Error fetching partner names: {e}"))
#






# # -*- coding: utf-8 -*-
# from odoo import http
#
#
# class Webhook(http.Controller):
#     @http.route('/webhook/webhook', auth='public')
#     def index(self, **kw):
#         return "Hello, world"
#
#     @http.route('/webhook/webhook/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('webhook.listing', {
#             'root': '/webhook/webhook',
#             'objects': http.request.env['webhook.webhook'].search([]),
#         })
#
#     @http.route('/webhook/webhook/objects/<model("webhook.webhook"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('webhook.object', {
#             'object': obj
#         })
#
