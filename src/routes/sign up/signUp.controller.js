const { createNewUser } = require("../../models/users/users.model");
const { sendOTPToEmail } = require("../../models/otp/otp.model");

const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Missing user credentials",
      });
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      return res.status(400).json({
        error: "invalid name entered",
      });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({
        error: "invalid email entered",
      });
    } else if (password.length < 8) {
      return res.status(400).json({
        error: "password too short",
      });
    } else {
      // good credentials. Ergo, create new user
      const newUser = await createNewUser({
        name,
        email,
        password,
      });
      await sendOTPToEmail(email);
      return res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { signUp };
