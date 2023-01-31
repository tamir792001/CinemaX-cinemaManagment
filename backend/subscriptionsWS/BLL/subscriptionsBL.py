from DAL.subscriptionsDB_DAL import SubscriptionsDB_DAL
from datetime import datetime
import bson
from bson import ObjectId

class SubscriptionsBL:
    def __init__(self):
        self.__subscriptions_db_dal = SubscriptionsDB_DAL()
    
    def get_subscriptions(self):
        resp = self.__subscriptions_db_dal.get_all_subscriptions()
        return resp
        
    def update_subscription(self, id, new_subscription_details):
        try:
            subscription_id = ObjectId(id)
            new_subscription_details["movieID"] = ObjectId(new_subscription_details["movieID"])
            #obj = {"movieID" : ObjectId(movie_id), "date" : datetime.utcnow()}
        except bson.errors.InvalidId:
            print("Cannot Convert Given ID")
            return {"error" : "Error occured in Get Member - Invalid Id Inputed"}
        else:
            get_sub_resp = self.__subscriptions_db_dal.get_subscription(subscription_id)
            get_sub_resp["data"]["movies"].append(new_subscription_details)
            modified_movies = {"movies" : get_sub_resp["data"]["movies"]}
            resp = self.__subscriptions_db_dal.update_subscription(subscription_id, modified_movies)
            return resp