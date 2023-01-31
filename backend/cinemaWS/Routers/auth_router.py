from flask import Blueprint, jsonify, make_response, request
from BLL.authBL import AuthBL

auth_bp = Blueprint("auth", __name__)
auth_bl = AuthBL()


@auth_bp.route("/login", methods=["POST"])
def login_user():
    credentials_obj = request.json
    token, user = auth_bl.get_token(credentials_obj["username"], credentials_obj["password"])
    if token:
        return make_response(jsonify({ "data" : {"token" : token, "userID" : user["_id"], "isAdmin" : True if user.get("admin") else False}}), 200)
    return make_response(jsonify({"error" : "UNAUTHENTICATED\nUsername or Password incorrect\n"}), 401)

@auth_bp.route("/register", methods=["POST"])
def register_user():
    credentials_obj = request.json
    resp = auth_bl.register_new_user(credentials_obj["username"], credentials_obj["password"])
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 200)


