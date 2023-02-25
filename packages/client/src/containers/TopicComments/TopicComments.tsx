import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";
import { Button, TextField } from "@mui/material";

import { TopicComment } from "../../components/TopicComment";
import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { selectUserInfo } from "../../global/store";
import { forumActions, forumSelector, I_Comment } from "../../global/store/slices/forum";

import styles from "./TopicComments.module.scss";

export const TopicComments: FC = () => {
  const { comments, selectedTopic } = useAppSelector(forumSelector);
  const user = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();
  const [commentValue, setCommentValue] = useState<string>("");

  const handleBackClick: MouseEventHandler = () => {
    dispatch(forumActions.unselectTopic());
  };

  const showMessages = (comment: I_Comment) => {
    dispatch(forumActions.selectComment(comment));
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCommentValue(event.target.value);
  };

  const createComment = () => {
    if (!commentValue || !user?.id) return;
    dispatch(
      forumActions.createComment({
        id: comments.length,
        authorId: user.id,
        text: commentValue,
      }),
    );
    setCommentValue("");
  };

  const removeComment = (id: number) => {
    dispatch(forumActions.removeComment(id));
  };
  return (
    <>
      <div className={styles.header}>
        <h1>Комментарии</h1>
        <Button variant="contained" onClick={handleBackClick}>
          Назад
        </Button>
      </div>
      <hr />

      <div className={styles.content}>
        <div className={styles.title}>
          <span>{selectedTopic?.text ?? ""}</span>
        </div>
        <div className={styles.container}>
          <div className={styles.comments}>
            {!!comments.length &&
              comments.map((comment) => (
                <TopicComment
                  key={comment.id}
                  comment={comment}
                  isOwn={user?.id === comment.authorId}
                  removeComment={removeComment}
                  showMessages={showMessages}
                />
              ))}
            {!comments.length && <span>Комментариев нет</span>}
          </div>
        </div>
        <div className={styles.active}>
          <TextField className={styles.input} value={commentValue} onChange={handleInputChange} placeholder="Отправить комментарий" />
          <Button variant="contained" onClick={() => createComment()}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
