const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

//this schema has properties and those properties
//are actually objects that have properties that provide data logic
//on how we want the data to be from request

//a schema is just modeling data from the database, its a relationship
//between code in your software and the database

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    // we have a default data always at the current time
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    // so we dont have the same slug for for an article
    //slugs help create a cleaner url,
    unique: true,
  },
});
//any time we do anything...save update read delete...whatever
//this function will be ran
//think of this as prevalidation before putting into database
articleSchema.pre("validate", function (next) {
  if (this.title) {
    //if we are creating title to be a slug that is url friendly
    //we want the title slug to be lower case and we want to
    //remove faulty characters that wouldnt fit into the url...
    //we would have strict or true...cant have colons! thatd be for ids
    //strict true would remove that colon
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// form a relationship between article in database and
// article object we wrote here...since we modeled article
// on how data would be in the database, that is an articleSchema
module.exports = mongoose.model("Article", articleSchema);
