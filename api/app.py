from dotenv import load_dotenv
load_dotenv('.env.local')

import os
from flask import Flask
from flask_socketio import SocketIO
from pymongo import MongoClient

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default')
socketio = SocketIO(app)

mongo_client = MongoClient('localhost', 27017)
db = mongo_client.chat  # chatデータベースを取得
messages = db.messages  # messagesコレクションを取得


if __name__ == '__main__':
    socketio.run(app)

def save_message(data):
    messages.insert_one(data)
    
@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('send_message')
def handle_message(data):
    print('Received message:', data)
    save_message(data)
    socketio.emit('receive_message', data)

