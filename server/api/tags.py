import functools
from flask import Blueprint
from flask import g, redirect, request, session, url_for, abort, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from api.db import get_db

bp = Blueprint('tags', __name__, url_prefix='/tags')


@bp.route('/<user_id>/get_tags')
def get_tags(user_id):
    db = get_db()
    error = None
    user = db.execute('SELECT * FROM user WHERE id=?', (user_id,)).fetchone()
    if not user:
        error = 'user does not exist'
    else:
        tags = db.execute('SELECT id,tag FROM tags WHERE user=?',
                          (user_id,)).fetchall()
        return jsonify(tags)
    return abort(400, error)


@bp.route('/<user_id>/create', methods=['POST'])
def create(user_id):
    data = request.get_json(force=True)
    tag = data['tag']
    db = get_db()
    error = None
    user = db.execute('SELECT * FROM user WHERE id=?', (user_id,)).fetchone()
    if not user:
        error = 'user does not exist'
    else:
        title = db.execute('SELECT * FROM tags WHERE tag=?', (tag,)).fetchone()
        if title:
            error = 'tag already exists'
        if error is None:
            db.execute('INSERT INTO tags(tag,user) VALUES(?,?)',
                       (tag, user_id))
            db.commit()
    return abort(400, error)


@bp.route('/<user_id>/delete/<tag_id>')
def delete(user_id, tag_id):
    db = get_db()
    error = None
    user = db.execute('SELECT * FROM user WHERE id=?', (user_id,)).fetchone()
    if not user:
        error = 'user does not exist'
    else:
        tag = db.execute(
            'SELECT * FROM tags where user=? AND id=?', (user_id, tag_id))
        if tag == None:
            error = 'selected tag does not exist'
        if error is None:
            db.execute('DELETE FROM tags WHERE user=? AND id=?',
                       (user_id, tag_id,))
            db.commit()
        return 'sucess'
    return abort(400, error)
