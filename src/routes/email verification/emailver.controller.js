const {
  sendOTPToEmail,
  verifyEmailWithOTP,
} = require("../../models/otp/otp.model");

const httpSendOTPToEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("email not provided");
    }

    const createdEmailVerificationOTP = await sendOTPToEmail(email);
    return res.status(200).json(createdEmailVerificationOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// verify OTP
const httpverifyEmailWithOTP = async (req, res) => {
  try {
    let { email, otp } = req.body;
    if (!email || !otp) {
      throw Error("empty otp details are not allowed");
    }
    await verifyEmailWithOTP({ email, otp });
    return res.status(200).json({ email, verified: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = { httpSendOTPToEmail, httpverifyEmailWithOTP };
