import os
import sys
from datetime import datetime
from DAL.usersFile_DAL import Users_File_DAL

class UsersFile_BL:
    def __init__(self):
        self.__users_file_dal = Users_File_DAL()

    def get_users(self):
        resp = self.__users_file_dal.read_users_file()
        return resp

    def get_user(self, id):
        #The id type is stil a str
        resp = self.__users_file_dal.read_users_file()
        if resp.get("data"):
            all_users = resp["data"]["usersGeneralData"]
            list_with_user = list(filter(lambda user: user["userID"] == id ,all_users))
            if len(list_with_user) > 0:
                return {"data" : list_with_user[0]}
            return {"error" : f"No Matches for User - {id} - in Users.json file", "code" : 404}
        return resp

    def create_user(self, obj):
        #add a feild of creation date
        resp = self.__users_file_dal.read_users_file()
        if resp.get("data"):
            obj["createdAt"] = str(datetime.now())
            all_users = resp["data"]["usersGeneralData"]
            all_users.append(obj)
            creation_resp = self.__users_file_dal.write_users_file({"usersGeneralData" : all_users})
            return creation_resp
        return resp
    
    def update_user(self, id, obj):
        resp = self.__users_file_dal.read_users_file()
        if resp.get("data"):
            all_users = resp["data"]["usersGeneralData"]
            for i in range(len(all_users)):
                if all_users[i]["userID"] == id:
                    obj["userID"] = id
                    all_users[i] = obj
                    break
            update_resp = self.__users_file_dal.write_users_file({"usersGeneralData" : all_users})
            return update_resp
        return resp

    #consider changing the structure of the obj so the update will be with packing a dict
    def delete_user(self, id):
        resp = self.__users_file_dal.read_users_file()
        if resp.get("data"):
            all_users = resp["data"]["usersGeneralData"]
            for i in range(len(all_users)):
                if all_users[i]["userID"] == id:
                    all_users.pop(i)
                    break
            deletion_resp = self.__users_file_dal.write_users_file({"usersGeneralData" : all_users})
            return deletion_resp
        return resp

            




