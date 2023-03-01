/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response } from "express";

import { I_Params, I_Topic, Topic } from "../models/forumModels";

export class TopicController {
  createTopic = async (req: Request<void, I_Topic, I_Topic>, res: Response<I_Topic | Error>) => {
    try {
      const { author, authorId, text } = req.body;
      const topic: I_Topic = await Topic.create({ author, authorId, text });
      res.status(200).json(topic);
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };

  getAllTopics = async (_: Request, res: Response<I_Topic[] | Error>) => {
    try {
      const topics: I_Topic[] = await Topic.findAll();
      res.status(200).json(topics);
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };

  deleteTopic = async (req: Request<Required<Pick<I_Params, "id">>, string>, res: Response<string | Error>) => {
    try {
      await Topic.destroy({ where: { id: req.params.id } });
      res.status(200).json("ok");
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };
}
