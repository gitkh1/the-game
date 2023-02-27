/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, HOST } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: "postgres",
};

export const sequelize = new Sequelize(sequelizeOptions);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await import("../models/topicModels");
    await sequelize.sync();
    console.log("🎸 Connection has been established successfully.");
  } catch (e) {
    console.error(e);
    console.error("Unable to connect to the database:", e);
  }
};
