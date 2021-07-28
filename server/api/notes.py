import functools
from flask import Blueprint
from flask import g, redirect, request, session, url_for, abort, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from api.db import get_db

bp = Blueprint('notes', __name__, url_prefix='/notes')


@bp.route('/<user_id>/create', methods=['POST'])
def create(user_id):
    data = request.get_json(force=True)
    print(data)
    title = data['title']
    body = data['body']
    tags = data['tags']
    print(tags)
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
        note_id = db.execute('INSERT INTO notes (title,body,user) VALUES(?,?,?)',
                             (title, body, user_id)
                             ).lastrowid
        for tag in tags:
            db.execute(
                'INSERT INTO notes_tags (tag,note) VALUES(?,?)', (tag, note_id))
        db.commit()
    return abort(400, error)


@bp.route('/<user_id>/get')
def get_all_notes(user_id):
    db = get_db()
    notes = db.execute(
        'SELECT n.id,n.title,n.body FROM notes n,user u WHERE n.user=u.id AND u.id=? ', (user_id)).fetchall()
    return jsonify(notes)


@bp.route('/<user_id>/get_notes_tags/<note_id>')
def get_tags(user_id, note_id):
    db = get_db()
    tags = db.execute(
        'SELECT t.tag FROM tags t,notes n,notes_tags tn WHERE tn.note = n.id AND tn.tag=t.id AND n.id=?', (note_id,)).fetchall()
    return jsonify(tags)


@bp.route('/<user_id>/delete/<note_id>')
def delete(user_id, note_id):
    db = get_db()
    db.execute('DELETE FROM notes WHERE id=? AND user=?', (note_id, user_id))
    db.commit()
    return 'sucess'


@bp.route('/<user_id>/serach/<tag>')
def search_title(user_id, tag):
    db = get_db()
    notes = db.execute(
        'SELECT n.id,n.title,n.body FROM notes n,user u,tags t,notes_tags nt WHERE n.user=u.id AND u.id=? AND nt.note=n.id AND nt.tag=t.id AND t.tag=? ', (user_id, tag)).fetchall()
    return jsonify(notes)
