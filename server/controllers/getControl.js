const { sequelize } = require("../sequel");
function getUsers(req, res) {
  sequelize
    .query("SELECT * FROM users;")
    .then((res) => {
      res.status.send(res);
    })
    .catch((err) => console.log(err));
}
function obtainSessionInfo(req, res) {
  if (req.session.isLoggedIn) {
    res.status(200).send({ ...req.session });
  }
}
function getWorlds(req, res) {
  // const { user_id } = req.session;
  const user_id = req.params.id;
  console.log("id: ", user_id);
  console.log(req.session);
  sequelize
    .query("SELECT * FROM worlds WHERE user_id=?", { replacements: [user_id] })
    .then((dbRes) => {
      console.log(dbRes[0]);
      res.status(200).send([dbRes[0]]);
    })
    .catch((err) => console.log(err));
}
function getWorld(req, res) {
  const { worldID } = req.params;
  sequelize
    .query("SELECT * FROM worlds WHERE world_id=?;", {
      replacements: [+worldID],
    })
    .then((dbRes) => {
      res.status(200).send(dbRes[0]);
    })
    .catch((err) => console.log(err));
}
function getGroups(req, res) {
  const world_id = req.params.worldID;
  sequelize
    .query("SELECT * FROM groups WHERE world_id=?;", {
      replacements: [+world_id],
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.log(err));
}
module.exports = {
  getUsers,
  obtainSessionInfo,
  getWorld,
  getWorlds,
  getGroups,
};
