# Assignment for Internship position at “Mobilicis India Private Limited” 

This is a web application project that consists of two folders: `frontend` and `backend`. 

## Getting Started

1. Navigate to the `frontend` folder and run `npm install` to install all the required frontend dependencies.
2. Run `npm run build` to build the frontend code.
3. Run `npm run start` to start the frontend development server.
4. Navigate to the `backend` folder and run `npm install` to install all the required backend dependencies.
5. Run `npm start` to start the backend server.

Once both servers are running, you should be able to access the frontend of application by navigating to `http://localhost:3000` in your web browser and backend of the application by navigating to `http://localhost:5000` in your web browser

The backend of this project includes several URLs that can be accessed for different purposes. These URLs include:

1. http://localhost:5000/ - This URL is the main URL of the backend and can be used to access the main application.

2. /users - This URL is used to access user data stored in the database.

3. /headers - This URL is used to access the headers of the tables in the database.

4. /cars - This URL is used to access the list of cars stored in the database.

5. /filters - This URL is used to access filtering options for the data stored in the backend.

Before heading over to this URL, please make sure to read the documentation provided in the project to understand how to use the filters properly.
Incorrect use of filters can lead to inaccurate or incomplete results.

5.i /filters/filter1 - This URL is used to find the users which have income lower than 
$5 USD (or any amount given) and have a car of brand “BMW” or “Mercedes” (or any car list given).

5.ii /filters/filter2 - This URL is used to find male users (or any gender given) which 
have phone price greater than 10,000 (or any phone number given). 

5.iii /filters/filter3 - This URL is used to find the users whose last name starts with 
“M” (or any letter or a set of letters given) and has a quote character length greater than 15 (or any length number given) and email includes his/her last name. 

5.iv /filters/filter4 - This URL is used to find the users which have a car of brand 
“BMW”, “Mercedes” or “Audi” (or any list of cars given) and whose email does not include any digit (you can customize if you need email that include or doesn't include any digit). 

5.v /filters/filter5 - This URL is used to show the data of top 10 (or any number given) 
cities which have the highest number of users and their average income. 

The frontend of this project includes several tabs that chas different filtering options.

Follow these steps to navigate to different tabs:

1. Click on the tab you want to navigate to in the navigation menu.
2. The content of the tab will be displayed on the screen.

Home
The home tab displays all the data present in the database.

Filter 1
The Filter 1 tab displays all the data based on the filter present in the "/filters/filter1" URL on the backend.

Filter 2
The Filter 2 tab displays all the data based on the filter present in the "/filters/filter2" URL on the backend.

Filter 3
The Filter 3 tab displays all the data based on the filter present in the "/filters/filter3" URL on the backend.

Filter 4
The Filter 4 tab displays all the data based on the filter present in the "/filters/filter4" URL on the backend.

Filter 5
The Filter 5 tab displays all the data based on the filter present in the "/filters/filter5" URL on the backend.

Additionally there is a Load More button on each page to load limited data, every time it is clicked, it renders 10 extra data from the database, the initial data shown on first page load is 10.

To access these URLs, you can use a web browser or a software tool that allows you to make HTTP requests. All of these URLs require no authentication and can be accessed directly within the web browser.