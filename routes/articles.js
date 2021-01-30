const express = require("express");
const Article = require("../models/article");
const router = express.Router();

//all routes related to article path will go here
//all the controller actions go in routes folder!

//redirects have their own slash...they dont use controller
//slash

//router utilizes controller actions and handles request flow

//remember everything in the path for a controller is based on
//the path we specified for the articleRouter we declared on the
//server....so if we made this "/test" instead of "test"
//we would need to do host_name/articles/test to access that endpoint
router.get("/new", (req, res) => {
  // we want to render a page inside article called new, remember we get
  //the presentation from the views!
  res.render("articles/new", { article: new Article() });
});

//cant edit by slug!, need to edit by id! think of slug like a nickname
router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", { article: article });
});

//run if an article is new
//instead of nasty id, using slug as id nickname
router.get("/:slug", async (req, res) => {
  //find returns an array, findOne returns one item from database
  //findById finds one item by id
  // instead of Article.findById(req.params.id), we are finding slug
  // what we query for : what we are querying against (getting slug from url)
  const article = await Article.findOne({ slug: req.params.slug });
  //   this below is so that if user entered incorrect id they
  // would just redirected to the home page where there is no
  // path after host name
  if (article == null) res.redirect("/");
  //show page is where we will show the
  res.render("articles/show", { article: article });
});

router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);
//deleting articles needs to be done with ids, not slugs..
//think of slug like a nickname
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticleAndRedirect(path) {
  //has to be let since we plan on redefining
  //articles down below! shouldnt use const here
  return async (req, res) => {
    //this is what middleware allows you to do!
    //we can set req.article to a variable
    //and modify the article properties that would
    //have the same properties as req!
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    //markdown is plaintext format
    article.markdown = req.body.markdown;

    //saving what was entered into the form and object here essentially
    //that was made from the schema Article
    try {
      //redirect user to the route with id, and basically in
      //that route will get the article that was already created
      //so that user can see that something was created already
      //when theyve been redirected
      article = await article.save();

      //and we need the before "/" with redirect so
      //we need to give the full path and everything after we want
      //instead of article.id
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      //console log to see error and do action in browser
      //this is for debugging
      console.log(e);
      //promise was rejected and we
      //are catching that here because article couldnt be saved
      //as there was already that same article present, so
      //create new article here

      //we want to fill the article object with what user passed
      // in previously
      //this url path is different from redirect because we are actually
      //utilizing controller actions foward slash
      //so we dont need the foward slash before the slash...redirect needs
      //be clear about the path for a refresh otherwise dont have slash
      res.render("articles/new", { article: article });
      res.render(`articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
