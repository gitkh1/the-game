import { ChangeEventHandler, FC, MouseEventHandler, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";

import { Modal } from "../../components/Modal";
import { Topic } from "../../components/Topic";
import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { selectUserInfo } from "../../global/store";
import { forumActions, forumSelector, I_Topic } from "../../global/store/slices/forum";

import styles from "./Topics.module.scss";

export const Topics: FC = () => {
  const topicValue = useRef<string>("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { topics } = useAppSelector(forumSelector);
  const user = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  const handleClick = (topic: I_Topic): void => {
    dispatch(forumActions.selectTopic(topic));
  };

  const handleTopicValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    topicValue.current = event.target.value;
  };

  const handleCloseModal = () => {
    topicValue.current = "";
    setIsOpenModal(false);
  };

  const handleSaveModal = () => {
    if (user && topicValue.current) {
      dispatch(
        forumActions.createTopic({
          author: user.login,
          authorId: user.id,
          id: topics.length,
          text: topicValue.current,
        }),
      );
    }
    handleCloseModal();
  };

  const handleAddTopicClick: MouseEventHandler = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Форум</h1>
        <Button variant="contained" onClick={handleAddTopicClick}>
          Новая тема
        </Button>
      </div>
      <hr />
      <div className={styles.content}>
        <div className={styles.topics}>
          {topics.map((topic) => (
            <Topic key={topic.id} topic={topic} handleBtnClick={handleClick} />
          ))}
        </div>
      </div>
      <Modal isOpen={isOpenModal} handleClose={handleCloseModal} handleSave={handleSaveModal} title="Новый топик">
        <TextField className={styles.field} defaultValue={topicValue.current} onChange={handleTopicValueChange} />
      </Modal>
    </>
  );
};
