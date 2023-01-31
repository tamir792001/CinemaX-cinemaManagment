import requests
from datetime import datetime
import os

class SubscriptionsWS_BL:
    def __init__(self):
        self.__url_members = os.environ.get("MEMBERS_ENDPOINT")
        self.__url_movies =  os.environ.get("MOVIES_ENDPOINT") 
        self.__url_subs =  os.environ.get("SUBSCRIPTIONS_ENDPOINT") 

#members

    #In each request we return the ResponseObject and in the Router we create the response
    def get_members(self):
        resp = requests.get(self.__url_members)
        return resp

    def get_member(self, id):
        resp = requests.get(f"{self.__url_members}/{id}")
        return resp

    def create_member(self, obj):
        resp = requests.post(f"{self.__url_members}", json=obj)
        return resp

    def update_member(self, id, obj):
        resp = requests.put(f"{self.__url_members}/{id}", json=obj)
        return resp

    def delete_member(self, id):
        resp = requests.delete(f"{self.__url_members}/{id}")
        return resp

#movies

    def get_all_movies(self):
        resp = requests.get(self.__url_movies)
        return resp

    def get_movie(self, id):
        resp = requests.get(f"{self.__url_movies}/{id}")
        return resp

    def create_movie(self, obj):
        resp = requests.post(f"{self.__url_movies}", json=obj)
        return resp

    def update_movie(self, id, obj):
        resp = requests.put(f"{self.__url_movies}/{id}", json=obj)
        return resp

    def delete_movie(self, id):
        resp = requests.delete(f"{self.__url_movies}/{id}")
        return resp

#subscriptions

    def add_movie_to_sub(self, subscription_id, subscription_obj):
        resp = requests.put(f"{self.__url_subs}/{subscription_id}", json=subscription_obj)
        return resp

    def get_all_subscriptions(self):
        resp = requests.get(self.__url_subs)
        return resp

