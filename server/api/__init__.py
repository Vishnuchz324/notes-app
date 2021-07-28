import os
from flask import Flask, render_template
from flask_cors import CORS


def create_app(test_config=None):
    app = Flask("notes_app")
    CORS(app)
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

    from . import auth
    app.register_blueprint(auth.bp)

    from . import notes
    app.register_blueprint(notes.bp)

    from . import tags
    app.register_blueprint(tags.bp)

    return app
