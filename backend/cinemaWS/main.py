from flask import Flask
from flask_cors import CORS
from Routers.users_router import users_bp
from Routers.subscriptions_router import subscriptions_ws_bp
from Routers.auth_router import auth_bp
import json
from bson import ObjectId
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

class JSONEncoder(json.JSONEncoder):
    def default(self, obj) :
        if isinstance(obj, ObjectId) or isinstance(obj, datetime):
            return str(obj)
        return json.JSONEncoder.default(self,obj)

app = Flask(__name__)
app.json_encoder = JSONEncoder
app.url_map.strict_slashes = False
CORS(app)

app.register_blueprint(users_bp, url_prefix="/users")
app.register_blueprint(subscriptions_ws_bp, url_prefix="/subscriptions")
app.register_blueprint(auth_bp, url_prefix="/auth")

app.run(debug=True)
