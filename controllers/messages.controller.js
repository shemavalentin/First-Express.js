// It's always a good idea to use named functions because when we are debugging our node
// application  and we get one of those error messages, node can tell us the name of the
// error in the log. Whereas when using arrow function it can't show the error even though
// we assigned a function to a contant. This is function expression. node can't see that
// function.
function getMessages(req, res) {
  res.send("<ul><li> Hello Valentin</li></ul>");
}

function postMessage(req, res) {
  console.log("Updating messages ...");
}

// In order for those functions to be accessed we need to export them from modules
module.exports = {
  getMessages,
  postMessage,
};
