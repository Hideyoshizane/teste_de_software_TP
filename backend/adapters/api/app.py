import sys
from flask import Flask
from routes import app as routes_app
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(routes_app)

if __name__== '__main__':
    app.run(host='0.0.0.0', port=int(sys.argv[1]))