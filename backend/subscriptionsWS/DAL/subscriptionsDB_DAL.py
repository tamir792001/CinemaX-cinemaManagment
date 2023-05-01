from pymongo import MongoClient
import os
from dotenv import load_dotenv, dotenv_values

load_dotenv()
config= dotenv_values(".env")
print("000000000000000000000000000000000000000000")
print(config)


if os.environ.get("MODE") == "dev":
    print("dev")
    client = MongoClient(port=int(os.environ.get("LOCAL_DB_PORT")))
else:
    print("prod")
    print(os.environ.get("GLOBAL_DB_SRC"))
    print(os.environ)
    client = MongoClient(os.environ.get("GLOBAL_DB_SRC"))

class SubscriptionsDB_DAL:
    def __init__(self):
        self.__client = client
        print(self.__client)
        self.__db = self.__client["subscriptionsDB"]
        self.__members_collection = self.__db["members"]
        self.__movies_collection = self.__db["movies"]
        self.__subscriptions_collection = self.__db["subscriptions"]

#members

    #return list of all members. for each member a subscriptions array is aggregated 
    def get_all_members(self):
        try:
            all_members = list(self.__members_collection.aggregate([
                {
                    "$lookup" : {
                        "from": "subscriptions",
                        "localField": "_id",
                        "foreignField": "memberID",
                        "as" : "subscriptions"
                    }
                },
                {
                    "$project" : {"subscriptions.memberID" : 0, "subscriptions._id" : 0}
                }
            ]))
        except Exception as e:
            print("Error Occured")
            print(e)
            return {"error" : "Error occured in Get All Member", "code" : 500}
        else:
            return {"data" : all_members}
    
    def get_member_doc(self, id):
        try:
            member = self.__members_collection.find_one({"_id" : id})
        except:
            print("Error Occured")
            return {"error" : "Error occured in Get Member", "code" : 500}
        else:
            return {"data" : member} if member else {"error" : "No Member Matched", "code" : 404}

    #returns an ObjectId of the new document
    def create_member_doc(self, obj):
        try:
            resp = self.__members_collection.insert_one(obj)
        except:
            print("Error Occured")
            return {"error" : "Error occured in Create Member", "code" : 500}
        else:
            return{"data" : resp.inserted_id}

    def update_member_doc(self, id, obj):
        try:
            resp = self.__members_collection.update_one({"_id" : id}, {"$set" : obj})
        except:
            print("Error Occured")
            return {"error" : "Error occured in Update Member", "code" : 500}
        else:
            #checks if any document has been modified
            msg = "Member Updated" if resp.modified_count > 0 else "No Member Matched Or Modified"
            return {"data" : msg}
            #return "Member Updated"

    def delete_member_doc(self, id):
        try:
            resp = self.__members_collection.delete_one({"_id" : id})
        except:
            print("Error Occured")
            return {"error" : "Error occured in Delete Member", "code" : 500}
        else:
            
            #checks if any document has been deleted
            msg = "Member Deleted" if resp.deleted_count > 0 else "No Member Matched or deleted"
            return {"data" : msg}
            #return "Member Deleted"

#movies
    def get_all_movies(self):
        try:
            all_movies = list(self.__movies_collection.aggregate([
                {
                    "$lookup" : {
                        "from" : "subscriptions",
                        "localField" : "_id",
                        "foreignField" : "movies.movieID",
                        "as" : "subscriptions"
                    }
                },
                {
                    "$project" : {
                        "subscriptions.movies" : 0,
                        "subscriptions._id" : 0
                    }
                }
            ]))
        except:
            print("Error Occured")
            return {"error" : "Error occured in Get All Movies", "code" : 500}
        return {"data" : all_movies}
    
    def get_movie_doc(self, id):
        try:
            movie = self.__movies_collection.find_one({"_id" : id})
        except:
            print("Error Occured")
            return {"error" : "Error occured in Get Movie", "code" : 500}
        else:
            return {"data" : movie} if movie else {"error" : "No Movie Matched", "code" : 404}

    def create_movie_doc(self, obj):
        try:
            resp = self.__movies_collection.insert_one(obj)
        except:
            print("Error Occured")
            return {"error" : "Error occured in Create Movie", "code" : 500}
        else:
            return {"data" : resp.inserted_id}

    def update_movie_doc(self, id, obj):
        try:
            resp = self.__movies_collection.update_one({"_id" : id}, {"$set" : obj})
        except:
            print("Error Occured")
            return {"error" : "Error occured in Update Movie", "code" : 500}
        else:
            #checks if any document has been modified
            msg = "Movie Updated" if resp.modified_count > 0 else "No Movie Matched Or Modified"
            return {"data" : msg}
            #return "Movie Updated"

    def delete_movie_doc(self, id):
        #add deletion from subscriptions
        try:
            resp = self.__movies_collection.delete_one({"_id" : id})
        except:
            print("Error Occured")
            return {"error" : "Error occured in Delete Movie", "code" : 500}
        else:
            #checks if any document has been deleted
            msg = "Movie Deleted" if resp.deleted_count > 0 else "No Movie Matched"
            return {"data" : msg}
            #return "Movie Deleted"


#subscriptions
    def get_all_subscriptions(self):
        try:
            all_subscriptions = list(self.__subscriptions_collection.find({}))
        except:
            print("Error Occured")
            return {"error" : "Error occured in Get All Subscriptions", "code" : 500}
        else:
            return {"data" : all_subscriptions}

    def get_subscription(self, id):
        try:
            subscription = self.__subscriptions_collection.find_one({"_id" : id})
        except:
            print("Error Occured")
            return {"error" : "Error occured in Get Subscription", "code" : 500}
        else:
            return {"data" : subscription}
            
    def delete_subscription(self, member_id):
        try:
            resp = self.__subscriptions_collection.delete_one({"memberID" : member_id})
        except:
            print("Error Occured")
            return {"error" : "Error occured in Delete Subscription", "code" : 500}
        else:    
            msg = "Subscription deleted" if resp.deleted_count > 0 else "No Subscription Matched"
            return {"data" : msg}

    def update_subscription(self, id, obj):
        try:
            resp = self.__subscriptions_collection.update_one({"_id" : id}, {"$set" : obj})
        except:
            print("Error Occured")
            return {"error" : "Error occured in Update Subscription", "code" : 500}
        else:
            msg = "Subscription Updated" if resp.modified_count > 0 else "No Subscription Matched or Modified"
            return {"data" : msg}

    def create_subscription(self, obj):
        try:
            resp = self.__subscriptions_collection.insert_one(obj)
        except:
            print("Error Occured")
            return {"error" : "Error Occured in Post Subscription", "code" : 500}
        else:
            return {"data" : resp.inserted_id}


 



