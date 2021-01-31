const express = require("express");
const app = express();
const { ROLE, users } = require("./data");
const { authUser, authRole } = require("./basicAuth");
const projectRouter = require("./routes/projects");

app.use(express.json());
app.use(setUser);

//no authUser as global middleware
//because we only want some routes
//to have authentication or authorized
//with authRole (that isnt global either)

app.use("/projects", projectRouter);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/dashboard", authUser, (req, res) => {
  res.send("Dashboard Page");
});

//user would have to be authenticated
//then users would have to be authorized
app.get("/admin", authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send("Admin Page");
});

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
}

app.listen(4200);
