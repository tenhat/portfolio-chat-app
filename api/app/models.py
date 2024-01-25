from werkzeug.security import generate_password_hash, check_password_hash
from flask import current_app as app

class Message:
    def __init__(self, data):
        self.user_id = data.get('user_id')
        self.message = data.get('message')

    def save(self, db):
        db.messages.insert_one(self.__dict__)
        
class User:
    def __init__(self, username, password_hash, email=None):
        self.username = username
        self.password_hash = password_hash
        self.email = email
    
    def register(self, db):
        db.users.insert_one(self.__dict__)
        
    @classmethod
    def find_by_username(cls, username):
        # ユーザーの検索
        user_data = app.db.users.find_one({'username': username})
        if user_data:
            return cls(username=user_data['username'], 
                       password_hash=user_data['password_hash'],
                       email=user_data.get('email'))
        return None
    
    @staticmethod
    def generate_password_hash(password):
        return generate_password_hash(password)
    
    @staticmethod
    def check_password_hash(password_hash, password):
        return check_password_hash(password_hash, password)
