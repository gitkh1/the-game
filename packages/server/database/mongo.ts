import mongoose from "mongoose";

import { HOST, MONGO_PORT } from "../configuration";

export function connectMongo() {
  mongoose.set("strictQuery", true);
  void mongoose.connect(`mongodb://${HOST}:${MONGO_PORT}/`);
  mongoose.connection
    .on("error", console.error)
    .on("disconnect", connectMongo)
    .on("open", () => {
      console.log("  ➜ 🎸 Connected to the mongo database");
    });
}
