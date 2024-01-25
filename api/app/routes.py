from flask import Blueprint, request, jsonify
from .utils.mongo_util import test_mongo, register_user
from app.models import User
from flask_jwt_extended import create_access_token

test_bp = Blueprint('test', __name__)

@test_bp.route('/test')
def test_route():
    return test_mongo()

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        password = data['password']
        email = data['email']
        
        register_user({
            'username': username,
            'password_hash': User.generate_password_hash(password),
            'email': email
        })
        return 'User registered', 200
    
@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        username = data['username']
        password = data['password']
        
        user = User.find_by_username(username)
        if user and User.check_password_hash(user.password_hash, password):
            access_token = create_access_token(identity=username)
            return jsonify(access_token=access_token), 200
        else:
            return 'Invalid username or password', 401
        
        
        

