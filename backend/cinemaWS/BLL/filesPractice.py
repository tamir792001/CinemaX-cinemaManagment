from bson import ObjectId
from datetime import datetime
import sys
import os
import json

another_path =os.getcwd()
print(another_path)

cuurent_path_dir = sys.path[0]
print(cuurent_path_dir)

cuurent_path_parent_dir = os.path.dirname(cuurent_path_dir)
print(cuurent_path_parent_dir)

path = os.path.join(cuurent_path_parent_dir, "files/Users.json")
print(path)
"""
with open(path, "r") as f:
    data = json.load(f)
    f.close()
    obj = {
            "userID" : str(ObjectId("63ac46f06e8bd447db5499e9")),
            "fname" : "LIor",
            "lname" : "Schimhi",
            "createdAt" : str(datetime.now()),
            "sessionTimeOut" : 60,
          }
    data["usersGeneralData"].append(obj)
    with open(path, "w") as file:
        json.dump(data, file)
    
"""  
""" 
with open(path, "r") as f:
    data = json.load(f) 

date = data["usersGeneralData"][1]["createdAt"]
print(date)
print(type(date))
new_date = datetime.strptime(date, '%Y-%m-%d %H:%M:%S.%f')
print(new_date)
print(type(new_date))
"""
dic1 = {"name" : "Tamir", "age" : 30}
dic2 = {"name" : "Abi"}
dic3 = {**dic1, **dic2}
print(dic3)