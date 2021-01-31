//loads our environment variables
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.error(error));

//lets our middleware functions utilize json
app.use(express.json());

//subscribers file that we made, NEEDS to match the name we have here
//after the routes ...which is subscribers
const subscribersRouter = require("./routes/subscribers");

//all requests for the subscribers path will be linked to middleware
//in the subcribers route
app.use("/subscribers", subscribersRouter);

app.listen(3000, () => console.log("Server started"));
