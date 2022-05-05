const { sequelize } = require("../sequel");

function putWorld(req, res) {
  const { world_id, world_name, world_desc } = req.body;
  sequelize
    .query("UPDATE worlds SET world_name=?,world_desc=? WHERE world_id=?;", {
      replacements: [world_name, world_desc, world_id],
    })
    .then((dbRes) => {
      res.status(200).send(dbRes);
    })
    .catch((err) => console.log(err));
}
function putGroup(req, res) {
  const { group_id, group_name, group_desc } = req.body;
  sequelize
    .query("UPDATE groups SET group_name=?,group_desc=? WHERE group_id=?;", {
      replacements: [group_name, group_desc, group_id],
    })
    .then((dbRes) => {
      res.status(200).send(dbRes);
    })
    .catch((err) => console.log(err));
}
function putLocation(req, res) {
  const { location_id, locate_name, locate_desc } = req.body;
  sequelize
    .query(
      "UPDATE locations SET title=?,location_desc=? WHERE location_id=?;",
      {
        replacements: [locate_name, locate_desc, location_id],
      }
    )
    .then((dbRes) => {
      res.status(200).send(dbRes);
    })
    .catch((err) => console.log(err));
}
function putNPC(req, res) {
  const { char_id, npc_name, npc_desc } = req.body;
  sequelize
    .query("UPDATE characters SET char_name=?,char_desc=? WHERE char_id=?", {
      replacements: [npc_name, npc_desc, char_id],
    })
    .then((dbRes) => {
      res.status(200).send(dbRes);
    })
    .catch((err) => console.log(err));
}
module.exports = { putGroup, putWorld, putLocation, putNPC };
