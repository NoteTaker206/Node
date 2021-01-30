//we use common js in node to import libraries, modules, frameworks,
//files, you name it...common js handles all imports
//express is a framework of node

//module is nothing more than code exported from a file
const express = require("express");
//creating an array of objects is good at first, to have
//mock data but you should get the actual data
//also we are displaying articles on the home page which
//is why we are getting here in the server as a controller
//action
const Article = require("./models/article");
const mongoose = require("mongoose");

const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();

// <dbname> can be changed to anything!
mongoose.connect(
  "mongodb+srv://kyle123:kevinkyle2@cluster0.k7taz.mongodb.net/Blog?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

//writing views in ejs code
//view engine converts ejs code to html
//make sure vscode extension is installed for ejs!
app.set("view engine", "ejs");

//url encoder should come above all the routers using express if
//we want any of our routers to be able to access body

app.use(express.urlencoded({ extended: false }));

//use methodOverride middleware so we can use delete operation
//to remove articles created in a form, we dont want to use a button
//because everytime google indexes our site, that would remove
//everything from our database

//allows us to override the methods of the form...we arent stuck
//with get or post anymore
app.use(methodOverride("_method"));

//so we can access the different parameters inside our article form
//this is global so it would apply to the controller actions in router
//the controller needs to access the properties of the articles model!
//this isnt always the case, but since we are using a form it is
//anytime u need to access the body! and our article model (the form)
//is in the body of the html page!

app.get("/", async (req, res) => {
  // this lets us find all the articles
  //since our model connects to the data
  //if we leave everything empty, you would
  //end up with everything from the database
  const articles = await Article.find().sort({
    //recent times are closer to the of the page
    createdAt: "desc",
  });
  //instead of sending, we render...render accesses of view!
  //put view file name, which would be index
  //file name always go in render

  //our index for our view is inside the articles folder
  //but we are render all the articles at that path in the browser
  //dont include / because our controller action has slash already! if you
  //look above in this same function

  //we dont need to say /views, /routes, /models because its all
  //the same path! index wasnt a path made with a controller
  //so thats why we dont see anything when we type in url

  //just know to include common path that view and route have
  //then do /index which would be the file name
  res.render("articles/index", { articles: articles });
});

//this middleware is all the way at the bottom because the controller
//action above is just so we have mock some data, wouldnt be here
//on a serious project

//we dont want global middleware so we need to specify
//the path here

// "/" foward before slash here because not inside controller
app.use("/articles", articleRouter);

app.listen(3500);

//had test data in a get controller action here
// const articles = [
//     {
//       title: "Test Article",
//       createdAt: new Date(),
//       description: "Test description",
//     },
//     {
//       title: "Test Article 2",
//       createdAt: new Date(),
//       description: "Test description 2",
//     },
//   ];
