const { sequelize } = require("../sequel");

function getUsers(req, res) {
  sequelize
    .query("SELECT * FROM users;")
    .then((res) => {
      res.status.send(res);
    })
    .catch((err) => console.log(err));
}
module.exports = { getUsers };
