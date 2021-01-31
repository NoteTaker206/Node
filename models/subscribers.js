const mongoose = require("mongoose");
//data validation and defining how data
//should be done here
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subscribedToChannel: {
    type: String,
    required: true,
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

//the model in our database is Subscriber
//the schema to model that model is the subscriberSchema
//we need to export as mongoose.model so we can
//have a relationship between schema and the database
//mongoose will be able to interact directly
//with the database because of that
module.exports = mongoose.model("Subscriber", subscriberSchema);
