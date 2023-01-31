from flask import Blueprint, jsonify, make_response, request
from BLL.subscriptionsWS_BL import SubscriptionsWS_BL
from BLL.authBL import AuthBL

subscriptions_ws_bp = Blueprint("subscriptionsws", __name__)
subscriptions_ws_bl = SubscriptionsWS_BL()
auth_bl = AuthBL()


@subscriptions_ws_bp.before_request
def request_interceptor():
    #since this Flask's before_request method includes the OPTIONS request, it is neccessery to define that
    if request.method == 'OPTIONS':
        return
    token = request.headers.get("x-access-token")
    print(token)
    if token:
        resp = auth_bl.verify_token(token)
        print(resp)
        if resp.get("error"):
            return make_response(jsonify(resp), resp["code"])
    else:
        return make_response(jsonify({"error" : "UNAUTHORIZED - Please make sure to log in first and send your token in the x-access-token header"}), 403)

#members
@subscriptions_ws_bp.route("/members", methods=["GET"])
def get_all_members():
    resp = subscriptions_ws_bl.get_members()
    return make_response(jsonify(resp.json()), resp.status_code)

@subscriptions_ws_bp.route("/members/<string:id>" , methods=["GET"])
def get_member(id):
    resp = subscriptions_ws_bl.get_member(id)
    return make_response(jsonify(resp.json()), resp.status_code)

@subscriptions_ws_bp.route("/members", methods=["POST"])
def add_member():
    new_member_obj = request.json
    #fields: name, city, email
    resp = subscriptions_ws_bl.create_member(new_member_obj)
    return make_response(jsonify(resp.json()), resp.status_code)

@subscriptions_ws_bp.route("/members/<string:id>", methods=["PUT"])
def update_members(id):
    edited_member_obj = request.json
    resp = subscriptions_ws_bl.update_member(id, edited_member_obj)
    return make_response(jsonify(resp.json()), resp.status_code)

@subscriptions_ws_bp.route("/members/<string:id>", methods=['DELETE'])
def delete_member(id):
    resp = subscriptions_ws_bl.delete_member(id)
    return make_response(jsonify(resp.json()), resp.status_code)


#movies
@subscriptions_ws_bp.route("movies", methods=["GET"])
def get_movies():
    resp = subscriptions_ws_bl.get_all_movies()
    return make_response(jsonify(resp.json()), resp.status_code)

@subscriptions_ws_bp.route("movies/<string:id>", methods=["GET"])
def get_movie(id):
    resp = subscriptions_ws_bl.get_movie(id)
    return make_response(jsonify(resp.json()), resp.status_code)

@subscriptions_ws_bp.route("movies", methods=["POST"])
def create_movie():
    new_movie_obj = request.json
    resp = subscriptions_ws_bl.create_movie(new_movie_obj)
    return make_response(jsonify(resp.json()), resp.status_code)

@subscriptions_ws_bp.route("movies/<string:id>", methods=["PUT"])
def update_movie(id):
    edited_movie_obj = request.json
    resp = subscriptions_ws_bl.update_movie(id ,edited_movie_obj)
    return make_response(jsonify(resp.json()), resp.status_code)

@subscriptions_ws_bp.route("movies/<string:id>", methods=["DELETE"])
def delete_movie(id):
    resp = subscriptions_ws_bl.delete_movie(id)
    return make_response(jsonify(resp.json()), resp.status_code)

#subscrtiptions

@subscriptions_ws_bp.route("/<string:id>", methods=["PUT"])
def add_movie_to_subscription(id):
    subscription_obj = request.json
    resp = subscriptions_ws_bl.add_movie_to_sub(id, subscription_obj)
    return make_response(jsonify(resp.json()), resp.status_code)

@subscriptions_ws_bp.route("/", methods=['GET'])
def get_all_subscriptions():
    resp = subscriptions_ws_bl.get_all_subscriptions()
    return make_response(jsonify(resp.json()), resp.status_code)


