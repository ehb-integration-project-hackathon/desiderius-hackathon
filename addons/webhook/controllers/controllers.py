# -*- coding: utf-8 -*-
from odoo import http


class Webhook(http.Controller):
    @http.route('/webhook/webhook', auth='public')
    def index(self, **kw):
        return "Hello, world"

    @http.route('/webhook/webhook/objects', auth='public')
    def list(self, **kw):
        return http.request.render('webhook.listing', {
            'root': '/webhook/webhook',
            'objects': http.request.env['webhook.webhook'].search([]),
        })

    @http.route('/webhook/webhook/objects/<model("webhook.webhook"):obj>', auth='public')
    def object(self, obj, **kw):
        return http.request.render('webhook.object', {
            'object': obj
        })

