const { sequelize } = require("../sequel");
const bcrypt = require("bcrypt");
function postUsers(req, res) {
  const { username, password } = req.body;
  sequelize
    .query("INSERT INTO users(username,user_password) VALUES(?,?);", {
      replacements: [username, password],
    })
    .then((res) => {
      res.status(200).send(res);
    })
    .catch((err) => console.log(err));
}
function userLogin(req, res) {
  const { username, password } = req.body;
  sequelize
    .query(`SELECT * FROM users WHERE username=?`, {
      replacements: [username],
    })
    .then((res) => {
      console.log(res);
      const exists = bcrypt.compareSync(password, res[0][0].password);
      if (res[0][0].username === username && exists) {
        req.session.loggedIn = true;
        req.session.user_id = res[0][0].user_id;
        req.session.username = res[0][0].username;
        res.status(200).send(res);
      } else {
        res.status(200).send("Incorrect Login Info");
      }
    })
    .catch((err) => console.log(err));
}
function userRegister(req, res) {
  const { username, password, passwordConf } = req.body;
  if (password === passwordConf) {
    const salt = bcrypt.genSaltSync(10);
    const passHash = bcrypt.hashSync(password, salt);
    sequelize
      .query("INSERT INTO users(username,user_password) VALUES(?,?);", {
        replacements: [username, passHash],
      })
      .then((res) => {
        res.status.send(res);
      })
      .catch((err) => console.log(err));
  } else {
    res.send(200).send("passwords don't match");
  }
}
function logout(req, res) {
  req.session.destroy();
}
module.exports = { postUsers, userLogin, userRegister };
