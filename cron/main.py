from pymongo import MongoClient
import requests
import os

def get_all_people(collection):
     response = requests.post('https://search.torre.co/people/_search/?offset=0&size=100')
     total_records = response.json()['total']
     people = []
     # limting by memory
     for offset in range(0,min(total_records,50000), 5000):
          response = requests.post(f'https://search.torre.co/people/_search/?offset={offset}&size=5000')
          if 'results' in response.json():
               collection.insert_many(response.json()['results'])

def extract_data(event, context):
    """Triggered from a message on a Cloud Pub/Sub topic.
       extract data from torre API and save it to a mongodb cluster
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """
    client = MongoClient(f"mongodb+srv://{os.environ['USER']}:{os.environ['PSWD']}@clustertorre.vhroj.mongodb.net/{os.environ['DB']}?retryWrites=true&w=majority")
    people = client.torre.people
    print('Connected !!')
    deleted = people.delete_many({})
    print(deleted.deleted_count, " documents deleted.")
    get_all_people(people)
#     response = requests.post('https://search.torre.co/people/_search/?offset=0&size=100')
#     users = response.json()['results']
    print("Complete !!")
    return "Complete"
