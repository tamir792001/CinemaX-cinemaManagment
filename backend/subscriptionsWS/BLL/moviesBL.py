from DAL.subscriptionsDB_DAL import SubscriptionsDB_DAL
import bson
from bson import ObjectId

class MoviesBL:
    def __init__(self):
        self.__subscriptions_db_dal = SubscriptionsDB_DAL()

    def get_all_movies(self):
        resp = self.__subscriptions_db_dal.get_all_movies()
        return resp

    def get_movie(self, id):
        try:
            resp = self.__subscriptions_db_dal.get_movie_doc(ObjectId(id))
        except bson.errors.InvalidId:
            print("Cannot Convert Given ID")
            return {"error" : "Error occured in Get Movie - Invalid Id Inputed", "code" : 404}
        else:
            return resp

    def create_new_movie(self, obj):
        #need to check weather there's an error
        resp = self.__subscriptions_db_dal.create_movie_doc(obj)
        return resp

    def update_movie(self, id, obj):
        try:
            resp = self.__subscriptions_db_dal.update_movie_doc(ObjectId(id), obj)
        except bson.errors.InvalidId:
            print("Cannot Convert Given ID")
            return {"error" : "Error occured in Update Movie - Invalid Id Inputed", "code" : 404}
        else:
            return resp 

    def delete_movie(self, id):
        try:
            movie_id = ObjectId(id)
        except bson.errors.InvalidId:
            print("Cannot Convert Given ID")
            return {"error" : "Error occured in Delete Movie - Invalid Id Inputed", "code" : 404}
        else:
            deletion_resp = self.__subscriptions_db_dal.delete_movie_doc(movie_id)
            removing_resp = self.remove_movie_from_subscription(movie_id)
            if deletion_resp.get("error"):
                return deletion_resp
            if removing_resp.get("error"):
                return removing_resp
            return {"data" : [{"MoviesDB_Resp" : deletion_resp["data"]}, {"SubscriptionsDB_Resp" : removing_resp["data"]}]}


    #need an update of the resp {"data"}
    def remove_movie_from_subscription(self, id):
        get_all_resp = self.__subscriptions_db_dal.get_all_subscriptions()
        if get_all_resp.get("error"):
            return get_all_resp
        subscriptions = get_all_resp["data"]
        #subs_with_movie = filter(lambda sub : self.check_if_movie_in_sub(id ,sub["movies"]) ,subscriptions)
        for sub in subscriptions:
            subscription_id = sub["_id"]
            movies = sub["movies"]

            if self.does_movie_exist(id, movies):
                for i in range(len(movies)):
                    if movies[i]["movieID"] == id:
                        sub["movies"].pop(i)
                        #there can only be one instance of the same movie in a subscription of a member
                        update_resp = self.__subscriptions_db_dal.update_subscription(subscription_id, sub)
                        print(update_resp)
                        break
        return {"data" : "Updating subscriptions process succeed"}
    
    #checks whether a movie ID exists in the subscription's movies list
    def does_movie_exist(self, movie_id ,movies_list):
        arr = list(filter(lambda x: x["movieID"] == movie_id ,movies_list))
        return len(arr) > 0
