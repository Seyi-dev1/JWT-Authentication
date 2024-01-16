const { sendOTP } = require("../../models/otp/otp.model");
const GetOTP = async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;

    const createdOTP = await sendOTP({
      email,
      subject,
      message,
      duration,
    });

    return res.status(200).json(createdOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = GetOTP;
