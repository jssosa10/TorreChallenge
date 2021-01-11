# Progress log

## Sat 01-09-21 10
* Start the challenge.
* Read completly the description.
* Start exploratory test on the APIs using the web browser and Postman.

## Sat 01-09-21 11
* Keep exploring APIs.
* Brainstroming ideas.


## Sat 01-09-21 12
* Keep Brainstorming.
* Scketching first ideas.
* Lunch Break.

## Sat 01-09-21 15 - 21
* Select besta idea of the day.
* Start coding backend service in Django.

## Sat 01-09-21 21 - 24
* Connect with Torre APIs.
* Limit scope of idea (only recommending profiles to opportunities and no the other way).
* Create Model for recommendations.

## Sun 01-10-21 0
* Design decision!! (move to mongo using pymongo maybe move to fastAPI to remove complexity).
* Design decision!! (do not access search API directly for finding profiles i would create a cron job to every 24 hrs get all the important data in a mongoDB).


## Sunday plan.
1. Create database in mongo atlas.
2. Create cron job in gcloud to retrieve data from people and save it in mongo every 24 Hrs.
3. Migrate from Django to FastAPI
4. Complete Backend.
5. Init Frontend.

## Sun 01-10-21 15
* Created databases in mongo atlas.
* Completed cron_job to update data in mongo every 12Hrs, deployed in gcloud using cloud functions and job scheduler.

## Sun 01-10-21 16 - 19
* Rewrite backend using FastAPI.
* Create models to use as facade of original Torre data.
* implement endpoint to serve info of endpoint (https://torre.co/api/opportunities/{id}) (Facade design pattern)
* impelment endpoint that given a  primary_skill and a job opportunity find all the people that has that primary_skill, also calculate a simple matric of matching of the job and the people.

## Sun 01-10-21 20
* Init Reactjs project.
* Design UI/UX. 