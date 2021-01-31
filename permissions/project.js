const { ROLE } = require("../data");

//an admin kyle can view all projects and his own
//but other users can only view their project
//this requires some special code like here

// READ permissions for one resource of a user
function canViewProject(user, project) {
  return (
    //boolean or operator (either user is a admin or user is owner of project)
    user.role === ROLE.ADMIN || project.userId === user.id
  );
}

//Read permissions for multiple resources of a user
function scopedProjects(user, projects) {
  // if user is admin return all of projects
  //
  if (user.role === ROLE.ADMIN) return projects;
  //if we have a user, get only projects that have userId of the
  //user making request
  return projects.filter((project) => project.userId === user.id);
}

//delete permissions
function canDeleteProject(user, project) {
  return project.userId === user.id;
}

module.exports = {
  canViewProject,
  scopedProjects,
  canDeleteProject,
};
