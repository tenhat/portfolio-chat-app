from dotenv import load_dotenv
load_dotenv('.env.local')

import os
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default')
app.config['DEBUG'] = os.getenv('DEBUG', False)
cors = CORS(app, resources={r"/socket.io/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")  # CORS設定を追加

mongo_client = MongoClient('mongodb://mongoadmin:secret@db:27017/')
db = mongo_client.chat  # chatデータベースを取得
messages = db.messages  # messagesコレクションを取得

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

if __name__ == '__main__':
    socketio.run(app, debug=True)
