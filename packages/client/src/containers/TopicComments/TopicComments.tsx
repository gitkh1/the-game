import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";

import { TopicComment } from "../../components/TopicComment";
import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { selectUserInfo } from "../../global/store";
import { forumActions, forumSelector, I_Comment } from "../../global/store/slices/forum";
import { createComment, getCommentsByTopicId, removeComment } from "../../global/store/slices/forum/thunks";
import { notificationActions } from "../../global/store/slices/notification";

import styles from "./TopicComments.module.scss";

export const TopicComments: FC = () => {
  const { comments, selectedTopic, errorMessage } = useAppSelector(forumSelector);
  const user = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();
  const [commentValue, setCommentValue] = useState<string>("");

  useEffect(() => {
    if (!selectedTopic?.id) return;
    void dispatch(getCommentsByTopicId(selectedTopic.id));
  }, []);

  useEffect(() => {
    if (!errorMessage) return;
    void dispatch(
      notificationActions.setNotification({
        errorMessage,
      }),
    );
  }, [errorMessage]);

  const handleBackClick: MouseEventHandler = () => {
    dispatch(forumActions.setSelectedTopic(null));
    dispatch(forumActions.setComments([]));
  };

  const showMessages = (comment: I_Comment) => {
    dispatch(forumActions.setSelectedComment(comment));
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCommentValue(event.target.value);
  };

  const handleCreateComment = () => {
    if (!commentValue || !user?.id || !selectedTopic?.id) return;
    void dispatch(
      createComment({
        authorId: user.id,
        text: commentValue,
        topicId: selectedTopic.id,
      }),
    );
    setCommentValue("");
  };

  const handleRemoveComment = (id: number) => {
    void dispatch(removeComment(id));
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
                  removeComment={handleRemoveComment}
                  showMessages={showMessages}
                />
              ))}
            {!comments.length && <span>Комментариев нет</span>}
          </div>
        </div>
        <div className={styles.active}>
          <TextField className={styles.input} value={commentValue} onChange={handleInputChange} placeholder="Отправить комментарий" />
          <Button variant="contained" onClick={handleCreateComment}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
