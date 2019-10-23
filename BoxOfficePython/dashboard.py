from flask import Flask, render_template, jsonify, request, Response
from flask_restful import Api, Resource
import bcrypt
from functools import wraps
import csv
import os

movies = []

app = Flask(__name__)
app.secret_key = "Thanks for the semester!"
api = Api(app, prefix="/api")
str = "plaintextboo" # originially set as the password. Hashed below.
hashedPassword = bcrypt.hashpw(str.encode('utf-8'), bcrypt.gensalt()) # HASH PASSWORD.
auth_user = [{
    "name": "admin",
    "password": hashedPassword #set password to the hashed version.
}]

def check_auth(username, password):
    """This function is called to check if a username /
    password combination is valid.
    """
    return username == 'admin' and bcrypt.checkpw(password.encode('utf-8'), hashedPassword) #compare hashed password with the password entered at login.

def authenticate():
    """Sends a 401 response that enables basic auth"""
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated



@app.route("/")
@requires_auth
def landing():
    return render_template("base.html")


## Flask-RESTful Resources and Routes

# Create Movie Collection Resource 
# this stuff will be run when the add_resioruce thing hits. this way no reason to add specific routes. 

class MovieListResource(Resource):
    def get(self):
        return jsonify(movies)


# Create Movie Item Resource
class MovieResource(Resource):
    def get(self, movie_id=None):
        movie = [m for m in movies if m["id"] == movie_id][0]
        return jsonify(movie)


api.add_resource(MovieListResource, "/movies/", endpoint="movies")
api.add_resource(MovieResource, "/movies/<int:movie_id>", endpoint="movie")

## Populate Movie List from CSV
with open("./data/bo.csv", "r") as bo:
    read_bo = csv.DictReader(bo, delimiter=",")
    for m in read_bo:
        try:
            ot = int(m["Opening Theaters"].replace(",", ""))
        except:
            ot = None
        try:
            tt = int(m["Theaters"].replace(",", ""))
        except:
            tt = None
        try:
            tg = float(m["Total Gross"].strip().replace("$", "").replace(",", ""))
        except:
            tg = None
        try:
            og = float(m["Opening"].strip().replace("$", "").replace(",", ""))
        except:
            og = None
        movies.append(
            {
                "id": int(m["ID"]),
                "title": m["Movie Title"],
                "studio": m["Studio"],
                "total_gross": tg,
                "total_theaters": tt,
                "opening_gross": og,
                "opening_theaters": ot,
            }
        )

if __name__ == "__main__":
    app.run()
