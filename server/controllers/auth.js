const auth = (req, res, next) => {
  if (!req.session.user_id) {
    res.status(401).redirect("/");
  } else {
    console.log("sess", req.session.user_id);
    next();
  }
};
module.exports = auth;
