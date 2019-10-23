# Box Office Dashboard -- Abhi

Name: Abhi Inuganti

## Installation

1. Run `pip install -r requirements.txt` in a Python 3.7+ virtual environment
2. Set the `FLASK_APP=dashboard.py` environment variable
3. Run `flask run` and navigate to `localhost:5000`

## Notes to the TA:

1. The username is "admin" and the password is "plaintextboo". Anything else will fail.
2. This program for whatever reason only seems to output correctly on firefox browser. 
3. The Top Ten movies by Studio is ordered and presented correctly but one main change from the original program that I added was a reset button that the user must click before selecting another studio.
4. When selecting a studio for the first time to see the top ten scores of that studio you will NOT need to do anything. But when you want to check another studio's top ten movies you will need to reset the page by clicking the reset button right below the dropdown menu for the studios. Aside from this little fix, the page does load and display correctly as needed by the requirements. 
5. If you don't click the button to reset the page, then the page will not format correctly for the future results.
