# from flask import Flask, request, Response
# import yaml
# import xmltodict
# import pika

# app = Flask(__name__)

# @app.route('/webhook', methods=['POST'])
# def handle_webhook():
#     # Load JSON data from request
#     json_data = request.get_json(force=True)
#     if json_data is None:
#         return Response("Invalid JSON data", status=400)
#     # yaml_data = yaml.safe_load(request.data)  # Load YAML data from request
#     #xml_data = xmltodict.unparse(yaml_data, pretty=True)  # Convert YAML to XML
#     xml_data = xmltodict.unparse({"root": json_data}, pretty=True)

#     # RabbitMQ connection parameters
#     credentials = pika.PlainCredentials('guest', 'guest')  # Replace with your credentials
#     parameters = pika.ConnectionParameters('localhost',
#                                         5672,
#                                         '/',
#                                         credentials)

#     # Establish connection and channel
#     connection = pika.BlockingConnection(parameters)
#     channel = connection.channel()

#     # Declare a queue
#     queue_name = ''
#     channel.queue_declare(queue=queue_name, durable=True)

#     # Send the message
#     channel.basic_publish(exchange='hackathon',
#                         routing_key='fossBilling-route',
#                         body=xml_data,
#                         properties=pika.BasicProperties(
#                             delivery_mode=2,  # make message persistent
#                         ))

#     print(" [x] Sent 'User Information JSON message'")
#     # Close the connection
#     connection.close()
#     return Response("Data processed successfully", status=200)



# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)


from flask import Flask, request, Response
import xmltodict
import pika

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    # Check content type
    if not request.is_json:
        return Response("Invalid content type, JSON required", status=415)

    # Load JSON data from request
    json_data = request.get_json(force=True)
    if json_data is None:
        return Response("Invalid JSON data", status=400)

    # Convert JSON to XML
    #xml_data = xmltodict.unparse({"root": json_data}, pretty=True)
    #xml_data = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmltodict.unparse({"root": json_data}, pretty=True)
    inner_xml = xmltodict.unparse(json_data, full_document=False)  # Generate XML from JSON without the XML declaration
    xml_data = f'<?xml version="1.0" encoding="UTF-8"?>\n<root>\n<message><![CDATA[{inner_xml}]]></message>\n</root>'


    try:
        # RabbitMQ connection parameters
        credentials = pika.PlainCredentials('guest', 'guest')  # Replace with your credentials
        parameters = pika.ConnectionParameters('localhost',
                                               5672,
                                               '/',
                                               credentials)

        # Establish connection and channel
        connection = pika.BlockingConnection(parameters)
        channel = connection.channel()

        # Declare and use a specific queue name
        #queue_name = 'your_queue_name_here'
        #channel.queue_declare(queue=queue_name, durable=True)

        # Send the message
        channel.basic_publish(exchange='hackathon',
                              routing_key='wordpress-route',
                              body=xml_data,
                              properties=pika.BasicProperties(
                                  delivery_mode=2,  # make message persistent
                              ))
        print(" [x] Sent 'User Information JSON message'")
    except pika.exceptions.AMQPError as err:
        print(f"Failed to connect or send to RabbitMQ: {err}")
        return Response("Failed to process data", status=500)
    finally:
        # Close the connection if it's open
        print(xml_data)
        if 'connection' in locals() and connection.is_open:
            connection.close()

    return Response("Data processed successfully", status=200)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
