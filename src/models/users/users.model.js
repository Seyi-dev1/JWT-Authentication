const { request } = require("../../app");
const user = require("./users.mongo");

const { hashData } = require("../../utilities/hashData");

const createNewUser = async (data) => {
  try {
    const { name, email, password } = data;

    //checking if user already exists
    const existisUser = await user.findOne({ email });

    if (existisUser) {
      throw new Error("A user with the provided email already exists!");
    }

    //hash password
    const hashedPassword = await hashData(password);
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });
    //save user
    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    throw error;
  }
};
module.exports = { createNewUser };
