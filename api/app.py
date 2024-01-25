from dotenv import load_dotenv
load_dotenv('.env.local')

import os
from flask import Flask, json
from flask_socketio import SocketIO
from flask_cors import CORS
from pymongo import MongoClient
from bson import json_util

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default')
# app.config['DEBUG']=True
cors = CORS(app, resources={r"/socket.io/*": {"origins": "*"}})
# socketio = SocketIO(app, debug=True, cors_allowed_origins="*")  # CORS設定を追加
socketio = SocketIO(app, cors_allowed_origins="*")  # CORS設定を追加

mongo_client = MongoClient('mongodb://mongoadmin:secret@db:27017/')
db = mongo_client.chat  # chatデータベースを取得
messages = db.messages  # messagesコレクションを取得

print('flask app started')

def save_message(data):
    messages.insert_one(data)
    
def get_all_messages():
    messages_list = messages.find()
    # MongoDBのドキュメントをPythonの辞書に変換
    messages_data = [json_util._json_convert(message) for message in messages_list]
    print('all messages: ', messages_data)
    # 配列としてデータを送信
    socketio.emit('load_messages', messages_data)

    
@app.route('/test')
def test_mongo():
    print('test')
    # テスト用のデータを挿入
    db.messages.insert_one({'user_id': 0, 'message': 'hello world'})

    # データを取得
    message = db.message.find_one({'message': 'hello world'})
    return message['message']

@socketio.on('connect')
def handle_connect():
    get_all_messages()

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('send_message')
def handle_message(data):
    print('Received message:', data)
    save_message(data)
    # socketio.emit('receive_message', data)
    get_all_messages()
    

if __name__ == '__main__':
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
