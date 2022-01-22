from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def get_all_user():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


# @user_routes.route('/user?playerId=id&opponentId=id')
# def get_users_for_game():
#     playerId  = request.args.get('player', type=int ,default='')
#     opponentId = request.args.get('opponent',type=int , default='')
#     player = User.query.get(playerId)
#     opponent = User.query.get(opponentId)
#     return {"player":player, "opponent":opponent }


@user_routes.route('/', methods=['PUT'])
def record_game_wins():
    res = request.get_json()
    player = User.query.get(res["playerId"])
    player.wins+=1
    db.session.commit()
    player = User.query.get(res["playerId"])

    return player.to_dict()
