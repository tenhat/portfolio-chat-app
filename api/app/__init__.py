from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from pymongo import MongoClient
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('../instance/config.py')
    jwt = JWTManager(app)

    CORS(app, resources={r"/socket.io/*": {"origins": "*"}})

    mongo_client = MongoClient(app.config['MONGO_URI'])
    app.db = mongo_client.chat

    from .routes import test_bp, auth_bp
    app.register_blueprint(test_bp)
    app.register_blueprint(auth_bp, url_prefix='/auth')

    from .events import ChatNamespace
    socketio = SocketIO(app, cors_allowed_origins="*")
    socketio.on_namespace(ChatNamespace('/'))

    return app, socketio

app, socketio = create_app()
