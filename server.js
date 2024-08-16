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

/*
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

// Now registering the JSON parsing middleware. This is a middleware itself from express
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

*/

// =========== USING ROUTERS IN EXPRESS ========

/*
When developping large applications we need to use routers to break down our application
and make it more modular.
What is route? It is like a mini application like express app here that is assigned to express.

We use routers to break down our application and make it more modular
and we can create a router by using express object called express.router
 */

const express = require("express");
const path = require("path");

const friendsRouter = require("./routes/friends.router");

const messagesRouter = require("./routes/messages.router");
const { title } = require("process");

const app = express();

// Telling the express where to find our handlebars as we don't have to import them
// by setting it.
app.set("view engine", "hbs"); // like this Express has all information to load Handlebars internally
// and find our templates in our project folder.

// Setting our views path
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;

// Let's register the middleware here
app.use((req, res, next) => {
  const start = Date.now();
  next();

  const delta = Date.now() - start;

  // We need to know which middleware is being hit in our logs
  // the add this to know: req.baseUrl
  // console.log(`${req.method} ${req.url} ${delta} ms`);
  console.log(`${req.method} ${req.baseUrl} ${req.url} ${delta} ms`);
});

// using Express static file middleware to handle many files
app.use("/site", express.static(path.join(__dirname, "public"))); // whether to make it available under the root, let avail it under /site

app.use(express.json()); // this will generate a middleware from express but equivalent to one of the above

// Serving our Handlebars file into the server
app.get("/", (req, res) => {
  // Telling Express that we're rendering the Handlebars file called index.hbs .
  // and the second parameter we pass in is an object which has the values for
  // all of variables in our Handlebars file.
  res.render("index", {
    title: "My friends are very clever",
    caption: "Let's go skiing!",
  });
});

// Now, the way we use routers in node is the same as we use any other middleware in node applications
// we need to make sure to use them by calling app.use() function just like other middleware

// *** NOW MOUNTING OUR friendRouter on the /friend path

app.use("/friends", friendsRouter); // this is sometimes also called mounting the router into the app.
// The special thing routers allow us to do is that "we can mount a group routes under a
// specific path". path here means an endpoint. So if we know that all our friends are going to
// be inder the slash friends path just with different HTTP methods and potentially something
// afterwards then we can mount our friendRouter on the slash

// MOUNTING messagesRouter ON THE SLASH MESSAGES PATH.
// To mount a router we use a form of middleware.
// So it responds to all the requests that go to slash messages

app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});

/* 
NOTE: One really common scenario when working with node servers is using Node to 
serve a front-end web application in addition to an API. It could be a plain old static HTML
website, or it could be React,or VueJS or Angular or any other framework.

One way we can do think using the Express static file middleware.
////////////////////////////////////
app.use("/site", express.static(path.join(__dirname, "public")));  on this line, Looking how
our server is structured, the part that serves static files which is this line is not very restful.

We're not talking to a collection of data and getting an item from it. We are just querrying
the server by passing in the file, like index.html. like this our server isn't sending collections
of data to the front end, to the browser to display however the browser wants. instead it's 
sending the full HTML and telling the brewser to just render whatever is in that HTML directly.
but that's ok.  Not being RESTfull isn't necessarily a bad thing if  we're serving files,
as opposed to working with row data.

However, if you expect your Node server to handle many thousands of users, oftentimes it's
better to server your files not from Node, like we've been doing, but instead from a CDN
(Content Delivery Network). Something like akamai.com, which runs a big portion of internet
or amazon's CloudFront. This way, you get specialized servers, run by these billion -dollar
companies, to host all your static files and data that's hosted locally in many different countries.
So your users in these locations have the quickest possible access times for those file.
So the specialized content delivey network deals with your static files, and Node can focus 
on what it does best, which is non-blocking asynchlonous input output for all of those 
restful endpoints in your API.
*/
