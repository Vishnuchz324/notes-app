import pytest
from flask import g, session
from api.db import get_db


def get_random_users(seed):
    userName = f'user{seed}'
    email = f'user{seed}_email@gmail.com'
    password = f'user{seed}@2020'
    data = {'userName': userName, 'email': email, 'password': password}
    return data


def get_data(app, user_id):
    with app.app_context():
        db = get_db()
        data = db.execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)).fetchone()
        db.close()
    return data


def test_register_new_user(client, app):
    '''
    creates and registers some random new users whose values are acceptable
    '''
    for user_id in range(1, 10):
        form = get_random_users(user_id)
        assert client.post(
            '/auth/register', data=form
        ).status_code == 200
        data = get_data(app, user_id)
        assert data != None
        if data:
            id, username, email, password = data
            assert username == form['userName']
            assert email == form['email']


def test_register_existing_users(client, app):
    '''
    creates and registers some random new users whose values are not acceptable
    '''
    user1 = get_random_users(1)
    user2 = get_random_users(2)
    user3 = get_random_users(3)
    user4 = get_random_users(4)

    # created a user user 1
    assert client.post(
        '/auth/register', data=user1
    ).status_code == 200

    # created a user with same username as user 1
    user2['userName'] = user1['userName']
    assert client.post(
        '/auth/register', data=user2
    ).status_code == 400

    # created a user with same email as user 1
    user3['email'] = user1['email']
    assert client.post(
        '/auth/register', data=user3
    ).status_code == 400

    # created a user with same password as user 1
    user4['password'] = user1['password']
    assert client.post(
        '/auth/register', data=user4
    ).status_code == 200
