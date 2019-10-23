import os
import time
from datetime import datetime, date
from flask import Flask, request, session, url_for, redirect, render_template, g, flash
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config.update(dict(
    DEBUG= True,
    SECRET_KEY= 'secret key',
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(app.root_path, 'salon.db')
))

db = SQLAlchemy()
class User(db.Model):
	user_id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(50), nullable=False)
	password = db.Column(db.String(80), nullable=False)
	user_type = db.Column(db.String(80), nullable=False)
	def __init__(self, username, password, user_type):
		self.username = username
		self.password = password
		self.user_type = user_type
	def __repr__(self):
		return '<User {}>'.format(self.username)

class Event(db.Model):
	event_id = db.Column(db.Integer, primary_key=True)
	patron_id = db.Column(db.Integer, nullable=False)
	name = db.Column(db.String(50), nullable=False)
	date = db.Column(db.String(80), nullable=False)
	stylist = db.Column(db.String(50), default='test') #test value. Works okay. 
	def __repr__(self):
		return '<Event {}>'.format(self.date)

db.init_app(app)

@app.cli.command('initdb')
def initdb_command():
	db.drop_all()
	db.create_all()
	usr = User(username='Jon', password='Snow', user_type='stylist') #test stylist basically hardcoded in. Works. 
	db.session.add(User(username='owner', password='pass', user_type='owner'))
	db.session.add(usr)
	db.session.commit()

@app.before_request
def before_request():
	g.user = None
	if 'user_id' in session:
		g.user = User.query.filter_by(user_id=session['user_id']).first()

def get_user_id(username):
	rv = User.query.filter_by(username=username).first()
	return rv.user_id if rv else None

def get_all_events():
	rv = Event.query.order_by(Event.date).all()
	return rv if rv else []

#Find all the patrons. Used later for profile loading.
def get_patron_events(patron_id): 
	rv = Event.query.filter_by(patron_id=patron_id).order_by(Event.date).all()
	return rv if rv else []

#Find the stylists. Used later for profile loading.
def get_stylist_events(user_id):
	rv = Event.query.filter(Event.stylist==user_id)
	return rv if rv else []


def get_something():
	rv = User.query.filter_by(user_type='stylist').all()
	return rv if rv else []
def get_patron():
	rv = User.query.filter_by(user_type='patron').all()
	return rv if rv else []

def confirm_date(date):
	rv = Event.query.filter_by(date=date).first()
	return rv if rv else None



@app.route('/')
@app.route('/home') #home page.
def home():
	return render_template('home.html')

@app.route('/login', methods=['GET', 'POST']) #login to your account.
def login():
	if g.user:
		return redirect(url_for('profile'))
	error = None
	if request.method == 'POST':

		user = User.query.filter_by(username=request.form['username']).first()
		if user is None:
			error = 'Invalid username'
		elif user.password != request.form['password']:
			error = 'Invalid password'
		else:
			session['user_id'] = user.user_id
			return redirect(url_for('profile'))
	return render_template('login.html', error=error)


@app.route('/register', methods=['GET', 'POST']) #register an account (Owner registers for their own employees. All others register for themselves.)
def register():
	error = None
	if g.user and request.method == 'POST':
		if not request.form['username']:
			error = 'You have to enter a username'
		elif not request.form['password']:
			error = 'You have to enter a password'
		elif get_user_id(request.form['username']) is not None:
			error = 'The username is already taken'
		else:
			db.session.add(User(request.form['username'], request.form['password'], user_type='stylist'))
			db.session.commit()
			return redirect(url_for('login'))
	elif request.method == 'POST':
		if not request.form['username']:
			error = 'You have to enter a username'
		elif not request.form['password']:
			error = 'You have to enter a password'
		elif get_user_id(request.form['username']) is not None:
			error = 'The username is already taken'
		else:
			db.session.add(User(request.form['username'], request.form['password'], user_type='patron'))
			db.session.commit()
			return redirect(url_for('login'))
	return render_template('register.html', error=error)

@app.route('/logout') #Logout to main home page.
def logout():
	session.pop('user_id', None)
	return redirect(url_for('home'))

@app.route('/profile', methods=['GET', 'POST']) #Profile pages for each user class.
def profile():
	availiable = None
	if g.user.user_type == 'owner':
		events = get_all_events()
	elif g.user.user_type == 'patron':
		events = get_patron_events(g.user.user_id)
	else:
		events = get_stylist_events(g.user.username)
		availiable = get_all_events() #check to make sure there's an availibility for appointment for the stylist.
	return render_template('profile.html', events=events, availiable=availiable)	


@app.route('/specific', methods=['GET', 'POST']) #this is for patron to confirm appointment for themselves.
def specific():
	stylistName = get_something()
	if request.method == "POST":
		get_result = request.form["event"]
		g.user.user_type='stylist'
		g.user.username=get_result
		events = get_stylist_events(g.user.username)
		availiable = get_all_events()
		return render_template('profile.html', events=events, availiable=availiable)
	return render_template("myview.html", stylistName=stylistName)

@app.route('/stylist_page', methods=['GET', 'POST']) #this is the owner's view of the stylist page. 
def stylist_page():
	stylistName = get_something()
	if request.method == "POST":
		get_result = request.form["event"]
		g.user.user_type='stylist'
		g.user.username=get_result
		events = get_stylist_events(g.user.username)
		return render_template('stylistpage.html', events=events)
	return render_template("myview.html", stylistName=stylistName)

@app.route('/confirm_appointment', methods=['POST']) #for a patron to add an event we need to first check to make sure date is good and not clashing with another.
def confirm_appointment():
	if confirm_date(request.form['date']):
		flash("This Appointment Slot is BOOKED. Please Choose another one.")
	else:
		db.session.add(Event(name=request.form['name'], date=request.form['date'], patron_id=request.form['patron_id']))
		db.session.commit()
	events = get_patron_events(session['user_id'])
	return redirect(url_for('profile'))


@app.route('/cancel_appointment', methods=['POST']) #Cancel the appointment.
def cancel_appointment():
	db.session.delete(Event.query.filter_by(event_id=request.form['event_id']).first())
	db.session.commit()
	return redirect(url_for('profile'))


@app.route('/confirm_stylist', methods=['POST']) #confirm the stylist.
def confirm_stylist():
	st_id = Event.query.filter_by(event_id=request.form['event_id']).first()
	st_id.stylist = request.form['stylist']
	flash('Alright your appointment has been created!!')
	db.session.commit()
	return redirect(url_for('profile'))

@app.route('/patron_page', methods=['GET', 'POST']) #this is the owner's view of the patron page. Not Working. 
def patron_page():
	patronView = get_patron()
	availiable = None
	if request.method == "POST":
		get_patron_result = request.form["event"]
		g.user.user_type='patron'
		g.user.username = get_patron_result
		events = get_patron_events(g.user.user_id)
		return render_template('profile.html', events=events, availiable=availiable)
	return render_template("myview.html", stylistName=patronView)
