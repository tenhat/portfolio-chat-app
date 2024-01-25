class Message:
    def __init__(self, data):
        self.user_id = data.get('user_id')
        self.message = data.get('message')

    def save(self, db):
        db.messages.insert_one(self.__dict__)
