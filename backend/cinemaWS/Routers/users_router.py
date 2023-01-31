from flask import Blueprint, jsonify, request, make_response
from BLL.usersDB_BL import UsersDB_BL
from BLL.usersFile_BL import UsersFile_BL
from BLL.premissionsFile_BL import PremissionsFile_BL
from BLL.authBL import AuthBL

users_bp = Blueprint("users", __name__)
users_db_bl = UsersDB_BL()
users_file_bl = UsersFile_BL()
premissions_file_bl = PremissionsFile_BL()
auth_bl = AuthBL()

"""
def request_interceptor(func):
    def decorator(*args, **kwargs):
        token = request.headers.get("x-access-token")
        if token:
            resp = auth_bl.verify_token(token)
            if resp.get("error"):
                return make_response(jsonify(resp), resp["code"])
            return func(*args, **kwargs)
        else:
            return make_response(jsonify({"error" : "UNAUTHORIZED - Please make sure to log in first and send your token in the x-access-token header"}), 403)
        
    decorator.__name__ = func.__name__
    return decorator
"""

#request interception

@users_bp.before_request
def request_interceptor():
     #since this Flask's before_request method includes the OPTIONS request, it is neccessery to define that
    if request.method == 'OPTIONS':
        return
    token = request.headers.get("x-access-token")
    print(token)
    if token:
        resp = auth_bl.verify_token(token)
        if resp.get("error"):
            return make_response(jsonify(resp), resp["code"])
        if not resp["isAdmin"] and request.method != 'GET':
            return make_response(jsonify({"error" : "You do not have premissions for that request"}), 403)
    #elif request.method in ['OPTIONS', ]:
    # return
    else:
        return make_response(jsonify({"error" : "UNAUTHORIZED - Please make sure to log in first and send your token in the x-access-token header"}), 403)

def check_responses_errors(resp_list):
    for resp in resp_list:
        if resp.get("error"):
            return resp
    return {"error" : None}

def merge_data(data_from_db, data_from_users_file, data_from_premissions, mode="GET"):
    if mode == "GETALL":
        all_users = []
        for obj in data_from_db:
            id = str(obj["_id"])
            #the list stores the refs of the objects - any modification will result in the original list
            user_file_obj = list(filter(lambda user : user.get("userID") == id,data_from_users_file))[0]
            user_file_obj.pop("userID")
            premissions_file_obj = list(filter(lambda user : user.get("userID") == id,data_from_premissions))[0]
            premissions_file_obj.pop("userID")
            merged_user = {**obj, **user_file_obj, **premissions_file_obj}
            all_users.append(merged_user)
        return all_users
    else:
        data_from_users_file.pop("userID")
        data_from_premissions.pop("userID")
        merged_user = {**data_from_db, **data_from_users_file, **data_from_premissions} 
        return merged_user

#@request_interceptor
@users_bp.route("/", methods=['GET'])
def get_users():
    users_db_resp = users_db_bl.get_users()
    users_file_resp = users_file_bl.get_users()
    premissions_file_resp = premissions_file_bl.get_users()
    responses = [users_db_resp, users_file_resp, premissions_file_resp]
    error_result = check_responses_errors(responses)
    if error_result["error"]:
        return make_response(jsonify(error_result), error_result["code"])
    all_users = merge_data(users_db_resp["data"], users_file_resp["data"]["usersGeneralData"], premissions_file_resp["data"]["usersPremissions"], "GETALL")
    return make_response(jsonify({"data" : all_users}), 200)

@users_bp.route("/<string:id>" , methods=["GET"])
def get_user(id):
    users_db_resp = users_db_bl.get_user(id)
    users_file_resp = users_file_bl.get_user(id)
    premissions_file_resp = premissions_file_bl.get_user(id)
    responses = [users_db_resp, users_file_resp, premissions_file_resp]
    error_result = check_responses_errors(responses)
    if error_result["error"]:
        return make_response(jsonify(error_result), error_result["code"])
    user = merge_data(users_db_resp["data"], users_file_resp["data"], premissions_file_resp["data"])
    return make_response(jsonify({"data" : user}), 200)

@users_bp.route("/", methods=['POST'])
def create_user():
    new_user_obj = request.json

    #building and dividing the objects for each BLL
    db_obj = {"username" : new_user_obj["username"], "password" : None}
    users_file_obj = {  
                        "fname": new_user_obj["fname"],
                        "lname":  new_user_obj["lname"],
                        "sessionTimeOut":  new_user_obj["sessionTimeOut"],
                     }
    premissions_file_obj = {"premissions" : new_user_obj["premissions"]}

    #sending the objects to the BLL's, First to the users_db_bl to get the id
    users_db_resp = users_db_bl.create_user(db_obj)
    users_file_obj["userID"] = str(users_db_resp.get("data")) or ""
    premissions_file_obj["userID"] = str(users_db_resp.get("data")) or ""
    users_file_resp = users_file_bl.create_user(users_file_obj) if users_db_resp.get("data") else {}
    premissions_file_resp = premissions_file_bl.create_user(premissions_file_obj) if users_db_resp.get("data") else {}

    responses = [users_db_resp, users_file_resp, premissions_file_resp]
    error_result = check_responses_errors(responses)
    if error_result["error"]:
        return make_response(jsonify(error_result), error_result["code"])
    return make_response(jsonify(users_db_resp), 201)

@users_bp.route("/<string:id>", methods=['PUT'])
def update_user(id):
    #consider whether changing the request so it contains only what has been changed
    #thats work need to be done in the client side - mabye only have an state od what is changed.
    edited_user_obj = request.json
    print(edited_user_obj)
    #building and dividing the objects for each BLL
    db_obj = {"username" : edited_user_obj["username"]}
    users_file_obj = {  
                        "fname": edited_user_obj["fname"],
                        "lname":  edited_user_obj["lname"],
                        "createdAt":  edited_user_obj["createdAt"],
                        "sessionTimeOut":  edited_user_obj["sessionTimeOut"],
                     }
    premissions_file_obj = {"premissions" : edited_user_obj["premissions"]}

    #sending the objects to the BLL's
    users_db_resp = users_db_bl.update_user(id, db_obj)
    users_file_resp = users_file_bl.update_user(id, users_file_obj)
    premissions_file_resp = premissions_file_bl.update_user(id, premissions_file_obj)

    responses = [users_db_resp, users_file_resp ,premissions_file_resp]
    error_result = check_responses_errors(responses)
    if error_result["error"]:
        return make_response(jsonify(error_result), error_result["code"])

    client_resp = {
                    "data" :[
                                {"UsersDB_Resp" : users_db_resp["data"]},
                                {"UsersFile_Resp" : users_file_resp["data"]},
                                {"PremissionsFile_Resp" : premissions_file_resp["data"]}
                            ]
                  }
    return make_response(jsonify(client_resp), 200)

@users_bp.route("<string:id>", methods=['DELETE'])
def delete_user(id):
    users_db_resp = users_db_bl.delete_user(id)
    users_file_resp = users_file_bl.delete_user(id)
    premissions_file_resp = premissions_file_bl.delete_user(id)

    responses = [users_db_resp, users_file_resp, premissions_file_resp]
    error_result = check_responses_errors(responses)
    if error_result["error"]:
        return make_response(jsonify(error_result), error_result["code"])

    client_resp = {
                    "data" :[
                                {"UsersDB_Resp" : users_db_resp["data"]},
                                {"UsersFile_Resp" : users_file_resp["data"]},
                                {"PremissionsFile_Resp" : premissions_file_resp["data"]}
                            ]
                  }
    return make_response(jsonify(client_resp), 200)
    