import functools
from flask import Blueprint
from flask import g, redirect, request, session, url_for, abort, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from api.db import get_db

bp = Blueprint('notes', __name__, url_prefix='/notes')


@bp.route('/<user_id>/create', methods=['POST'])
def register(user_id):
    # data = request.get_json(force=True)
    # title = data['title']
    # body = data['body']
    title = request.form['title']
    body = request.form['body']
    db = get_db()
    error = None
    if db.execute(
        'SELECT * from user where id=?', (user_id,)
    ).fetchone() is None:
        error = f"a user with id {user_id} does not exist"
    elif db.execute(
        'SELECT * FROM notes n,user u WHERE n.user = u.id AND u.id =? AND n.title=?', (
            user_id, title)
    ).fetchone() is not None:
        error = f"a note  {title} already exists"
    if error is None:
        db.execute('INSERT INTO notes (title,body,user) VALUES(?,?,?)',
                   (title, body, user_id)
                   )
        db.commit()
        notes = db.execute(
            'SELECT n.title FROM notes n,user u WHERE n.user=u.id AND u.id=?', (user_id,)).fetchall()
        return jsonify(notes)
    return abort(400, error)
