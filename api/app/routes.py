from flask import Blueprint
from .utils.mongo_util import test_mongo

bp = Blueprint('routes', __name__)

@bp.route('/test')
def test_route():
    return test_mongo()
