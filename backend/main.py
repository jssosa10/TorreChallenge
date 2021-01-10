from fastapi import FastAPI
from models import db, User, Opportunity
import requests

app = FastAPI()

def get_match_index(user, opportunity):
    job_skills = list(map(lambda skill: skill.name, opportunity.skills))
    user_skills = list(map(lambda skill: skill['name'], user['skills']))
    total = len(job_skills)
    return len(list(filter(lambda skill: skill in user_skills, job_skills)))/total

@app.post('/users/{primary_skill}')
def list_users(primary_skill: str, opportunity: Opportunity):
    users = []
    for user in db.people.find({"skills.name": primary_skill}):
        user['match_index'] = get_match_index(user, opportunity) 
        users.append(User(**user))
    return {'users': users}

@app.get('/opportunities/{id}')
def get_opportunity(id: str):
    response = requests.get(f'https://torre.co/api/opportunities/{id}')
    data = response.json()
    data['skills'] = data['strengths']
    return Opportunity(**data)