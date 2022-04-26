// @ts-nocheck
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const {
  getUsers,
  obtainSessionInfo,
  getWorld,
  getWorlds,
  getGroups,
} = require("./controllers/getControl");
const {
  postUsers,
  postWorld,
  userLogin,
  postGroup,
  userRegister,
  logout,
} = require("./controllers/postControl");
const auth = require("./controllers/auth");
const app = express();
const PORT = process.env.PORT || 4000;
const { SECRET } = process.env;
const cookieParser = require("cookie-parser");

const { daSequel } = require("./sequel");
const session = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const mySqlStore = new SequelizeStore({
  db: daSequel(),
});
const oneDay = 1000 * 60 * 60 * 24;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store: mySqlStore,
    proxy: false,
    cookie: { maxAge: oneDay, user_id: 0, username: "" },
  })
);
mySqlStore.sync();
app.get("/api/getWorlds/:id", getWorlds);
app.get("/api/world/:id/:worldID", getWorld);
app.get("/api/groups/:worldID", getGroups);
app.get("/api/sessionInfo", auth, obtainSessionInfo);
app.get("/api/users", auth, getUsers);

app.post("/api/worlds", postWorld);
app.post("/api/groups", postGroup);
app.post("/api/users", auth, postUsers);
app.post("/api/login", userLogin);
app.post("/api/register", userRegister);
app.post("/api/logout", logout);
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
