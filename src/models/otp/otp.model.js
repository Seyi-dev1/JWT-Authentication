const OTP = require("./otp.model.mongo");
const user = require("../users/users.mongo");
const generateOTP = require("../../utilities/generateOTP");
const sendEmail = require("../../utilities/sendEmail");
const { hashData, verifyHashedData } = require("../../utilities/hashData");
const { AUTH_EMAIL } = process.env;

// OTP requesting
const sendOTP = async ({ email, subject, message, duration = 1 }) => {
  try {
    if (!email || !subject || !message) {
      throw Error("provide values for email, subject, message");
    }

    // clear any old record
    await OTP.deleteOne({ email });

    // generate pin
    const generatedOTP = await generateOTP();

    //send email to user
    const mailOptions = {
      from: AUTH_EMAIL,
      to: email,
      subject,
      html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code<b> expires in ${duration} hour(s)</b>.</p>`,
    };
    await sendEmail(mailOptions);

    // save otp record
    const hashedOTP = await hashData(generatedOTP);
    const newOTP = await new OTP({
      email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * +duration,
    });

    const createdOTPRecord = await newOTP.save();
    return createdOTPRecord;
  } catch (error) {
    throw error;
  }
};

// OTP veification
const handleOTPVerification = async ({ email, otp }) => {
  try {
    if (!email || !otp) {
      throw Error("provide values for email, otp");
    }

    // ensure otp record exists
    const matchedOTPRecord = await OTP.findOne({ email });

    if (!matchedOTPRecord) {
      throw Error("OTP records not found");
    }

    const { expiresAt } = matchedOTPRecord;

    //checkig for expired code
    if (expiresAt < Date.now()) {
      await OTP.deleteOne({ email });
      throw Error("Code has expired. Request a new code");
    }

    // not expired, verify value
    const hashedOTP = matchedOTPRecord.otp;
    const validOTP = await verifyHashedData(otp, hashedOTP);

    return validOTP;
  } catch (error) {
    throw error;
  }
};

const deleteOTP = async (email) => {
  try {
    await OTP.deleteOne({ email });
  } catch (error) {
    throw error;
  }
};

// sending OTP to email
const sendOTPToEmail = async (email) => {
  try {
    // check if the account exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      throw Error("account does not exist");
    }

    const otpDetails = {
      email,
      subject: "Email verification",
      message: "verify your email with the code below.",
      duration: 1,
    };
    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

// using OTP to verify email after it is sent
const verifyEmailWithOTP = async ({ email, otp }) => {
  try {
    const validOTP = await handleOTPVerification({ email, otp });
    if (!validOTP) {
      throw Error("invalid code submitted.");
    }

    await deleteOTP(email);
    return;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendOTP,
  handleOTPVerification,
  deleteOTP,
  sendOTPToEmail,
  verifyEmailWithOTP,
};
