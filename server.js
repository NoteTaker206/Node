const express = require("express");
const app = express();
//using bcrypt to avoid database being vulnerable
const bcrypt = require("bcrypt");

app.use(express.json());

//const salt = bcrypt.genSalt()
//the higher the number you put in salt...
//the longer itll take to generate salt (just leave
//it empty)
//salt is a way of creating a different hash
//for passwords that may look the same...
//you do this so a hacker cracking one password,
//doesnt mean he can crack all passwords
//because the passwords have been given
//different salts to go by for the hashing

const users = [];

//in a real application you are not going to want
//to show anything related to user information...like passwords
app.get("/users", (req, res) => {
  res.json(users);
});

//using async because bcryptng something is asynchronous
app.post("/users", async (req, res) => {
  try {
    //shortcut for declaring salt is to just put 10 in second parameter
    //that is the strength of hash and default salt has a value of 10
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

//using bcrypt is async
app.post("/users/login", async (req, res) => {
  //we are finding name from user where user.name is strictly
  //equal to name of the request (from the json body)...this is so that we know
  //the same name in the json is the person in the user database
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    //400 is general user error
    return res.status(400).send("Cannot find user");
  }
  try {
    //bcrypt compare prevents timing attacks from hackers
    //that can be an issue with asynchronous operations

    //we get the salt from the user.password (already hashed)then the
    //req.body.password is hashed with same salt then we now
    //compare the two hashed passwords
    if (await bcrypt.compare(req.body.password, user.password)) {
      //hashed passwords are the same
      res.send("Success");
    } else {
      //hashed passwords arent the same, maybe the user entered
      //the wrong password so we just send not allowed
      //this would be not authorized error which is like 403
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(4000);
