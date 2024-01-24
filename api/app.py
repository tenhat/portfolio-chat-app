from dotenv import load_dotenv
load_dotenv('.env.local')

import os
from flask import Flask
from flask_socketio import SocketIO
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default')
socketio = SocketIO(app)

mongo_client = MongoClient('mongodb://mongoadmin:secret@db:27017/')
db = mongo_client.chat  # chatデータベースを取得
messages = db.messages  # messagesコレクションを取得

def save_message(data):
    messages.insert_one(data)

@app.route('/test')
def test_db():
    # データベースにテストメッセージを挿入
    save_message({
        "username": "Test User",
        "message": "Hello, this is a test message!",
        "timestamp": datetime.now()
    })
    return "Test message inserted into MongoDB."

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
