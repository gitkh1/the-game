import { ChangeEventHandler, FC, FormEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";

import { TopicMessage } from "../../components/TopicMessage";
import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { selectUserInfo } from "../../global/store";
import { forumActions, forumSelector } from "../../global/store/slices/forum";
import { createEmoji, createMessage, getMessagesByCommentId, removeEmoji, removeMessage } from "../../global/store/slices/forum/thunks";
import { notificationActions } from "../../global/store/slices/notification";

import styles from "./TopicMessages.module.scss";

export const TopicMessages: FC = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const user = useAppSelector(selectUserInfo);
  const { messages, selectedComment, errorMessage } = useAppSelector(forumSelector);
  const dispatch = useAppDispatch();
  const [messageValue, setMessageValue] = useState<string>("");

  useEffect(() => {
    if (!selectedComment?.id) return;
    void dispatch(getMessagesByCommentId(selectedComment.id));
  }, []);

  useEffect(() => {
    if (!container.current) return;
    container.current.scrollTo(0, container.current.scrollHeight);
  }, [messages.length]);

  useEffect(() => {
    if (!errorMessage) return;
    void dispatch(
      notificationActions.setNotification({
        errorMessage,
      }),
    );
  }, [errorMessage]);

  const handleBackClick: MouseEventHandler = () => {
    dispatch(forumActions.setSelectedComment(null));
    dispatch(forumActions.setMessages([]));
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMessageValue(event.target.value);
  };

  const handleCreateMessage: FormEventHandler = (event) => {
    event.preventDefault();
    if (!messageValue || !user?.id || !selectedComment?.id) return;
    void dispatch(
      createMessage({
        authorId: user.id,
        text: messageValue,
        commentId: selectedComment.id,
      }),
    );
    setMessageValue("");
  };

  const handleRemoveMessage = (id: number) => {
    void dispatch(removeMessage(id));
  };

  const handleCreateEmoji = (messageId: number, hex: string) => {
    if (!user?.id) return;
    void dispatch(
      createEmoji({
        authorId: user.id,
        hex,
        messageId,
      }),
    );
  };

  const handleRemoveEmoji = (messageId: number, emojiId: number) => {
    void dispatch(
      removeEmoji({
        id: emojiId,
        messageId,
      }),
    );
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Сообщения</h1>
        <Button variant="contained" onClick={handleBackClick}>
          Назад
        </Button>
      </div>
      <hr />

      <div className={styles.content}>
        <div className={styles.title}>
          <span>{selectedComment?.text ?? ""}</span>
        </div>
        <div ref={container} className={styles.container}>
          <div className={styles.messages}>
            {messages.map((message) => (
              <TopicMessage
                key={message.id}
                message={message}
                removeMessage={handleRemoveMessage}
                userId={user?.id}
                createEmoji={handleCreateEmoji}
                removeEmoji={handleRemoveEmoji}
              />
            ))}
          </div>
        </div>
        <form className={styles.active} onSubmit={handleCreateMessage}>
          <TextField className={styles.input} value={messageValue} onChange={handleInputChange} placeholder="Отправить сообщение" />
          <Button variant="contained" type="submit">
            Отправить
          </Button>
        </form>
      </div>
    </>
  );
};
