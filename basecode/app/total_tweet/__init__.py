from flask import Blueprint
from flask_cors import CORS

totalTweetBp = Blueprint('total_tweet', __name__)
CORS(totalTweetBp)
from app.total_tweet import routes