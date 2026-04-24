from flask import Flask
from routes.auth import auth
from routes.recommendation import recommendation

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret'

app.register_blueprint(auth, url_prefix='/api')
app.register_blueprint(recommendation, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True, port=5000)