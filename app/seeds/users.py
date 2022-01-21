from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():
    hash_password = generate_password_hash('password')
    user_seeds = [
        {"username":"player1", "wins":14, "hashed_password":hash_password},
        {"username":"player2", "wins":45, "hashed_password":hash_password},
        {"username":"player3", "wins":50, "hashed_password":hash_password},
        {"username":"player4", "wins":30, "hashed_password":hash_password},
        {"username":"player5", "wins":60, "hashed_password":hash_password},
        {"username":"player6", "wins":20, "hashed_password":hash_password},
    ]
    for i in range(len(user_seeds)):
        temp = User(
        username = user_seeds[i]["username"],
        wins = user_seeds[i]["wins"],
        hashed_password =  user_seeds[i]["hashed_password"]
        )
        db.session.add(temp)
        db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
