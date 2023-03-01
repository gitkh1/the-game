/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import { sequelize } from "../database/postgres";

export interface I_Params {
  id: number;
  topicId: number;
  commentId: number;
  messageId: number;
  emojiId: number;
}

export interface I_Topic extends Model<InferAttributes<I_Topic>, InferCreationAttributes<I_Topic>> {
  id: CreationOptional<number>;
  text: string;
  author: string;
  authorId: ForeignKey<number>;
}
export interface I_Comment extends Model<InferAttributes<I_Comment>, InferCreationAttributes<I_Comment>> {
  id: CreationOptional<number>;
  text: string;
  authorId: number;
  topicId: ForeignKey<number>;
}
export interface I_Message extends Model<InferAttributes<I_Message>, InferCreationAttributes<I_Message>> {
  id: CreationOptional<number>;
  text: string;
  authorId: number;
  commentId: ForeignKey<number>;
}

export interface I_Emoji extends Model<InferAttributes<I_Emoji>, InferCreationAttributes<I_Emoji>> {
  id: CreationOptional<number>;
  hex: string;
  authorId: number;
  messageId: ForeignKey<number>;
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
  topicId: { type: DataTypes.INTEGER, references: { model: Topic, key: "id" } },
});

export const Message = sequelize.define<I_Message>("message", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
  authorId: { type: DataTypes.INTEGER, allowNull: false },
  commentId: { type: DataTypes.INTEGER, references: { model: Comment, key: "id" } },
});

export const Emoji = sequelize.define<I_Emoji>("emoji", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  hex: { type: DataTypes.STRING, allowNull: false },
  authorId: { type: DataTypes.INTEGER, allowNull: false },
  messageId: { type: DataTypes.INTEGER, references: { model: Message, key: "id" } },
});

Topic.hasMany(Comment);
Comment.belongsTo(Topic);

Comment.hasMany(Message);
Message.belongsTo(Comment);

Message.hasMany(Emoji);
Emoji.belongsTo(Message);
