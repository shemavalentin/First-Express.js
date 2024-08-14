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
