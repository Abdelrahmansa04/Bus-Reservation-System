# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

<<<<<<< HEAD
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
=======
3- Add\delete a Bus (Admin)

4- Search for available Buses

5- Book a Bus

  - Seat selection
  - select date

6- Ticket summary

7- Payment and confirmation

8- Contact US

9- Trip Details

10- Session Authentication 

11- Hashed Password saving in the database

12- User Profile

13- Dashboard


///////////////////////////////////////////////////////

--Mohamed Tareq--
Made the bus schema, modified the front-end form for adding a bus but still not specific to admin, allowed the user to book a bus after the admin has added one.
Issues still exist for the APIs, indicating as they doesn't exist.

Added the functionalities of adding and deleting bus by providing their name, route, seats, and schedule.
made the schema and connected it to the back-end with express.js, It was well organised and handled routing efficiently.
conncted the front-end with the back-end using axios along with try-catch statements and logic handling for edge cases.
completely fixed the API endpoints problem by clearly understanding the routing techniques and proper handling for each endpoint.
next steps are modifying the UI and adding more functionalities to the back-end by extending the schema of the bus and allowing the users
to actually book and cancel the existing buses that the admin has added recently.

Made the User profile with details like name and email, and added the dashboard which shows the booked 
buses depending on the user's ID.


///////////////////////////////////////////////////////

--Abdelrahman Saeed-- 
made the homepage,  choose trip : add from(city) to (city), date(day of the trip) and adding popular trips with their prices in EGP.
top right corner to login/signup
top left corner name of the website, under the choose the trip our services  under it the popular trips in the website

added searching for busses(Bus types and avalible min seats and search buttons) and bus details(bus type, Departure Time, Available Seats and Facilities).

Make a New Homepage (branch) due to some error happened in the files so, make a new design and new themes
added the bus search and filters, added the popular routes, added filter for the pickup and arrival points.

Added the seat sselection and the contact us feature where to type any message u want to the admin

adjusting the UI of the seat selection and adjust the homepage where after selecting the trip go to the seat selection

Added the payment method (cardholdername, expire date, cvv) added the ticket summary and succesful message that appear all the details for client registration
modified all the pages UI that appear the same design 
Adjusted the Logic of the homepage (search bar and the hover of the buses avalibale), seatselection (confirmation disable until i choose the seat), payment( card number make space every 4 numbers and maximu is 16 number, espiry date every two numbers make automatic slash, cvv max 3 number)

manage the backend of the contact us using express and mongodb for database (use postman & mongodb compass for testing the database)

manage the logic of all the front end (homepage , bus seat selection and payment and confirmation and ticket summary)

added a new branch(m2) adjustin admin oage and making arrow from login to return to the register page.
///////////////////////////////////////////////////////

--Mohamed Abdalfattah--
made the login page with out the css, and the server and the registeration page, with the back end of them
made the seesion and the back end of the seat selection and the authentication
>>>>>>> c064d1781a0c092f64351f2b54ed7c2ede5e2aca
