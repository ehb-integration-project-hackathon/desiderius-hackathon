from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/trigger-docker', methods=['POST'])
def trigger_docker():
    # Get the JSON data from the request body
    data = request.get_json()

    # Check if the 'run' key is present and equals True
    if data and data.get('run') == True:
        # Execute the shell script to restart Docker Compose
        subprocess.call(['bash', '/home/student/desiderius-hackathon/errorHandling/start_docker_compose.sh'])
        return jsonify({'status': 'Triggered', 'message': 'Docker Compose started successfully'}), 200
    else:
        return jsonify({'status': 'Error', 'message': 'Invalid or missing key'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000)
