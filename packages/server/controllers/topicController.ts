/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response } from "express";

import { I_ResParams, I_Topic, Topic } from "../models/topicModels";

export class TopicController {
  post = async (req: Request<void, I_Topic, I_Topic>, res: Response<I_Topic | Error>) => {
    try {
      const { author, authorId, text } = req.body;
      const topic: I_Topic = await Topic.create({ author, authorId, text });
      res.status(200).json(topic);
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };

  getAll = async (_: Request, res: Response<I_Topic[] | Error>) => {
    try {
      const topics: I_Topic[] = await Topic.findAll();
      res.status(200).json(topics);
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };

  getById = async (req: Request<Required<Pick<I_ResParams, "id">>, I_Topic>, res: Response<I_Topic | null | Error>) => {
    try {
      const topic: I_Topic | null = await Topic.findOne({ where: { id: req.params.id } });
      res.status(200).json(topic);
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };

  delete = async (req: Request<Required<Pick<I_ResParams, "id">>, string>, res: Response<string | Error>) => {
    try {
      await Topic.destroy({ where: { id: req.params.id } });
      res.status(200).json("ok");
    } catch (error) {
      if (error instanceof Error) res.status(500).json(error);
    }
  };
}
