//we couldve used enum as well
//since those are custom types
const ROLE = {
  ADMIN: "admin",
  BASIC: "basic",
};

module.exports = {
  ROLE: ROLE,
  //users database
  users: [
    { id: 1, name: "Kyle", role: ROLE.ADMIN },
    { id: 2, name: "Sally", role: ROLE.BASIC },
    { id: 3, name: "Joe", role: ROLE.BASIC },
  ],
  //projects database
  projects: [
    { id: 1, name: "Kyle's Project", userId: 1 },
    { id: 2, name: "Sally's Project", userId: 2 },
    { id: 3, name: "Joe's Project", userId: 3 },
  ],
};
