function authUser(req, res, next) {
  //means we dont have a user...not logged in
  if (req.user == null) {
    //not authenticated!
    res.status(403);
    return res.send("You need to sign in");
  }
  next();
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
        //not authorized
      res.status(401);
      return res.send("Not allowed");
    }

    next();
  };
}

module.exports = {
  authUser,
  authRole,
};
