const User = require("../../models/User");

const userCreate = async () => {
  const user = {
    firstName: "Jose",
    lastName: "Perez",
    email: "jose@academlo.com",
    password: "12345",
    celphone: "311276528",
  };

  await User.create(user);
};

module.exports = userCreate;
