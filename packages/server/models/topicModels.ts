/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import { sequelize } from "../database/postgres";

export interface I_ResParams {
  id: number;
}

export interface I_Topic extends Model<InferAttributes<I_Topic>, InferCreationAttributes<I_Topic>> {
  id: CreationOptional<number>;
  text: string;
  author: string;
  authorId: number;
}
export interface I_Comment extends Model<InferAttributes<I_Comment>, InferCreationAttributes<I_Comment>> {
  id: CreationOptional<number>;
  text: string;
  messageCount?: number;
  authorId: number;
}
export interface I_Message extends Model<InferAttributes<I_Message>, InferCreationAttributes<I_Message>> {
  id: CreationOptional<number>;
  text: string;
  authorId: number;
}

export const Topic = sequelize.define<I_Topic>("topic", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  authorId: { type: DataTypes.INTEGER, allowNull: false },
});

export const Comment = sequelize.define<I_Comment>("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
  authorId: { type: DataTypes.INTEGER, allowNull: false },
});

export const Message = sequelize.define<I_Message>("message", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
  authorId: { type: DataTypes.INTEGER, allowNull: false },
});

Topic.hasMany(Comment);
Comment.belongsTo(Topic);

Comment.hasMany(Message);
Message.belongsTo(Comment);
