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
module.exports = { getUsers, obtainSessionInfo };
