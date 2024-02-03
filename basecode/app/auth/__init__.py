from flask import Blueprint
from flask_cors import CORS

authBp = Blueprint('auth', __name__)
CORS(authBp, supports_credentials=True)

# supports credentials digunakan untuk menghubungkan status login antara vue dengan flask

from app.auth import routes