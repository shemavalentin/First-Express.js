const express = require("express");

const messagesController = require("../controllers/messages.controller");

// Now CREATING MESSGES ROUTER
const messagesRouter = express.Router();

// app.get("/messages", messagesController.getMessages);

// messageRouter.get("/messages", messagesController.getMessages);

// AFTER MOUNTING
messagesRouter.get("/", messagesController.getMessages);

// app.post("/messages", messagesController.postMessage);
// messageRouter.post("/messages", messagesController.postMessage);

// AFTER MOUNTING
messagesRouter.post("/", messagesController.postMessage);

// Exporting module
module.exports = messagesRouter;

// Go to the server.js and mount that router on the slash messages

/* ***********************************************************
SOMETIMES IT'S FINE TO SEND ROW DATA BACK TO THE USER. THAT'S WHAT WE'VE BEEN DOING SO FAR
But sometimes our servers need to send entere files that already live on our server 
machines back to the client.

Express makes it very easy to do exactly that. Now for our message may our friend sent us a me
messsage and it's not formatted as JSON or as HTML, but instead they uploaded a photo.
We will put our files that we want to make availabe from our server in a new folder, which 
we will call public folder.

How do we now include this phoo when a user requests the messages collection from our server


*/
