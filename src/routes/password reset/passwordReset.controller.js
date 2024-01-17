const { sendPasswordResetOTPToEmail } = require("../../models/otp/otp.model");
const httpSendPasswordResetOTPToEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("email not provided");
    }
    const createdPasswordResetOTP = await sendPasswordResetOTPToEmail(email);
    return res.status(200).json(createdPasswordResetOTP);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = httpSendPasswordResetOTPToEmail;
