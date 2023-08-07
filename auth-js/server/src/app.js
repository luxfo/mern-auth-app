import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { Config } from "./config";
import authMW from "./middlewares/auth.mw";
import errorMw from "./middlewares/error.mw";
import { AuthRouter } from "./routes/auth.routes";
import { UserRouter } from "./routes/user.routes";
import { DataSource } from "./database";

export class App {
  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.errors();
    this.connections();
  }

  settings() {
    this.app.set("pkg", { name: "Authentication", version: "1.0" });
    this.app.set("port", Config.app_port);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(cookieParser());
    this.app.use(cors(Config.cors));
    this.app.use(express.json());
    this.app.use(session(Config.session));
    this.app.use(authMW());
  }

  routes() {
    this.app.use("/api/auth", AuthRouter);
    this.app.use("/api/user", UserRouter);
  }

  errors() {
    this.app.use(errorMw);
  }

  connections() {
    DataSource.initialize();
  }

  async listen() {
    const _port = this.app.get("port");
    this.app.listen(_port);
    console.log("server on port", _port);
  }
}
