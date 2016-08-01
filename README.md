# contactbook
An Express 4, Mongoose, MongoDB CRUD Application

## Why
This contactbook is nothing special. It was made a learning project and works like a regular contactbook, like one you might find on your phone. The purpose of this project was to provide myself with practice in utilizing both a backend and a frontend. JQuery AJAX handles requests on the frontend and is able to talk to the Express 4 Mongoose restful api on the backend. For studying purpose, you can see there is both a restful api and an application ready to handle crud operations, so if you're in need of some guidance on where to start, here you go.

## Using locally.

### Prerequisites:
To use this app all of the following must be installed:
* NodeJS https://nodejs.org/en/
* npm  *(Packaged with node installation).*
* MongoDB https://www.mongodb.com/

All can be downloaded from the links provided.

### Opening the project
Begin by opening an instance of mongodb in your terminal.
```
mongod
```
Once mongo is running, open a **new Terminal window or tab** and clone this repository. Then cd into the newly created directory.
```
git clone https://github.com/sinplea/contactbook
cd contactbook
```
Then you must install all the packages from package.json. Run:
```
npm install
```
From there, you are ready to start the application:
```
gulp start
```
Gulp will run a nodemon task to start the server, and the application will open at **localhost:8080**

*The localhost port value can be changed by going into __server/app.js__ and changing the PORT variable.*
```javascript
var PORT = process.env.PORT || 8080; // You can change 8080
````
## How it works
If you take some time to read through the app.js server file, you will notice:
```javascript
var db = process.env.DB + '/contactbook';
```
This line uses a dotenv variable declared in the .env file and connects to a local mongodb instance while creating a database for contactbook. **The path can be changed to anything you like. (e.g. var db = process.env.DB + '/test';)**

The Express/Mongoose server is then able to handle all GET, POST, PUT, and DELETE requests.

This app is fundamentally simple, but is a decent example of creating a restful api, talking to a server from the frontend using AJAX, and connecting to a database. A few of the future updates are listed below in the todo section. If you have any questions, please don't hesitate to ask.

*As I said before, contactbook was a learning project and will be the source from which I learn to do other bits of tech I haven't yet taken the time to learn. (e.g. production tools like docker, etc..)*

## Tech Stack
* Express 4
* Mongoose
* MongoDB
* Mustache
* Sass
* Twitter Bootstrap
* Gulp
* NodeJS


##TODO
* ~~Disable crud applications for other contacts when a contact is already being edited. __(Important)__~~
* Combine gulp task
* Refactor code
* Minify code and setup build application
* Add better styling
* Deploy to heroku
* Possibly add validation and testing
