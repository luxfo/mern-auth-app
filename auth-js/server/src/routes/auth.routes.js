import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.get("/activate/:verificationCode", AuthController.activate);
AuthRouter.get(
  "/sendverificationcode/:id",
  AuthController.sendVerificationCode
);
AuthRouter.post("/forgotpassword", AuthController.forgotPassword);
AuthRouter.patch("/resetpassword/:resetCode", AuthController.resetPassword);
AuthRouter.post("/signin", AuthController.signIn);
//AuthRouter.post("/refresh-token", AuthController.generateAccessToken);
AuthRouter.delete("/signout", AuthController.signOut);
AuthRouter.post("/otp/generate", AuthController.generateOTP);
AuthRouter.post("/otp/verify", AuthController.verifyOTP);
AuthRouter.post("/otp/validate", AuthController.validateOTP);
AuthRouter.post("/otp/disable", AuthController.disableOTP);

export { AuthRouter };
