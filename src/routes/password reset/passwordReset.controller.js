const {
  sendPasswordResetOTPToEmail,
  resetPassword,
} = require("../../models/otp/otp.model");

// request OTP for password reset
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

// reset password after OTP has been sent and verified
const httpResetPassword = async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      throw Error("invalid credentials provided");
    }

    await resetPassword({ email, otp, newPassword });
    return res.status(200).json({ email, passwordResetSuccess: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { httpSendPasswordResetOTPToEmail, httpResetPassword };
