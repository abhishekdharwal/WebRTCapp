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
    await tokenService.storeRefreshToken(refreshToken, user._id);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  }
  // refesh
  async refresh(req, res) {
    // get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    // check if token is valid
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token 1" });
    }
    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        return res.status(401).json({ message: "Invalid token 2" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal Error" });
    }
    // check if valid user
    const user = await userService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(404).json({ message: "No user" });
    }
    // generate new token
    const { refreshToken, accessToken } = await tokenService.generateToken({
      _id: userData._id,
    });
    //update token
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "Internal Error" });
    }
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    // response
    const userDto = new UserDto(user);

    res.json({ user: userDto, auth: true });
  }
  async logout(req, res) {
    // delete refresh token fron db
    const { refreshToken } = req.cookies;
    await tokenService.removeToken(refreshToken);
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ user: null, auth: false });
    //delete cookies
  }
}

module.exports = new AuthController();
