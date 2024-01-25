import unittest
from app import create_app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.app, self.socketio = create_app()
        self.client = self.app.test_client()

    def test_route(self):
        response = self.client.get('/test')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode(), 'Test route')

if __name__ == '__main__':
    unittest.main()
