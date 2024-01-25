from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from pymongo import MongoClient

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('../instance/config.py')

    CORS(app, resources={r"/socket.io/*": {"origins": "*"}})

    mongo_client = MongoClient(app.config['MONGO_URI'])
    app.db = mongo_client.chat

    from .routes import bp as routes_bp
    app.register_blueprint(routes_bp)

    from .events import ChatNamespace
    socketio = SocketIO(app, cors_allowed_origins="*")
    socketio.on_namespace(ChatNamespace('/'))

    return app, socketio

app, socketio = create_app()
