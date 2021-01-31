const express = require("express");
const router = express.Router();
const { projects } = require("../data");
const { authUser } = require("../basicAuth");
const {
  canViewProject,
  canDeleteProject,
  scopedProjects,
} = require("../permissions/project");

router.get("/", authUser, (req, res) => {
  //passing user and all the projects
  //then that is scoped(filtered) if user
  //or all projects given 
  res.json(scopedProjects(req.user, projects));
});

router.get("/:projectId", setProject, authUser, authGetProject, (req, res) => {
  res.json(req.project);
});

router.delete(
  "/:projectId",
  setProject,
  authUser,
  authDeleteProject,
  (req, res) => {
    res.send("Deleted Project");
  }
);

//we need to set project if user wants
//a specific project
function setProject(req, res, next) {
  //turn string into an integer...since json gives a string back
  //if we have alot...we would just do json.parse()
  const projectId = parseInt(req.params.projectId);
  req.project = projects.find((project) => project.id === projectId);

  if (req.project == null) {
    res.status(404);
    return res.send("Project not found");
  }
  next();
}

function authGetProject(req, res, next) {
  if (!canViewProject(req.user, req.project)) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
}

function authDeleteProject(req, res, next) {
  if (!canDeleteProject(req.user, req.project)) {
    res.status(401);
    return res.send("Not Allowed");
  }

  next();
}

module.exports = router;
