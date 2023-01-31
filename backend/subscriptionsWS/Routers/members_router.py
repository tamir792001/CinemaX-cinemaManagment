from flask import Blueprint, request, jsonify, make_response
from BLL.membersBL import MembersBL

members_bp = Blueprint("members", __name__)
members_bl = MembersBL()

@members_bp.route("/", methods=["GET"])
def get_members():
    resp =  members_bl.get_all_members()
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 200)

@members_bp.route("/<string:id>", methods=["GET"])
def get_member(id):
    resp = members_bl.get_member(id)
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 200)

@members_bp.route("/", methods=["POST"])
def create_member():
    member_data = request.json
    resp = members_bl.create_new_member(member_data)
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 201) 

@members_bp.route("/<string:id>", methods=["PUT"])
def update_member(id):
    new_member_data = request.json
    resp = members_bl.update_member(id, new_member_data)
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 200) 

@members_bp.route("/<string:id>", methods=["DELETE"])
def delete_member(id):
    resp = members_bl.delete_member(id)
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 200) 
