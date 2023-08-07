import { httpStatusCode } from "../lib/constants.lib";
import { ApiError } from "../lib/error.lib";
import { Crypt } from "../lib/crypt.lib";
import { Token } from "../lib/token.lib";
import OTPAuth from "otpauth";
import {
  sendMailResetPassword,
  sendMailVerificationCode,
} from "../lib/mail.lib";
import { Config } from "../config";
import User from "../models/user";

export const AuthController = {
  register: async (p_req, p_res, p_next) => {
    try {
      console.log("AuthController: register");

      const { firstName, lastName, email, password } = p_req.body;

      const _user = await User.findOne({ email: email });
      if (_user)
        throw new ApiError(httpStatusCode.BAD_REQUEST, "User already exists");

      const verificationCode = await Crypt.verificationCode();

      const newUser = new User({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: await Crypt.encrypt(password),
        verification_code: await Crypt.encode(verificationCode),
      });

      await newUser.save();

      const resMail = await sendMailVerificationCode(
        newUser.email,
        verificationCode
      );

      return p_res.json({
        user: { id: newUser.id, activated: newUser.activated },
        message: {
          success: "User saved succesfully. Check your email to activate.",
          warning: resMail,
        },
      });
    } catch (error) {
      return p_next(error);
    }
  },

  activate: async (p_req, p_res, p_next) => {
    try {
      console.log("AuthController: activate");

      const verificationCode = (
        await Crypt.encode(p_req.params.verificationCode)
      ).toString();

      const _user = await User.findOne({
        verification_code: verificationCode,
      });

      if (!_user)
        throw new ApiError(httpStatusCode.BAD_REQUEST, "User not exists");

      _user.activated = true;
      _user.verification_code = null;

      await _user.save();

      return p_res.json({
        user: { id: _user.id, activated: _user.activated },
        message: { success: "User activated successfully. Please Login." },
      });
    } catch (error) {
      return p_next(error);
    }
  },

  sendVerificationCode: async (p_req, p_res, p_next) => {
    try {
      console.log("AuthController: sendVerificationCode");

      const { id } = p_req.params;

      const _user = await User.findById(id);
      if (!_user)
        throw new ApiError(httpStatusCode.NOT_FOUND, "User not exists");

      const verificationCode = await Crypt.verificationCode();

      _user.verification_code = await Crypt.encode(verificationCode);
      await _user.save();

      const resMail = await sendMailVerificationCode(
        _user.email,
        verificationCode
      );

      return p_res.json({
        message: {
          info: "Email sent you. Check your email to activate account.",
          warning: resMail,
        },
      });
    } catch (error) {
      return p_next(error);
    }
  },

  signIn: async (p_req, p_res, p_next) => {
    try {
      console.log("AuthController: signIn");

      const { email, password } = p_req.body;

      const user = await User.findOne({ email: email });

      if (!user)
        throw new ApiError(httpStatusCode.BAD_REQUEST, "Username is incorrect");

      const matchPassword = await Crypt.compare(password, user.password);

      if (!matchPassword)
        throw new ApiError(httpStatusCode.BAD_REQUEST, "Password is incorrect");

      if (!user.activated) {
        const verificationCode = await Crypt.verificationCode();
        user.verification_code = await Crypt.encode(verificationCode);

        await user.save();

        const info = await sendMailVerificationCode(
          user.email,
          verificationCode
        );

        return p_res.json({
          user: { id: user.id, activated: user.activated },
          message: {
            info: "User is not verified. Check your email",
            warning: info,
          },
        });
      }

      const token = await Token.createAccess({ id: user.id });
      //const refresh_token = await Token.createRefresh({ id: user.id });

      p_req.session.user = user.email;
      /*p_res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh-token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });*/

      return p_res.json({
        user: { id: user.id, activated: user.activated },
        token: token,
      });
    } catch (error) {
      return p_next(error);
    }
  },

  forgotPassword: async (p_req, p_res, p_next) => {
    try {
      console.log("AuthController: forgotPassword");

      const { email } = p_req.body;

      const _user = await User.findOne({ email: email });
      if (!_user)
        throw new ApiError(httpStatusCode.NOT_FOUND, "User not exists");

      if (!_user.activated)
        throw new ApiError(httpStatusCode.FORBIDDEN, "User is not activated");

      const resetCode = await Crypt.resetCode();

      _user.password_reset = await Crypt.encode(resetCode);
      _user.password_reset_at = new Date(Date.now() + 10 * 60 * 1000);
      await _user.save();

      const url = `${Config.client_origin}/resetpassword/${resetCode}`;
      const resMail = await sendMailResetPassword(_user.email, url);

      return p_res.json({
        message: {
          info: "Email sent you. Check your email to reset password.",
          warning: resMail,
        },
      });
    } catch (error) {
      return p_next(error);
    }
  },

  resetPassword: async (p_req, p_res, p_next) => {
    try {
      console.log("AuthController: resetPassword");

      //const resetCode = (await Crypt.encode(p_req.params.resetCode)).toString();
      const { resetCode } = p_req.params;
      const { password } = p_req.body;

      const _user = await User.findOne({
        passwordReset: (await Crypt.encode(resetCode)).toString(),
        passwordResetAt: { $gt: new Date() },
      });
      if (!_user)
        throw new ApiError(
          httpStatusCode.NOT_FOUND,
          "Invalid code to reset password"
        );

      _user.password = await Crypt.encrypt(password);
      await _user.save();

      return p_res.json({
        message: { success: "Password reset successfully." },
      });
    } catch (error) {
      return p_next(error);
    }
  },

  signOut: async (p_req, p_res, p_next) => {
    try {
      console.log("AuthController: signOut");
      p_req.session.destroy();
      p_res.clearCookie("sid");
      //p_res.clearCookie("refreshtoken", { path: "/api/refresh-token" });

      return p_res.json({ message: { success: "Logged out!" } });
    } catch (error) {
      return p_next(error);
    }
  },

  generateAccessToken: async (p_req, p_res, p_next) => {
    try {
      console.log("AuthController: generateAccessToken");

      const rf_token = p_req.cookies.refreshtoken;

      if (!rf_token)
        throw new ApiError(httpStatusCode.BAD_REQUEST, "Please login");

      const result = Token.verify(rf_token);

      const user = await User.findOne({ id: result.id });

      if (!user)
        throw new ApiError(httpStatusCode.NOT_FOUND, "This does not exist.");

      const access_token = createAccessToken({ id: result.id });

      return p_res.json({ user: { ...user.id }, token: access_token });
    } catch (error) {
      return p_next(error);
    }
  },

  generateOTP: async (p_req, p_res, p_next) => {
    try {
      console.log("AuthController: generateOTP");

      const { user_id } = p_req.body;

      const _user = await User.findOne({ id: user_id });
      if (!_user)
        throw new ApiError(httpStatusCode.NOT_FOUND, "User not exists");

      const base32_secret = Crypt.generateRandomBase32();

      const totp = new OTPAuth.TOTP({
        issuer: Config.otp_issuer,
        label: Config.otp_label,
        algorithm: "SHA1",
        digits: 6,
        period: 15,
        secret: base32_secret,
      });

      const otpauth_url = totp.toString();

      await _user.update({
        otp_url: otpauth_url,
        otp_code: base32_secret,
      });

      return p_res.json({ otp_url: otpauth_url, otp_code: base32_secret });
    } catch (error) {
      return p_next(error);
    }
  },

  verifyOTP: async (p_req, p_res, p_next) => {
    try {
      console.log("AuthController: verifyOTP");
      const { user_id, otp_code } = p_req.body;

      const _user = await User.findOne({ id: user_id });
      if (!_user)
        throw new ApiError(httpStatusCode.NOT_FOUND, "User not exists");

      const totp = new OTPAuth.TOTP({
        issuer: Config.otp_issuer,
        label: Config.otp_label,
        algorithm: "SHA1",
        digits: 6,
        period: 15,
        secret: _user.otp_code,
      });

      const delta = totp.validate({ otp_code });

      if (delta === null) {
        throw new ApiError(httpStatusCode.UNAUTHORIZED, "QR Token is invalid");
      }

      const updatedUser = await _user.update({
        otp_enabled: true,
        otp_verified: true,
      });

      return p_res.json({
        otp_verified: true,
        otp_enabled: updatedUser.otp_enabled,
      });
    } catch (error) {
      return p_next(error);
    }
  },

  validateOTP: async (p_req, p_res, p_next) => {
    try {
      console.log("AuthController: validateOTP");
      const { user_id, token } = p_req.body;

      const _user = await User.findOne({ id: user_id });
      if (!_user)
        throw new ApiError(httpStatusCode.NOT_FOUND, "User not exists");

      const totp = new OTPAuth.TOTP({
        issuer: Config.otp_issuer,
        label: Config.otp_label,
        algorithm: "SHA1",
        digits: 6,
        period: 15,
        secret: _user.otp_code,
      });

      const delta = totp.validate({ token, window: 1 });

      if (delta === null) {
        throw new ApiError(httpStatusCode.UNAUTHORIZED, "Token is invalid");
      }

      return p_res.json({ otp_valid: true });
    } catch (error) {
      return p_next(error);
    }
  },

  disableOTP: async (p_req, p_res, p_next) => {
    try {
      console.log("AuthController: disableOTP");
      const { user_id } = p_req.body;

      const _user = await User.findOne({ id: user_id });
      if (!_user)
        throw new ApiError(httpStatusCode.NOT_FOUND, "User not exists");

      const updatedUser = await _user.update({
        otp_enabled: false,
      });

      return p_res.json({
        otp_enabled: updatedUser.otp_enabled,
      });
    } catch (error) {
      return p_next(error);
    }
  },
};
