from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

if os.environ.get("MODE") == "dev":
    client = MongoClient(port=int(os.environ.get("LOCAL_DB_PORT")))
else:
    client = MongoClient(os.environ.get("GLOBAL_DB_SRC"))

class UsersDB_DAL:
    def __init__(self):
        self.__client = client
        self.__db = self.__client["usersDB"]
        self.__users_collection = self.__db["users"]

    def get_all_users_docs(self):
        try:
            users = list(self.__users_collection.find({}))
        except:
            print("Error Occured")
            return {"error" : "Error occured in Get Users Docs in DB" , "code" : 500}
        else:
            return {"data" : users}

    def get_user_doc(self, id):
        try:
            user = self.__users_collection.find_one({"_id" : id})
        except Exception as e:
            print(e)
            print("Error Occured")
            print(client)
            return {"error" : "Error occured in Get User Doc in DB", "code" : 500}
        else:
            print(user)
            return {"data" : user}
            
    def get_user_doc_by_username(self, username):
        try:
            user = self.__users_collection.find_one({"username" : username})
        except:
            print("Error Occured")
            return {"error" : "Error occured in Get User Doc (by username) in DB", "code" : 500}
        else:
            return {"data" : user}

    def create_user_doc(self, obj):
        try:
            resp = self.__users_collection.insert_one(obj)
        except:
            print("Error Occured")
            return {"error" : "Error occured in Post User Doc in DB", "code" : 500}
        else:
            return {"data" : resp.inserted_id}

    def update_user_doc(self, id, obj):
        try:
            resp = self.__users_collection.update_one({"_id" : id}, {"$set" : obj})
        except:
            print("Error Occured")
            return {"error" : "Error occured in Update User Doc in DB", "code" : 500}
        else:
            msg = "User Updated" if resp.modified_count > 0 else "User Not Found or Modified in DB"
            return {"data" : msg}

    def delete_user_doc(self, id):
        try:
            resp = self.__users_collection.delete_one({"_id" : id})
        except:
            print("Error Occured")
            return {"error" : "Error occured in Delete User Doc in DB", "code" : 500}
        else:
            msg = "User Deleted" if resp.deleted_count > 0 else "User Not Found or Deleted"
            return {"data" : msg}