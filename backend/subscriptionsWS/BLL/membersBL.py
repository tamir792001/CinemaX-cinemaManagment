from DAL.subscriptionsDB_DAL import SubscriptionsDB_DAL
from bson import ObjectId
import bson

class MembersBL:
    def __init__(self):
        self.__subscriptions_db_dal = SubscriptionsDB_DAL()

    def get_all_members(self):
        resp = self.__subscriptions_db_dal.get_all_members()
        #reshaping the data object. 
        #The result -> subscriptions is array that contains movieID and date json elements:
        # {movieID: ObjectId("id"), date: "date"}
        if resp.get("data"):
            members = resp["data"]
            for m in members:
                if len(m["subscriptions"]) > 0:
                    m["subscriptions"] = m["subscriptions"][0]["movies"]
            resp["data"] = members
        return resp
    
    def get_member(self, id):
        try:
            resp = self.__subscriptions_db_dal.get_member_doc(ObjectId(id))
        except bson.errors.InvalidId:
            print("Cannot Convert Given ID")
            return {"error" : "Error occured in Get Member - Invalid Id Inputed", "code" : 404}
        else:
            return resp

    def create_new_member(self, obj):
        #need to check weather there's an error
        members_db_resp = self.__subscriptions_db_dal.create_member_doc(obj)
        if members_db_resp.get("error"):
            return members_db_resp

        new_member_id = members_db_resp["data"]  
        subscription_doc = {"memberID" : new_member_id , "movies" : []}
        subscriptions_db_resp = self.__subscriptions_db_dal.create_subscription(subscription_doc)
        
        if subscriptions_db_resp.get("error"):
            return subscriptions_db_resp

        data = {"memberID": new_member_id, "subscriptionID" : subscriptions_db_resp["data"]}
        return {"data" : data}

    def update_member(self, id, obj):
        try:
            resp = self.__subscriptions_db_dal.update_member_doc(ObjectId(id), obj)
        except bson.errors.InvalidId:
            print("Cannot Convert Given ID")
            return {"error" : "Error occured in Get Member - Invalid Id Inputed","code" : 404}
        else:
            return resp

    def delete_member(self, id):
        try:
            member_id = ObjectId(id)
            
        except bson.errors.InvalidId:
            print("Cannot Convert Given ID")
            return {"error" : "Error occured in Get Member - Invalid Id Inputed", "code" : 404}
        else:
            members_db_resp = self.__subscriptions_db_dal.delete_member_doc(member_id)
            subscription_db_resp = self.__subscriptions_db_dal.delete_subscription(member_id)
            if members_db_resp.get("error"):
                return members_db_resp
            if subscription_db_resp.get("error"):
                return subscription_db_resp
            return {"data" : [{"MembersDB_Resp" : members_db_resp["data"]}, {"SubscriptionsDB_Resp" : subscription_db_resp["data"]}]}
    
