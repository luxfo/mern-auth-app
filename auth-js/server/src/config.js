process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";

import dotenv from "dotenv";

console.log(process.env.APP_ENV);

dotenv.config({
  path: __dirname + "/../env/" + process.env.APP_ENV + ".env",
});

export const Config = {
  app_host: process.env.APP_HOST || "localhost",
  app_port: process.env.APP_PORT || 3000,
  client_origin: "http://localhost:5173",
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
  jwt_access: process.env.JWT_ACCESS_KEY,
  jwt_refresh: process.env.JWT_REFRESH_KEY,
  otp_issuer: process.env.OTP_ISSUER,
  otp_label: process.env.OTP_LABEL,
  datasource: {
    host: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
  },
  session: {
    cookie: {
      httpOnly: true,
      maxAge: process.env.SESSION_TIMEOUT * 60 * 1000,
      sameSite: "strict",
      secure: process.env.SESSION_SECURE,
    },
    name: "sid",
    resave: false, // whether to save the session if it wasn't modified during the request
    rolling: true, // whether to (re-)set cookie on every response
    saveUninitialized: false, // whether to save empty sessions to the store
    secret: process.env.SESSION_KEY,
  },
};
