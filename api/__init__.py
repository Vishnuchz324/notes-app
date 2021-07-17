import os
from flask import Flask, render_template


def create_app(test_config=None):
    app = Flask("notes_app")
    app.config.from_mapping(
        DATABASE=os.path.join(app.instance_path, 'notes_app.sqlite')
    )
    if test_config is not None:
        app.config.update(test_config)
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    app.config['ENV'] = 'development'
    app.config['DEBUG'] = True

    from . import db
    db.init_app(app)

    return app
