import { ChangeEventHandler, FC, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { forumActions, forumSelector, I_Comment } from "../../global/store/slices/forum";

import { Comment } from "./components/Comment";

import styles from "./TopicComments.module.scss";

interface I_Props {
  userId?: number;
  showMessages?: (comment: I_Comment) => void;
}

export const TopicComments: FC<I_Props> = ({ userId, showMessages }) => {
  const { comments, selectedTopic } = useAppSelector(forumSelector);
  const dispatch = useAppDispatch();
  const [commentValue, setCommentValue] = useState<string>("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCommentValue(event.target.value);
  };

  const createComment = () => {
    if (!commentValue || !userId) return;
    dispatch(
      forumActions.createComment({
        id: comments.length,
        authorId: userId,
        text: commentValue,
      }),
    );
    setCommentValue("");
  };

  const removeComment = (id: number) => {
    dispatch(forumActions.removeComment(id));
  };

  return (
    <div className={styles.comments}>
      <div className={styles.header}>
        <span>{selectedTopic?.text ?? ""}</span>
      </div>
      <div className={styles.content}>
        {!!comments.length &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              isOwn={userId === comment.authorId}
              removeComment={removeComment}
              showMessages={showMessages}
            />
          ))}
        {!comments.length && <span>Комментариев нет</span>}
      </div>
      <div className={styles.active}>
        <TextField className={styles.input} value={commentValue} onChange={handleInputChange} placeholder="Отправить комментарий" />
        <Button variant="contained" onClick={() => createComment()}>
          Отправить
        </Button>
      </div>
    </div>
  );
};
