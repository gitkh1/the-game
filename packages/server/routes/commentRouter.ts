/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { CommentController } from "../controllers/commentController";

const commentController = new CommentController();

const commentRouter = Router();

commentRouter.get("/", commentController.getComments);
commentRouter.post("/", commentController.createComment);
commentRouter.delete("/:id", commentController.deleteComment);

export { commentRouter };
