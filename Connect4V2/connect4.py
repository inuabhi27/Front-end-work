import time
import os
import json
import datetime
from flask import Flask, request, session, url_for, redirect, render_template, abort, g, flash, _app_ctx_stack
from models import db, Player, Game


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    app.root_path, "connect4.db"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = 'this is a really bad key'
db.init_app(app)


@app.cli.command('initdb')
def initdb_command():
	"""Creates the database tables."""
	db.drop_all() 
	db.create_all()
	print('Initialized the database.')


if __name__ == "__main__":
    app.run(threaded=True)

@app.before_request
def before_request():
	g.player = None
	if 'player_id' in session:
		g.player = Player.query.filter_by(player_id=session['player_id']).first()

def get_player_id(username):
	rv = Player.query.filter_by(username=username).first()
	#return rv if rv else None
	return rv.player_id if rv else None

def return_game(game_id):
	rv = Game.query.filter_by(id=game_id).first()
	return rv if rv else None

# Home page
@app.route('/', methods=['GET', 'POST'])
@app.route('/home', methods=['GET', 'POST'])
def home():
	if not g.player:
		return redirect(url_for('login'))
	games = db.session.query(Game).all()
	return render_template('landing.html', games=games)


@app.route("/game/<game_id>/")
def game(game_id=None):
	if game_id:
		game = db.session.query(Game).get(game_id)
		return render_template("game.html", game=game)
	return abort(404)

@app.route('/send_data/<game_id>', methods=['GET', 'POST'])  
def update(game_id):
    if 'turn' in request.json and 'numTurns' in request.json and 'player' in request.json:
    	send_update(game_id, request.json, jsonList = [])
		
	

def send_update(game_id, update, jsonList):
    game = Game.query.filter_by(id = game_id).first()
    if update['numTurns'] > 2:
        jsonList = json.loads(game.turns)
        jsonList.append(json.dumps(update))
        game.turns = json.dumps(jsonList)
        db.session.commit()
    else:
        jsonList = []
        jsonList.append(json.dumps(update))
        game.turns = json.dumps(jsonList)
        db.session.commit()
		
            		

@app.route('/poller/<game_id>/<curr_turn>', methods=['GET', 'POST'])
def poller(game_id, curr_turn):
    game = return_game(game_id)
    if game:
        if game.turns == '':
            return '{}'
        jsonList = json.loads(game.turns)
        jsonList2 = []
        for i in jsonList:
            new_turn = json.loads(i)
            if new_turn['numTurns'] > int(curr_turn):
                jsonList2.append(i)
        return json.dumps(jsonList2)
   

@app.route('/create_game', methods=['POST'])
def create_game():
	username2 = request.form["two"]
	x = g.player.player_id
	y = get_player_id(username2)
	db.session.add(Game(x,y,0,0,-1))
	db.session.commit()
	games = db.session.query(Game).all()

	

@app.route('/do_something')
def do_something():
	return render_template('create_game2.html')

@app.route('/delete_game', methods=['GET', 'POST'])
def delete_game():
	if request.method == 'POST':
		myusername = request.form['username']
		mypassword = request.form['password']
		check = get_player_id(myusername)
		if check == g.player.player_id:
			x = get_player_id(myusername)
			game = Game.query.filter_by(player_one_id = x).first() 
			db.session.delete(game)
			db.session.commit()
		return redirect(url_for('home'))
	return render_template('delete_game.html')


# Login functionality
@app.route('/login', methods=['GET', 'POST'])
def login():
	#if a user is already logged in, redirect them to the homepage
	if g.player:
		return redirect(url_for('home'))
	error = None
	if request.method == 'POST':
		player = Player.query.filter_by(username=request.form['username']).first()
		if player is None:
			error = "Invalid Username or Password"
		elif player.pw != request.form['password']:
			error = "Invalid Username/Password"
			return redirect(url_for('login'))

		else:
			flash("Logged in successfully.")
			session['player_id'] = player.player_id
			return redirect(url_for('home'))
	return render_template("login.html", error=error)
	
# Logout
@app.route('/logout')
def logout():
	session.pop('player_id', None)
	return redirect(url_for('login'))	
	
# Register functionality
@app.route('/register', methods=['GET', 'POST'])
def register():
	
	if g.player:
		return redirect(url_for('home'))
	error = None
	if request.method == 'POST':
		if not request.form['username']:
			error = "You must enter a username"
		elif not request.form['password']:
			error = "You must enter a password"
		elif not request.form['birthday']:
			error = "You must enter a birthday"
		else:
			text = request.form['birthday']
			db.session.add(Player(request.form['username'], request.form['password'], datetime.datetime.strptime(text, '%m/%d/%Y').date()))
			db.session.commit()
			return redirect(url_for("login"))
	return render_template("register.html", error=error)



