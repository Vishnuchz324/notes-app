import functools
from flask import Blueprint
from flask import g, redirect, request, session, url_for, abort, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from api.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=['GET', 'POST'])
def register():
    data = request.get_json(force=True)
    username = data['userName']
    email = data['email']
    password = data['password']
    db = get_db()
    error = None
    if db.execute(
        'SELECT id FROM user WHERE username = ?', (username,)
    ).fetchone() is not None:
        error = f"User {username} already registered"
    elif db.execute(
        'SELECT id FROM user WHERE email = ?', (email,)
    ).fetchone() is not None:
        error = "The email id is already registered with a user"

    if error is None:
        db.execute('INSERT INTO user (username,email,password) VALUES(?,?,?)',
                   (username, email, generate_password_hash(password))
                   )
        db.commit()
        user_id = db.execute(
            'SELECT id FROM user WHERE username=?', (username,)).fetchone()
        print(user_id)
        return jsonify(user_id)
    return abort(400, error)


@bp.route('/login', methods=['GET', 'POST'])
def login():
    data = request.get_json(force=True)
    username = data['userName']
    password = data['password']
    error = None
    db = get_db()
    user = db.execute(
        'SELECT id,username,password FROM user WHERE username = ? ', (
            username,)
    ).fetchone()
    user_id, user_name, user_password = user
    if user is None:
        error = 'username not registered'
    elif not check_password_hash(user_password, password):
        error = 'incorrect password'
    if error is None:
        return jsonify(user_id)
    return abort(400, error)
