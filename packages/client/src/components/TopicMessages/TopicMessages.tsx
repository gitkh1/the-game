import { ChangeEventHandler, FC, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { forumActions, forumSelector } from "../../global/store/slices/forum";

import { Message } from "./components/Message";

import styles from "./TopicMessages.module.scss";

interface I_Props {
  userId?: number;
}

export const TopicMessages: FC<I_Props> = ({ userId }) => {
  const { messages, selectedComment } = useAppSelector(forumSelector);
  const dispatch = useAppDispatch();
  const [messageValue, setMessageValue] = useState<string>("");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMessageValue(event.target.value);
  };

  const createMessage = () => {
    if (!messageValue || !userId) return;
    dispatch(
      forumActions.createMessage({
        id: messages.length,
        authorId: userId,
        text: messageValue,
      }),
    );
    setMessageValue("");
  };

  const removeMessage = (id: number) => {
    dispatch(forumActions.removeMessage(id));
  };

  return (
    <div className={styles.comments}>
      <div className={styles.header}>
        <span>{selectedComment?.text ?? ""}</span>
      </div>
      <div className={styles.content}>
        {messages.map((message) => (
          <Message key={message.id} message={message} removeMessage={removeMessage} isOwn={userId === message.authorId} />
        ))}
      </div>
      <div className={styles.active}>
        <TextField className={styles.input} value={messageValue} onChange={handleInputChange} placeholder="Отправить сообщение" />
        <Button variant="contained" onClick={() => createMessage()}>
          Отправить
        </Button>
      </div>
    </div>
  );
};
