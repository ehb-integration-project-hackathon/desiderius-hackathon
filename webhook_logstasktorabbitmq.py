from flask import Flask, request, Response
import xmltodict
import pika
import xml.etree.ElementTree as ET
import requests

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

    # Assuming the action is 'create_user' and valid
    xml_data = convert_json_to_xml(json_data)

    # # Convert JSON to XML
    # #xml_data = xmltodict.unparse({"root": json_data}, pretty=True)
    # #xml_data = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmltodict.unparse({"root": json_data}, pretty=True)
    # inner_xml = xmltodict.unparse(json_data, full_document=False)  # Generate XML from JSON without the XML declaration

    # print("\nInnerXML= " + inner_xml)

    # xml_data = f'<?xml version="1.0" encoding="UTF-8"?>\n<root>\n<message><![CDATA[{inner_xml}]]></message>\n</root>'
    # print("\nOuterXML= " + xml_data)

    try:

        # Define the URL
        url = 'http://localhost:8083/new-user-elk'

        # Make the POST request
        response = requests.post(url, data=json_data, headers={'Content-Type': 'application/json'})
        
        # Check the response
        if response.status_code == 200:
            print("Data sent successfully!")
        else:
            print("Failed to send data. Status code:", response.status_code)
    finally:
        print(json_data)
    #     #code to send to rabbitmq
    #     # RabbitMQ connection parameters
    #     credentials = pika.PlainCredentials('guest', 'guest')  # Replace with your credentials
    #     parameters = pika.ConnectionParameters('localhost',
    #                                            5672,
    #                                            '/',
    #                                            credentials)

    #     # Establish connection and channel
    #     connection = pika.BlockingConnection(parameters)
    #     channel = connection.channel()

    #     # Declare and use a specific queue name
    #     #queue_name = 'your_queue_name_here'
    #     #channel.queue_declare(queue=queue_name, durable=True)

    #     # Send the message
    #     channel.basic_publish(exchange='hackathon',
    #                           routing_key='wordpress-route',
    #                           body=xml_data,
    #                           properties=pika.BasicProperties(
    #                               delivery_mode=2,  # make message persistent
    #                           ))
    #     print(" [x] Sent 'User Information JSON message'")
    # except pika.exceptions.AMQPError as err:
    #     print(f"Failed to connect or send to RabbitMQ: {err}")
    #     return Response("Failed to process data", status=500)
    # finally:
    #     # Close the connection if it's open
    #     print(xml_data)
    #     if 'connection' in locals() and connection.is_open:
    #         connection.close()

    # return Response("Data processed successfully", status=200)


def convert_json_to_xml(json_data):
    """ Converts JSON data to XML format as specified """
    root = ET.Element("User")
    ET.SubElement(root, "FirstName").text = json_data.get("FirstName", "Default FirstName")
    ET.SubElement(root, "LastName").text = json_data.get("LastName", "Default LastName")
    ET.SubElement(root, "BirthDate").text = json_data.get("BirthDate", "1985-05-23")
    ET.SubElement(root, "Email").text = json_data.get("Email", "john.doe@example.com")

    address = ET.SubElement(root, "Address")
    ET.SubElement(address, "Street").text = json_data.get("Address", {}).get("Street", "1234 Elm Street")
    ET.SubElement(address, "Bus").text = json_data.get("Address", {}).get("Bus", "24A")
    ET.SubElement(address, "City").text = json_data.get("Address", {}).get("City", "Metropolis")
    ET.SubElement(address, "Zip").text = json_data.get("Address", {}).get("Zip", "54321")
    ET.SubElement(address, "Country").text = json_data.get("Address", {}).get("Country", "Neverland")
    ET.SubElement(root, "Timestamp").text = json_data.get("Timestamp", "2024-04-18T16:30:00")

    return ET.tostring(root, encoding="unicode")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
