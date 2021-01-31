const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscribers");

//Getting all
router.get("/", async (req, res) => {
  try {
    //find with nothing inside means get all
    const subscribers = await Subscriber.find();

    res.json(subscribers);
  } catch (err) {
    //server and or database had an error (500)...
    //had nothing to do with actual client
    //all 500s errors are like that
    res.status(500).json({ message: err.message });
  }
});
//Getting One
// : means parameter
router.get("/:id", getSubscriber, (req, res) => {
  //we had res.params.id before,
  //had res.subscriber.name before
  //with json we are simply taking
  //the response and converting
  //it to json and sending that
  //stacked res to do this!
  res.json(res.subscriber);
});
//Creating one
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    //we are try to resolve a promise to
    //create a new suscriber
    //and if it does then
    //save mongoose method will save newly created
    //subscriber to the database
    const newSubscriber = await subscriber.save();
    //200s mean success...201 means successfully
    //created an object...use 201 for post controllers
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Updating One...(using patch instead of put because we only want to update
//what the user passes us instead of an entire collection or something
router.patch("/:id", getSubscriber, async (req, res) => {
  //we only want to update things sent to us
  //in the request...the request.body
  //request.body is like the inner parts of json and all
  //that json objects properties

  //is essentially info the user sent to us
  if (req.body.name != null) {
    //if user sent us a name lets
    //have res get those names
    res.subscriber.name = req.body.name;
  }
  //
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    //get updated subscriber if successfuly saved
    //to database
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    //no need to store something that your
    //going to delete
    await res.subscriber.remove();
    res.json({ message: "Deleted subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//need to get subscriber for the routes with id,
//because how would you delete or update something
//that you dont have?
async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    //using let because we are
    //going to reuse this in not only
    //delete but patch and we cant reassign a const
    //variable to a different value but let we can
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      //if you couldnt find the subscriber...404 is not found
      //we are returning here because if there is no subscriber
      //there would be no point staying and we would
      //cause more errors if we did
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  //this is so our other middleware
  //functions can receive this response
  //of the particular subscriber if need me
  //we can create properties for the res variable
  //in a middleware function and pass to other
  //middleware
  res.subscriber = subscriber;
  //move onto next piece of middleware
  next();
}

//anytime you make properties
//through updating or deleting you use
//res and modify middlewares res and
//add properties from user request
//if we get the subscriber as middleware
// essentially we are just prepping for a response

//if you are querying to add roles, you want
//to see if something is true. so you would
//utilize req.query!
//we use req by itself to usually
//verify something

module.exports = router;
