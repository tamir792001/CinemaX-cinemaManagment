import requests
from pymongo import MongoClient

client = MongoClient(port=27017)
db = client["subscriptionsDB"]

#consumes the api amd save the whole sata in members collection
resp = requests.get("https://jsonplaceholder.typicode.com/users")
members = resp.json()
reshaped_mems = list(map(lambda m : {"name" : m["name"], "email" : m["email"], "city" : m["address"]["city"]},members))
db.members.insert_many(reshaped_mems)

#creates empty subscriptions for each member
all_members = list(db.members.find({}))
subscriptions_list = []
for member in all_members:
    obj = {"memberID" : member["_id"], "movies": []}
    subscriptions_list.append(obj)

db.subscriptions.insert_many(subscriptions_list)
    

#consumes the api amd save the whole sata in movies collection
resp = requests.get("https://api.tvmaze.com/shows")
movies = resp.json()
reshaped_movies = list(map(lambda m : {"name" : m["name"], "genres" : m["genres"], "img" : m["image"]["medium"], "premieredDate" : m["premiered"]},movies))
db.movies.insert_many(reshaped_movies)






