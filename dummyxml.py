import pika
import json

# User information in JSON format
user_info = {
  "user": "kurt5",
  "email": "kurt20aze@test.be",
  "cell_phone": "0473728233"
}

# Convert the dictionary to a JSON string
json_message = json.dumps(user_info)

# RabbitMQ connection parameters
credentials = pika.PlainCredentials('student', 'student1')  # Replace with your credentials
parameters = pika.ConnectionParameters('localhost',
                                       5672,
                                       '/',
                                       credentials)

# Establish connection and channel
connection = pika.BlockingConnection(parameters)
channel = connection.channel()

# Declare a queue
queue_name = 'user_info_queue'
channel.queue_declare(queue=queue_name, durable=True)

# Send the message
channel.basic_publish(exchange='',
                      routing_key=queue_name,
                      body=json_message,
                      properties=pika.BasicProperties(
                          delivery_mode=2,  # make message persistent
                      ))

print(" [x] Sent 'User Information JSON message'")

# Close the connection
connection.close()
