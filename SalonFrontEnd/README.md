# Treat Yo Self

Name: Abhi Inuganti


## Installation (installation for running on a mac as that was my device).

1. First "pip3 install -r requirements.txt"
2. After that, "export FLASK_APP=salon.py"
3. After that, "python3 -m flask initdb"
4. After that, "python3 -m flask run"

Note: This setup might be different on a windows computer, or a device with python2. The method above works with venv environment as well.

## Running the App

1. Follow the installation guide above. 
2. After enter "python3 -m flask run" you will be given the address that can be opened in any browser (preferrably google chrome)
3. From there you can simply interact with the app.
4. In accordance to the guidelines, when you enter into the Owner's account you will have an option(as a button) to create new stylist accounts, and a button to view the appointments of stylists. If there are no appointments then you will be notified of that as it will tell you that there are empty spots or nothing has been scheduled. Else you can see all the necessary appointments. Note: the option to look into the patron's account is uncompleted and does not work. Everything else should be fine.
5. When you enter the Stylist account [made by user], You will see your appointment with the date and time along with the patron's name. NOTE: I used "datetime-local" input to keep track of date and time and while it does that it doesn't display the time in 24 hr format instead in "military time". My apologies for that inconvenience. 
6. When you enter the Patron's account, you will have the option of scheduling an appointment between the Tues-Saturday window from the open hours. I just set this as the time-window from 11/6/18 to 11/10/18. I implemented the appointment scheduling by entering in a correct time slot, and then making the user select a stylist from a button on the top to confirm the appointment. There is no seperate page for scheduling appointments as it's all done via the input "datetime-local". Conflicting schedules will be considered unapplicable and booked. 
