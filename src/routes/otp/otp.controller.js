const {
  sendOTP,
  handleOTPVerification,
} = require("../../models/otp/otp.model");
const requestOTP = async (req, res) => {
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

const verifyOTP = async (req, res) => {
  try {
    let { email, otp } = req.body;

    const validOTP = await handleOTPVerification({ email, otp });
    return res.status(200).json({ valid: validOTP });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { requestOTP, verifyOTP };
