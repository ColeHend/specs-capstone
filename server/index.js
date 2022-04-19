require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { getUsers } = require("./controllers/getControl");
const {
  postUsers,
  userLogin,
  userRegister,
} = require("./controllers/postControl");

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
    cookie: { maxAge: oneDay },
  })
);
mySqlStore.sync();

app.get("/api/users", getUsers);
app.post("/api/users", postUsers);
app.post("/api/login", userLogin);
app.post("/api/register", userRegister);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
