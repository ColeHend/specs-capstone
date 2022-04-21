const localInfo = () => {
  let user_id = window.localStorage.getItem("user_id");
  let username = window.localStorage.getItem("username");
  return { user_id, username };
};

module.exports = localInfo;
