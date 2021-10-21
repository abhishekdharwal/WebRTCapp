const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const http = require("http");
const UserDto = require("../dtos/user-dto");
class AuthController {
  async sendOtp(req, res) {
    //   here we destructure the req body for phone number
    const { phone } = req.body;

    console.log(phone);
    if (!phone) {
      res.status(400).json({ message: "phone field is requiered" });
    }
    //  generate a random number
    const otp = await otpService.generateOtp();
    // hash the otp

    const ttl = 1000 * 60 * 10; // expire time
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`; // creating hash

    const hash = hashService.hashOtp(data);

    // send otp
    try {
      // await otpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expires}`,
        phone: `${phone}`,
        otp: otp,
      });
    } catch (err) {
      console.log(phone);
      console.log(err);
      res.send(500).json({ message: " message sending failed " });
    }
  }

  async verifyOtp(req, res) {
    // logic
    const { phone, otp, hash } = req.body;
    console.log({ ...req.body });
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: " All field required" });
    }
    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({ message: " Otp expired" });
    }
    const data = `${phone}.${otp}.${expires}`;
    const isVaild = otpService.verifyOtp(hashedOtp, data);
    if (!isVaild) {
      res.status(400).json({ message: " Otp is not valid" });
    }
    // else {
    //   res.status(200).json({ message: " Otp is valid" });
    // }

    let user;
    // we need to put user data id

    try {
      user = await userService.findUser({ phone: phone });
      if (!user) {
        user = await userService.createUser({ phone: phone });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "DB error" });
    }

    // create json web token

    const { accessToken, refreshToken } = tokenService.generateToken({
      _id: user._id,
      activated: false,
    });
    //  res.cookie("refreshToken", refreshToken, {
    //   maxAge: 1000 * 60 * 60 * 24 * 30,
    //   httpOnly: true,
    // });
    await tokenService.storeRefreshToken(refreshToken, user._id);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 900000,
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 900000,
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: false });
  }
}

module.exports = new AuthController();
