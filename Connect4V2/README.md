# Connect 4 II: The Revenge

Name: Abhi Inuganti


## Installation

1. Run `pip install -r requirements.txt` in a Python 3.7+ virtual environment
2. Set the `FLASK_APP=connect4.py` environment variable and run `flask initdb`
3. Run `flask run` and navigate to `localhost:5000`

## Playing the game
1. I just entered some test values for the two players.
2. Player One: Username = Alice, Password = Smith, Birthday = 01/02/1997.
3. The birthday text must be in a MM/DD/YYYY. I had this input as a text, so not like a data input.
4. Player Two: Username = Bob, Password = Smith, Birthday = 01/02/1998.
5. After this you will navigate to the landing page, where you can add another player's name to the textbox to create a game. 
6. After that click the enter button and that will create a game option, which you can click to start playing the game.
7. You can delete the game but only those who created the game can delete it otherwise the game will literally crash. 

## Information about this program:
 
1. The game is implemented with xmlhttprequest for the creation of a game, and uses polling for the actual gameplay for the multiplayer across browser. 
2. You can still create accounts and login in to your accounts and logout wherever you are.
3. The landing page does list all the games that the player is involved in.
4. The game creation works and does go to backend and uses polling.
