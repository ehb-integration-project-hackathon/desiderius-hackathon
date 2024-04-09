from flask import Flask, request
import pika

app = Flask(__name__)

@app.route('/post_to_rabbitmq', methods=['POST'])
def post_to_rabbitmq():
    data = request.json
    rabbitmq_url = 'amqp://student:student1@host.docker.internal:5672/'
    queue_name = 'user_edits'
    
    connection = pika.BlockingConnection(pika.URLParameters(rabbitmq_url))
    channel = connection.channel()
    
    channel.queue_declare(queue=queue_name, durable=True)
    channel.basic_publish(exchange='',
                          routing_key=queue_name,
                          body=str(data),
                          properties=pika.BasicProperties(
                             delivery_mode = 2,  # make message persistent
                          ))
    connection.close()
    return "Message sent to RabbitMQ", 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)  # Ensure it listens on all network interfaces
