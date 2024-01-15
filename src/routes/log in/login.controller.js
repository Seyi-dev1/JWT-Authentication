const { authenticateUser } = require("../../models/users/users.model");

const logIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (!email || !password) {
      throw Error("Empty credentials supplied!");
    }

    const authenticatedUser = await authenticateUser({ email, password });

    // console.log(authenticatedUser.email)

    return res.status(200).json(authenticatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { logIn };
