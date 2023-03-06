/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response } from "express";

import { Comment, I_Comment, I_Params } from "../models/forumModels";

export class CommentController {
  createComment = async (req: Request<void, I_Comment, I_Comment>, res: Response<I_Comment | Error>) => {
    try {
      const { topicId, authorId, text } = req.body;
      const comment: I_Comment = await Comment.create({ topicId, authorId, text });
      res.status(200).json(comment);
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };

  getComments = async (req: Request<void, I_Comment[], void, Pick<I_Params, "topicId">>, res: Response<I_Comment[] | Error>) => {
    try {
      const { topicId } = req.query;
      console.log(topicId);
      const comments: I_Comment[] = await Comment.findAll({
        where: { topicId },
      });
      res.status(200).json(comments);
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };

  deleteComment = async (req: Request<Required<Pick<I_Params, "id">>, string>, res: Response<string | Error>) => {
    try {
      await Comment.destroy({ where: { id: req.params.id } });
      res.status(200).json("ok");
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };
}
