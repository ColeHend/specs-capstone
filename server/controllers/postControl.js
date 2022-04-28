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
    .then((dbRes) => {
      const exists = bcrypt.compareSync(password, dbRes[0][0].user_password);
      if (dbRes[0][0].username === username && exists) {
        req.session.loggedIn = true;
        req.session.user_id = dbRes[0][0].user_id;
        req.session.username = dbRes[0][0].username;
        console.log("session: ", req.session);
        console.log("Db res: ", dbRes);

        res.status(200).send(dbRes[0][0]);
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
      .then((dbRes) => {
        console.log(dbRes);
        res.status(200).send(dbRes[0][0]);
      })
      .catch((err) => console.log(err));
  } else {
    res.send(400).send("passwords don't match");
  }
}
function logout(req, res) {
  req.session.destroy((err) => console.log(err));
  res.status(200).redirect("/");
}
function postWorld(req, res) {
  console.log(req);
  // const { user_id } = req.session;
  const { user_id, world_name, world_desc, map_img_link } = req.body;
  if (user_id) {
    sequelize
      .query(
        "INSERT INTO worlds(user_id ,world_name,world_desc, map_img_link ) values(?,?,?,?);",
        {
          replacements: [+user_id, world_name, world_desc, map_img_link],
        }
      )
      .then((dbRes) => {
        sequelize
          .query(
            `SELECT * from worlds WHERE user_id=? AND world_name=? AND world_desc=? AND map_img_link=?`,
            { replacments: [user_id, world_name, world_desc, map_img_link] }
          )
          .then((worldRes) => {
            const { world_id } = worldRes[0];
            console.log(worldRes[0]);
            res.status(200).send({
              user_id,
              world_name,
              world_desc,
              map_img_link,
              world_id,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else {
    res.status(401).send({ message: "not logged in" });
  }
}
function postGroup(req, res) {
  const { user_id, world_id, group_name, group_desc } = req.body;
  sequelize
    .query(
      "INSERT INTO groups(user_id,world_id,group_name,group_desc) VALUES (?,?,?,?);",
      {
        replacements: [user_id, world_id, group_name, group_desc],
      }
    )
    .then(({ data }) => {})
    .catch((err) => console.log(err));
}
function postLocation(req, res) {
  const { user_id, curr_world_id, curr_group_id, locate_name, locate_desc } =
    req.body;
  sequelize
    .query(
      "INSERT INTO locations(user_id,world_id,parent_id,title,location_desc) VALUES(?,?,?,?,?);",
      {
        replacements: [
          user_id,
          curr_world_id,
          curr_group_id,
          locate_name,
          locate_desc,
        ],
      }
    )
    .then((dbRes) => {
      res.status(200).send(dbRes);
    })
    .catch((err) => console.log(err));
}
module.exports = {
  postGroup,
  postUsers,
  userLogin,
  userRegister,
  logout,
  postWorld,
  postLocation,
};
