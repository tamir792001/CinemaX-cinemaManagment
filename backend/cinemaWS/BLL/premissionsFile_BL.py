from DAL.premissionsFile_DAL import Premissions_File_DAL

class PremissionsFile_BL:
    def __init__(self):
        self.__premissions_file_dal = Premissions_File_DAL()

    def get_users(self):
        resp = self.__premissions_file_dal.read_file()
        return resp

    def get_user(self, id):
        resp = self.__premissions_file_dal.read_file()
        if resp.get("data"):
            all_users = resp["data"]["usersPremissions"]
            list_with_user = list(filter(lambda user : user["userID"] == id,all_users))
            if len(list_with_user) > 0:
                return {"data" : list_with_user[0]}
            return {"error" : f"No Matches for User - {id} - in Premissions.json file" , "code" : 404}
        return resp

    def create_user(self, obj):
        resp = self.__premissions_file_dal.read_file()
        if resp.get("data"):
            all_users = resp["data"]["usersPremissions"]
            all_users.append(obj)
            creation_resp = self.__premissions_file_dal.write_file({"usersPremissions" : all_users})
            return creation_resp
        return resp

    #consider changing the structure of the obj so the update will be with packing a dict
    def update_user(self, id, obj):
        resp = self.__premissions_file_dal.read_file()
        if resp.get("data"):
            all_users = resp["data"]["usersPremissions"]
            for i in range(len(all_users)):
                if all_users[i]["userID"] == id:
                    obj["userID"] = id
                    all_users[i] = obj
                    break
            update_resp = self.__premissions_file_dal.write_file({"usersPremissions" : all_users})
            return update_resp
        return resp

    def delete_user(self, id):
        resp = self.__premissions_file_dal.read_file()
        if resp.get("data"):
            all_users = resp["data"]["usersPremissions"]
            for i in range(len(all_users)):
                if all_users[i]["userID"] == id:
                    all_users.pop(i)
                    break
            deletion_resp = self.__premissions_file_dal.write_file({"usersPremissions" : all_users})
            return deletion_resp
        return resp

