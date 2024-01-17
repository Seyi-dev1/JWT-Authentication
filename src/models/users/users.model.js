const { request } = require("../../app");
const user = require("./users.mongo");

const { hashData, verifyHashedData } = require("../../utilities/hashData");

const createToken = require("../../utilities/createToken");

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

const authenticateUser = async (data) => {
  try {
    const { email, password } = data;

    const fetchedUser = await user.findOne({ email });

    if (!fetchedUser) {
      throw Error("User does not exist!");
    }

    if (!fetchedUser.verified) {
      throw Error("email not verified. check mail for verification code");
    }

    const hashedPassword = fetchedUser.password;
    const passwordMatch = await verifyHashedData(password, hashedPassword);

    if (!passwordMatch) {
      throw Error("Invalid password entered");
    }

    // create user token
    const tokenData = { userId: fetchedUser._id, email };
    const token = await createToken(tokenData);

    // assign user token
    fetchedUser.token = token;
    return fetchedUser;
  } catch (error) {
    throw error;
  }
};
module.exports = { createNewUser, authenticateUser };
