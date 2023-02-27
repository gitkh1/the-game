import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react";
import { Button, TextField } from "@mui/material";

import { TopicMessage } from "../../components/TopicMessage";
import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { selectUserInfo } from "../../global/store";
import { forumActions, forumSelector } from "../../global/store/slices/forum";

import styles from "./TopicMessages.module.scss";

export const TopicMessages: FC = () => {
  const user = useAppSelector(selectUserInfo);
  const { messages, selectedComment } = useAppSelector(forumSelector);
  const dispatch = useAppDispatch();
  const [messageValue, setMessageValue] = useState<string>("");

  const handleBackClick: MouseEventHandler = () => {
    dispatch(forumActions.setSelectedComment(null));
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMessageValue(event.target.value);
  };

  const createMessage = () => {
    if (!messageValue || !user?.id) return;
    dispatch(
      forumActions.createMessage({
        id: messages.length,
        authorId: user.id,
        text: messageValue,
      }),
    );
    setMessageValue("");
  };

  const removeMessage = (id: number) => {
    dispatch(forumActions.removeMessage(id));
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
        <div className={styles.container}>
          <div className={styles.messages}>
            {messages.map((message) => (
              <TopicMessage key={message.id} message={message} removeMessage={removeMessage} isOwn={user?.id === message.authorId} />
            ))}
          </div>
        </div>
        <div className={styles.active}>
          <TextField className={styles.input} value={messageValue} onChange={handleInputChange} placeholder="Отправить сообщение" />
          <Button variant="contained" onClick={() => createMessage()}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
