from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    res = request.get_json()

    player=res["player"]
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used

        # Add the user to the session, we are logged in!
    user = User.query.filter(User.username == res['username']).first()
    return {"user":user.to_dict(), "player": player }


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    res = request.get_json()
    user = User(username=res['username'],password=res['password'], wins="0")
    db.session.add(user)
    db.session.commit()
    return user.to_dict()



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
