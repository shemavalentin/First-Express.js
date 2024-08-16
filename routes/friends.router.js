const express = require("express");

const freindsController = require("../controllers/friends.controller");

// Using the express.router object to create a router

const friendsRouter = express.Router();
// We can now add friendsRouter in place of app whether to use app directly

// Posting a friend
// Replaced app with friendsRouter

// ADDING A CUSTOM MIDDLEWARE THAT APPLIES TO JUST THIS ROUTE
// to customize how our server reacts with different collections of data.

friendsRouter.use((req, res, next) => {
  // let's say for freindsRoute we need to show the IP Address of the machine making request
  console.log("Ip address:", req.ip);
  next();
});

// friendsRouter.post("/friends", freindsController.postFriend);
friendsRouter.post("/", freindsController.postFriend); // now POST is on root
/*
WHEN WE DEFINE THE ROUTES IN OUR friendsRouter, WE DO SO RELATIVE TO WHERE THE ROUTER WAS MOUNTED.
NOW, OUT POST request is going to be under /friends, so we can remoce the part of the name when 
name it in the router.
 */

/* WHY DO WE NEED TO THIS??
********************************
Well, by organizing things in this way, our friendsRouter doesn't need to worry about the
other routes in the application. It's kind of self contained application of its own.
********************************

*/

// Getting all friends
// Replaced app with friendsRouter

// friendsRouter.get("/friends", freindsController.getFriends);
friendsRouter.get("/", freindsController.getFriends);

// Getting an individual friend
// Replaced app with friendsRouter

friendsRouter.get("/:friendId", freindsController.getFriend);

module.exports = friendsRouter;

// NOTICE HOW THE ROUTER ONLY NEEDS TO WORRY ABOUT THE PATHS OF THE FRIENDS ENDPOINTS
// IN ISOLATION, WHICH MEANS LESS MENTAL OVERHEAD FOR US TO KEEP TRACK OF OTHER CODES
// THAT'S UNRELATED TO THE ROUTES THAT WE ARE CURRENTLY WORKING WITH.
