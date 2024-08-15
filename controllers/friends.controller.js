const model = require("../models/friends.model");

function postFriend(req, res) {
  //It's always a good idea to validate inputs from users even though here we are certain
  // that the name is a string but we have to make sure that the user doesn't fill in ages,
  // or other object

  if (!req.body.name) {
    // if that doesn't exist we set an error status.
    // Now to avoid that Node will continious execution even though name is empty,
    // we have to tell it to return when name is empty and show the error message.
    // This is done when dealling with API Validation ligic

    return res.status(400).json({
      error: "Missing friend name!",
    });
  }

  // creating a new friend
  const newFriend = {
    // the important data we need to store is name and it is from the request(req) object
    // with body then name property =>(req.body.name)
    name: req.body.name, // this req.body won't exist unless we pass the JSON using our
    // middleware. Now let's go bellow the middleware to register that JSON

    // Then After, now our body will set to the object which was passed into the request

    // lastly let's set the id on our own
    id: model.length, // friends replaced by model
  };

  // Now let's add the friend to our array
  model.push(newFriend); // here friends was replaced by model

  // if a friend is added sussfully, we could return a JSON
  res.json(newFriend); // this is in keeping that all of our requests return JSON
}

// FUCNTION TO GET ALL OF FRIENDS

function getFriends(req, res) {
  res.json(model); // friends was replaced by model
}

// FUNCTION TO GET INDIVISUAL FRIEND
function getFriend(req, res) {
  const friendId = Number(req.params.friendId); // Notice how express populated the params property of request with the friendId

  const friend = model[friendId]; // assigning a friend that is being selected
  // friends was replaced by model
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      // send an object of propertes
      error: "Friend does not exist",
    });
  }
}

module.exports = {
  postFriend,
  getFriends,
  getFriend,
};
