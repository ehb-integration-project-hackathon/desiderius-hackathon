{
    'name': 'User Webhook Integration',
    'version': '1.0',
    'category': 'Customization',
    'summary': 'Integrate Odoo with RabbitMQ for user webhook notifications',
    'description': """
        This module integrates Odoo with RabbitMQ to send webhook notifications whenever a user is created or updated.
    """,
    'author': 'Your Name',
    'website': 'Your Website',
    'depends': ['base'],
    'data': [
        'views/res_partner_views.xml',
        'views/webhook_views.xml',
        'views/webhook.xml',
        'views/res.partner.xml',
        'data/server_actions.xml',  # Add the XML file here

        'security/ir.model.access.csv'
    ],
    'installable': True,
    'auto_install': False,
    'application': True,
}
