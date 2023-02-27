import mongoose from "mongoose";

const { HOST, MONGO_PORT } = process.env;

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
