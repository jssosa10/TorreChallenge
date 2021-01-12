from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import db, User, Opportunity
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    return {'users': sorted(users, key=lambda k: k.match_index, reverse=True)[:50] }

@app.get('/opportunities/{id}')
def get_opportunity(id: str):
    try:
        response = requests.get(f'https://torre.co/api/opportunities/{id}')
        data = response.json()
        data['skills'] = data['strengths']
        return Opportunity(**data)
    except:
        raise HTTPException(status_code=404, detail="Opportunity not found")