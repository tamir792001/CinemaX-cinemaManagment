from flask import Blueprint, jsonify, request, make_response
from BLL.moviesBL import MoviesBL

movies_bp = Blueprint("movies", __name__)
movies_bl = MoviesBL()


@movies_bp.route("/", methods=['GET'])
def get_movies():
    resp = movies_bl.get_all_movies()
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 200)

@movies_bp.route("/<string:id>", methods=['GET'])
def get_movie(id):
    resp = movies_bl.get_movie(id)
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 200)

@movies_bp.route("/", methods=['POST'])
def create_movie():
    movie_data = request.json
    resp = movies_bl.create_new_movie(movie_data)
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 201)

@movies_bp.route("/<string:id>", methods=['PUT'])
def update_movie(id):
    new_movie_date = request.json
    resp = movies_bl.update_movie(id, new_movie_date)
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 200)

@movies_bp.route("/<string:id>", methods=['DELETE'])
def delete_movie(id):
    resp = movies_bl.delete_movie(id)
    if resp.get("error"):
        return make_response(jsonify(resp), resp["code"])
    return make_response(jsonify(resp), 200)