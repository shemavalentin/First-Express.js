/*
// It's good to create express server in index.js file

// The first thing is to import the express server
const express = require("express");

// The way we create a server is like this: and it is very familiar now

// Setting up our applicationusing the express function that's exported from the
// express package

const app = express();
// Setting the port
const PORT = 3000;

// 1. Let's respond to the browser a message when user goes to slash (/) route
// we do it like this: REMEMBER EXPRESS IS ASSIGNED TO OUR app, then we specify the method,
// then add the path.

app.get("/", (req, res) => {
  // req and res here are a bit different like in node built in where here
  // we have a send() function which allows us to pass data in the response

  res.send({
    id: 1,
    name: "Shema Valentin",
  });
});

// 2. ROUTES TO RETRIEVE MESSAGES
app.get("/messages", (req, res) => {
  // May be sending an HTML comprising a list of messages
  res.send("<ul><li> Hello Valentin</li></ul>");
});

// 3. ROUTE TO POST NEW MESSAGES.

// Note: it is a must to always use these req and res when setting end points

app.post("/messages", (req, res) => {
  console.log("Updating messages ...");
});

// Calling the listen function as in http request and set it on app to start listening
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});

// ============================================================================== */
/*
const express = require("express");

const app = express();
const PORT = 3000;

// Let's have a list of freinds that we can add on or retrieve some
const friends = [
  {
    id: 0,
    name: "Albert Einstein",
  },

  {
    id: 1,
    name: "Sir Isaac Newtoon",
  },
];

app.get("/friends", (req, res) => {
  // res.send(friends); //Here, express will set the contents type to application JSON
  // because friends is an array of javascript objects as opposed to saying tring that
  // will be slash HTML as the content type

  // BUT EXPRESS HAS ANOTHER IMPORTANT FUNCTION TO DO THIS AS FOLLOW:
  res.json(friends); // Now the data that we pass in will for sure be  treated as
  // a JAVASCRIPT OBJECT NOTATION.
});

// HOW DO WE GET AN INDIVISUAL FRIEND? DO WE PASS THE URL THAT IS PASSED IN FROM REQ?
// There is another way in express

app.get("/friends/:friendId", (req, res) => {
  // But the friend ID that we are getting from the params is actually a string
  // because it's being grabbed straight from the URL. now befor we index our array
  // we need to convert it to a number. we can add a (+) to do it, but let's use Nuumbet
  // to be more explicit

  const friendId = Number(req.params.friendId); // Notice how express populated the params property of request with the friendId

  // Now let's be a little a bit responsible and validate our inputs as we don't know
  // what the user put in after the slash to avoid unexpected bugs.
  // It's always a good Idea to validate values that we not in control of like user inputs

  const friend = friends[friendId]; // assigning a friend that is being selected

  // if the Id that is passed in as a parameter(param), is not in the array
  // this friend will be undefined. which means we need to check wether the friend is foind
  if (friend) {
    // if the friend is found? ....
    // here also we can add the status to be more explicit even though express does
    res.status(200).json(friend);
  }

  // When the user enters an ID which does not exist like /freinds/22 making a GET request
  // Express will search for the different route handlers one by one, seeing if
  // they match what was passed in the request. So, our parameterized route over here
  // match the request which means that express won't return a 404 for this request
  // because this it's matches one of our handlers.

  // Now if we need to return a 404 because a friend wasn't found, we are going
  // have to do it ourselves. we can set the status and send it manually in a few
  // different ways. but let's do a good practice to send a meaningfull message
  // to the client
  else {
    res.status(404).json({
      // send an object of propertes
      error: "Friend does not exist",
    });
  }
});

app.get("/messages", (req, res) => {
  res.send("<ul><li> Hello Valentin</li></ul>");
});

app.post("/messages", (req, res) => {
  console.log("Updating messages ...");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});

// =================== WRITTING A MIDDLEWARE FOR EXPRESS SERVER ===================================== */

const express = require("express");
const freindsController = require("./controllers/friends.controller");
const messagesController = require("./controllers/messages.controller");

const app = express();
const PORT = 3000;

// Let's register the middleware here
app.use((req, res, next) => {
  //Now, what if we need to know the time these requests has took
  // and it should start count when the request entered in
  const start = Date.now();

  // // let's here show the data about our request and response
  // console.log(`${req.method} ${req.url}`); // Now we can keep track of all of our requests comming in
  // // then call next function to make sure that Express passes the request to the correct handlers/ Endpoints
  next();

  // The res will come back here in next function when the req is gotten to
  // to be displayed. let's now calculate difference in time here
  const delta = Date.now() - start; // the total amount in millsecond

  // let's here show the data about our request and response
  console.log(`${req.method} ${req.url} ${delta} ms`); // Now we can keep track of all of our requests comming in
  // then call next function to make sure that Express passes the request to the correct handlers/ Endpoints
});

// Now registering the JSON parsing middleware.
app.use(express.json()); //express.json will return a piece of middleware that looks like the above
// but that instead looks at the content type and sets the req.body to a JS object when the content
// is application.json

// CREATING POST ROUTE

// Now we are looking at the request object and reading data that was passed in from the client.
// Data that's in JSON format. The trouble is that our servers don't understand JSON out of the box.
// We could have do this ourselves through http but express.js has a solution (go to site and API reference)

// Posting a friend
app.post("/friends", freindsController.postFriend);

// Getting all friends
app.get("/friends", freindsController.getFriends);

// Getting an individual friend

app.get("/friends/:friendId", freindsController.getFriend);

app.get("/messages", messagesController.getMessages); // getMessages is a function handler
// for the get /messages here above. it is imported from messages.controllers.js

app.post("/messages", messagesController.postMessage);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
