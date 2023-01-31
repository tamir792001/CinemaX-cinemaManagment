from flask import Blueprint, jsonify, request, make_response
from BLL.subscriptionsBL import SubscriptionsBL

subscriptions_bp = Blueprint("subscriptions", __name__)
subscriptions_bl = SubscriptionsBL()

@subscriptions_bp.route("/", methods=["GET"])
def get_all_subscriptions():
    resp = subscriptions_bl.get_subscriptions()
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 200)

@subscriptions_bp.route("/<string:id>", methods=['PUT'])
def add_movie_to_subscription(id):
    new_subscription_obj = request.json
    resp = subscriptions_bl.update_subscription(id, new_subscription_obj)
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 200)