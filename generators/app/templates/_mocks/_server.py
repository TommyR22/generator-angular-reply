from flask import Flask, make_response, request, current_app, jsonify, Response, json
from datetime import datetime, timedelta
from functools import update_wrapper
import logging
from utilsModule import mocks
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
#logging.basicConfig(level=logging.DEBUG)

# load configs from file: config.cfg
app.config.from_pyfile('assets/config.cfg')

# -- ROUTE: / -- #
@app.route("/helloWorld")
def hello():
    return "Hello World!"

# -- ROUTE: postExample -- #
@app.route('/path/postExample', methods=['POST'])
def postExample():
    app.logger.info('postExample()')
    response = mocks.postExample()

    r = Response(json.dumps(response), status=200, mimetype="application/json")
    r.headers["Content-Type"] = "application/json; charset=utf-8"
    return r


# -- MAIN -- #
if __name__ == "__main__":
    app.run(debug=True)
