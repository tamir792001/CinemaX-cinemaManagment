import os
import sys
import json

class Users_File_DAL:
    def __init__(self):
        self.__path = os.path.join(os.path.dirname(sys.argv[0]), "files/Users.json")

    def read_users_file(self):
        try:
            with open(self.__path, "r") as f:
                data = json.load(f)
        except:
            print("Error Occured")
            return {"error" : "Error occured in Read-File (of Users_File_DAl)", "code" : 500}
        else:
            return {"data" : data}

    def write_users_file(self, data):
        try:
            with open(self.__path, "w") as f:
                json.dump(data, f)
        except:
            print("Error Occured")
            return {"error" : "Error occured in Write-File (of Users_File_DAl)", "code" : 500}
        else:
            return {"data" : "Users.json Updated"}


