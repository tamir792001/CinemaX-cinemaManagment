from flask import Flask
from flask_cors import CORS
import json
from datetime import datetime
from bson import ObjectId
from Routers.members_router import members_bp
from Routers.movies_router import movies_bp
from Routers.subscriptions_router import subscriptions_bp
from dotenv import load_dotenv
import os
from waitress import serve

class JSONEncoder(json.JSONEncoder):
    def default(self, obj) :
        if isinstance(obj, ObjectId) or isinstance(obj, datetime):
            return str(obj)
        return json.JSONEncoder.default(self,obj)

load_dotenv()

app = Flask(__name__)
app.json_encoder = JSONEncoder
app.url_map.strict_slashes = False
CORS(app)
app.register_blueprint(members_bp, url_prefix="/members")
app.register_blueprint(movies_bp, url_prefix="/movies")
app.register_blueprint(subscriptions_bp, url_prefix="/subscriptions")

if __name__ == "__main__":
    if os.environ.get("MODE") == "dev":
        app.run(debug=True, port=5001)
    else:
        serve(app, host='0.0.0.0', port=5001)