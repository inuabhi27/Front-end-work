from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class Player(db.Model):
    player_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(24), nullable=False)
    pw = db.Column(db.String(64), nullable=False)
    birthday = db.Column(db.Date, nullable=False)

    def __init__(self, username, pw, birthday):
        self.username = username
        self.pw = pw
        self.birthday = birthday
        
    
        
    def birthday_format(self, format=None):
        if not format:
            return datetime.date.strftime('%B %d, %Y', self.birthday)
        else:
            return datetime.date.strftime(format, self.birthday)

    def games(self):
        return db.session.query(Game).filter(db.or_(Game.player_one_id==self.id, Game.player_two_id==self.id)).all()   
    

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player_one_id = db.Column(db.Integer, db.ForeignKey('player.player_id'))
    player_two_id = db.Column(db.Integer, db.ForeignKey('player.player_id'))
    turn = db.Column(db.Integer, nullable=False, default=0)
    game_over = db.Column(db.Boolean, nullable=False, default=False)
    winner_id = db.Column(db.Integer, db.ForeignKey('player.player_id'))
    turns = db.Column(db.String, nullable=False, default='')

    player_one = db.relationship('Player', foreign_keys=[player_one_id], backref='games_player_one')
    player_two = db.relationship('Player', foreign_keys=[player_two_id], backref='games_player_two')
    winner = db.relationship('Player', foreign_keys=[winner_id], backref='games_winner')

    
    def __init__(self, player_one_id, player_two_id, turn, game_over, winner_id):
        self.player_one_id = player_one_id
        self.player_two_id = player_two_id
        self.turn = turn
        self.game_over = game_over
        self.winner_id = winner_id

    
        
    
    def game_title(self):
        return "%s vs %s" % (self.player_one.username, self.player_two.username)
