from app.models import Message
from bson import json_util
from flask import current_app as app

def test_mongo():
    return 'MongoDB connection test'

def save_message(data):
    message = Message(data)
    message.save(app.db)

def get_all_messages(emit):
    messages_list = app.db.messages.find()
    messages_data = [json_util._json_convert(message) for message in messages_list]
    emit('load_messages', messages_data)
