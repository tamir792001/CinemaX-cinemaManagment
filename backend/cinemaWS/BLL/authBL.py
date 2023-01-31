import jwt
from datetime import datetime, timedelta
from bson import ObjectId
from DAL.usersDB_DAL import UsersDB_DAL
from DAL.usersFile_DAL import Users_File_DAL
import bcrypt

class AuthBL:
    def __init__(self):
        self.__key = "secret server key"
        self.__algorithm = "HS256"
        self.__users_db_dal = UsersDB_DAL()

    def register_new_user(self, username, password):
        self.__users_db_dal = UsersDB_DAL()
        user = self.check_user_existence(username, password)
        print(password)
        if user:
            #Make sure that the user has not already set his password
            if user["password"]:
                return {"error" : "Given user has already set his password, Cannot register him again", "code" : 409}
            #set the pass in DB
            if len(password) < 5:
                return {"error" : "Password must contain at least 5 chars", "code": 409}
            hashed_pass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(4))
            resp = self.__users_db_dal.update_user_doc(user["_id"], {"password" : hashed_pass })
            return resp
        return {"error" : "System couldn't find user by given username,\nMake sure you inputed your password correctly\nTo get your username, speak to the Admin", "code" : 404}
#need to check

    def check_password(self, input_password , db_password):
        return bcrypt.checkpw(input_password.encode('utf-8'), db_password) 

    def check_user_existence(self, username, password):
        resp = self.__users_db_dal.get_user_doc_by_username(username)
        if resp.get("data"):
            db_password = resp["data"]["password"]
            #if db_password is None or verified the user obj is returnd
            if not db_password or self.check_password(password, db_password):
                return resp["data"]
        return None
            
    def get_token(self, username, password):
        token = None
        user = self.check_user_existence(username, password)
        #checks if user is exist and his password is not None (unregistered)
        if user and user["password"]:
            user_id = str(user["_id"])
            if user_id == "63ac46f06e8bd447db5499e9" :
                user["admin"] = True
            users_data_from_file = Users_File_DAL().read_users_file()["data"]["usersGeneralData"]
            user_data = list(filter(lambda u : u["userID"] == user_id,users_data_from_file))[0]
            payload = {
                        "userID" : user_id,
                        "username" : user["username"],
                        "exp" : datetime.utcnow() + timedelta(minutes=user_data["sessionTimeOut"]) 
                      }
            token = jwt.encode(payload, self.__key, self.__algorithm)
        return [token, user]

    def verify_token(self, token):
        try:
            payload = jwt.decode(token, self.__key,self.__algorithm)
        except jwt.exceptions.ExpiredSignatureError:
            return {"error" : "UNAUTHORIZED - Token Expired - User STO reached its limit - Log in again", "code" : 403}
        except jwt.exceptions.InvalidSignatureError:
            return {"error" : "UNAUTHORIZED - Incorrect Token","code" : 403}
        else:
            id = payload["userID"]
            resp = self.__users_db_dal.get_user_doc(ObjectId(id))
            if resp.get("data"):
                return {"isAdmin" : id == "63ac46f06e8bd447db5499e9"}
            else:
                return {"error" : "UNAUTHENTICATED -  User Not Found - Please Log in", "code" : 401}
