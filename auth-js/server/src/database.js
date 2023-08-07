import mongoose from "mongoose";
import { Config } from "./config";

export const DataSource = {
  initialize: async () => {
    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(
        "mongodb://" +
          Config.datasource.host +
          "/" +
          Config.datasource.database,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log("Database is connected");
    } catch (error) {
      console.log("Database Error");
      console.log(error);
    }
  },
};
