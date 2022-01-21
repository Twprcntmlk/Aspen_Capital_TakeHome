from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/login', methods=['POST'])
def login():
    res = request.get_json()
    player=res["player"]
    user = User.query.filter(User.username == res['username']).first()
    return {"user":user.to_dict(), "player": player }


@auth_routes.route('/logout')
def logout():
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    res = request.get_json()
    user = User(username=res['username'], password=res['password'], wins="0")
    db.session.add(user)
    db.session.commit()
    return user.to_dict()



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
