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
