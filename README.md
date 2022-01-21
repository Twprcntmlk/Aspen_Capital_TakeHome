# Aspen Project Set-Up

## Getting started - Backend

1. In the "/Aspen Capital" Folder, Install dependencies in the bash
```bash
pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
```
2. In still in the "/Aspen Capital" Create a **.env** file based on the **.env.example**


3. In still in the "/Aspen Capital", in your bash input:
```bash
pipenv shell

flask db upgrade

flask seed all

flask run
```

## Getting started - Frontend
1. Now to run the frontend cd into:
``` bash
cd react-app

pipenv lock -r > requirements.txt
```
- Then run **npm start**
``` bash
npm start
```

## The Experience / Overview
Fun Project, I thought this was gonna be more like create class Object leetcode thing when it was mentioned
but I used some fun concept like sorting a deck in place and valuing the cards with a dictionary.
Lot of work still needs to be done. There are several parts I am not thrilled about (several jank places we can talk about it but I didn't want to use too much time.)

## Conclusion
Thank you Aspen Capital for the opportunity and I greatly appreciate your consideration!  I had a great time completing this challenge and I can't wait to hear back!
