from DAL.usersDB_DAL import UsersDB_DAL
import re
import bson
from bson import ObjectId

class UsersDB_BL:
    def __init__(self):
        self.__users_db_dal = UsersDB_DAL()

    def get_users(self):
        resp = self.__users_db_dal.get_all_users_docs()
        if resp.get("data"):
            users = resp["data"]
            #Removes the password field from each record
            for u in users:
                u.pop("password", None)
            resp["data"] = users
        return resp

    def get_user(self, id):
        try:
            resp = self.__users_db_dal.get_user_doc(ObjectId(id))
        except bson.errors.InvalidId:
            print("Cannot Convert Given ID")
            return {"error" : "Error occured in Get User (In UsersDB_BL) - Invalid Id Inputed", "code" : 404}
        else:
            if resp.get("data"):
                resp["data"].pop("password", None)
            return resp

    #obj is the username of the new user
    def create_user(self, obj):
        check_resp = self.check_username(obj["username"])
        if check_resp.get("error"):
            return check_resp
        resp = self.__users_db_dal.create_user_doc(obj)
        return resp

    def update_user(self, id, obj):
        try:
            resp = self.__users_db_dal.update_user_doc(ObjectId(id), obj)
        except bson.errors.InvalidId:
            print("Cannot Convert Given ID")
            return {"error" : "Error occured in Update User (In UsersDB_BL) - Invalid Id Inputed","code" : 404}
        else:
            return resp

    def delete_user(self, id):
        try: 
            resp = self.__users_db_dal.delete_user_doc(ObjectId(id))
        except bson.errors.InvalidId:
            print("Cannot Convert Given ID")
            return {"error" : "Error occured in Delete User (In UsersDB_BL) - Invalid Id Inputed", "code" : 404}
        else:
            return resp

    def check_username(self, username):
        if len(username) < 5:
            return {"error" : "Username must contain at least 5 chars ", "code": 409}
        if not bool(re.search('[a-zA-Z]', username)):
            return {"error" : "Username must contain letters", "code": 409}
        resp = self.__users_db_dal.get_all_users_docs()
        if resp.get("data"):
            same_username_user = list(filter(lambda u : u["username"] == username,resp["data"]))
            if len(same_username_user) > 0:
                return {"error" : "Username already taken, Please choose diffrently", "code" : 409}
            return {"data" : "username valid"}
        return resp


        
