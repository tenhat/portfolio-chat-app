from flask_socketio import Namespace
from .utils.mongo_util import save_message, get_all_messages

class ChatNamespace(Namespace):
    def on_connect(self):
        get_all_messages(self.emit)

    def on_disconnect(self):
        print('Client disconnected')

    def on_send_message(self, data):
        save_message(data)
        get_all_messages(self.emit)
