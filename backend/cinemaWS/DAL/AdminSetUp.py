from pymongo import MongoClient
import bcrypt

client = MongoClient(port=27017)
db = client["usersDB"]
users_collection = db["users"]

username = "AdminUser"
password = "myadminpassword"

encoded_pass = password.encode('utf-8')
hashed_pass = bcrypt.hashpw(encoded_pass, bcrypt.gensalt(4))
admin_obj = {"username": username, "password" : hashed_pass}

try:
    resp = users_collection.insert_one(admin_obj)
except:
    print("Error Occured")
else:
    print(resp.inserted_id)
