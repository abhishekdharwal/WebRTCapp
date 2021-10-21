const router = require("express").Router();
const authController = require("./controllers/auth-controller");
const activateController = require("./controllers/activate-controller");
const admin = require("./controllers/test");
const authMiddleware = require("./middlewares/auth-middleware");
// here we used the class object as refernce to our res req function
router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate", authMiddleware, activateController.activate);
// router.post("/admin/addList", admin.addList);

module.exports = router;
