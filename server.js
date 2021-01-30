//middleware is a function/program or something that runs
//between the time the server(this software
//fil) gets the request (through the url) and the time it takes to sends out
//a reponse to the client and for the client to receive that response
//every single thing in express is middleware! all the functions
//are middleware!

//req, res, next all makeup a callback function...but next
//is essentially a callback within a callback as it is also a function

//test middleware by typing in url in browser*******

//middleware is like a chain...not all middleware will be called,
//but only middleware involved in the request...
//if we call /users in browser...and we only had log middleware that
//is actually calling its callback function next we would get
//Log Users Page in our terminal

const express = require("express");
const app = express();

//the use function is expecting a function with parameters,
//req, res, and next...all being USED
//middleware being called with used...is global between paths

//global middleware should be at top of the file or else it wont be
//called because once a controller action completes its main
//purpose (sending a response with res.send())... the req, res cycle
//would end since the client got what it wanted

//global middleware is defined at the top with use, (utilized
//for every path that could go with a request)
app.use(logger);

//you can put a next callback function here but theres not point
//as there is no middleware after it...this would be the complete
//url that the client wanted to hit! so no other function would come
//after! this is why for our controller actions
//(controller actions are functions that handle
//request flow)...we dont see next inside
app.get("/", (req, res, next) => {
  res.send("Home");
});

//order of middleware matters! we would get, log, auth, and
//or callback middleware with req and res variables that would
//console log Users Page before controller ends its main action (resending
//a response  with
//res.send();
app.get("/users", auth, (req, res) => {
  // req.admin was set the false
  console.log(`User is admin = ${req.admin}`);
  console.log("Users Page");
  res.send("Users Page");
});

function logger(req, res, next) {
  // console.log(req.originalURl);
  console.log("Log");
  next();
}
// we dont want global middeware so we just make auth a function
//we only want some routes to be protected or guarded
function auth(req, res, next) {
  //req contains the entire url because client in browser
  //is sending a request containing that url to gain access
  //middleware allows you to access the
  //request and response parameters
  //to test these localhostport for host then
  //for path...users/?admin=true.....type this in browser
  //middleware can access user roles to authenticate
  if (req.query.admin === "true") {
    //we can access the augmented parts of the url too with req
    //as it is the entire url and then we can change it to any value
    //we want...but this value (true in this case) wont be shown
    //to the server but other middleware functions that
    //are controllers for paths can utilize this and display it
    //on that path but we can pass augmented variables of a particular
    //middleware to other middleware
    req.admin = true;
    next();
  } else {
    //a request is sent so the request response cycle would exit
    //here after sending what it needs to
    res.send("No auth");
  }
  //next() goes to next piece of middleware which would contain the
  //path that the user wanted to access (type path on localhost to
  // see )
}

//next() is not a return!!!! if you want to get out of the req res
//cycle at a particular middleware and your not wanting to send a
//response to exit then make sure to say return after next()

//LIKE

//next()
//return

//however this could be useful if you want to do something else
//after next() so its your call...could be useful for debugging
//with console logging

//listen on port 400
app.listen(4000);

//MAIN TAKEAWAY: Middleware is a function which takes a request,
//a response, and a next (next doesnt have to be used though...usually
//dont see next on controller actions...get, post, put, delete)

//and it'll call next() whenever it wants to move onto the 
//next form of middleware
//middleware is called in a sequence based on the users request(the
//url)

//middleware can augment the properties of the req variable and 
//pass that augmented req property to another piece of middleware
//so that it can utilize it

//Middleware can allow you to create custom error checking too!
