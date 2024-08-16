const path = require("path"); // this will let us work with our paths handling all the different ways
const { title } = require("process");
// that any different operating system uses paths on that kind of machine.

// It's always a good idea to use named functions because when we are debugging our node
// application  and we get one of those error messages, node can tell us the name of the
// error in the log. Whereas when using arrow function it can't show the error even though
// we assigned a function to a contant. This is function expression. node can't see that
// function.
function getMessages(req, res) {
  /* 
In LINUX and MAC the file path looks like: folder/files.jpg
In Windows we use: \files\files.jpg

So to deal with these different scenarios, we're going to use the join function from the path module

*/
  // path.join(__dirname, "..", "public", "skimountain.jpeg"); // but this needs to be an absolute path. we have to use __dirname
  // res.send("<ul><li> Hello Valentin</li></ul>");

  // res.sendFile(
  //   path.join(__dirname, "..", "public", "images", "skimountain.jpeg")

  // rendering messages templates instead of res.sendFile()
  res.render("messages", {
    title: "Messages to my Loved ones",
    friend: " B K",
  });

  // ); // To help express find our file, we're going to make use of the built-in path module.
}

function postMessage(req, res) {
  console.log("Updating messages ...");
}

// In order for those functions to be accessed we need to export them from modules
module.exports = {
  getMessages,
  postMessage,
};
