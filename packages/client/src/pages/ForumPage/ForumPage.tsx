import { ChangeEventHandler, FC, MouseEventHandler, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

import { Background } from "../../components/Background";
import { Modal } from "../../components/Modal";
import { Topic } from "../../components/Topic";
import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { selectUserInfo } from "../../global/store";
import { forumActions, forumSelector, I_Topic } from "../../global/store/slices/forum";
import { PATHS } from "../../routes";

import styles from "./ForumPage.module.scss";

export const ForumPage: FC = () => {
  const topicValue = useRef<string>("");
  const navigate = useNavigate();
  const { topics, isOpenModal } = useAppSelector(forumSelector);
  const user = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  const handleClick = (topic: I_Topic): void => {
    dispatch(forumActions.selectTopic(topic));
    navigate(`${PATHS.FORUM}/${topic.id}`);
  };

  const handleTopicValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    topicValue.current = event.target.value;
  };

  const handleCloseModal = () => {
    topicValue.current = "";
    dispatch(forumActions.closeModal());
  };

  const handleSaveModal = () => {
    if (user && topicValue.current) {
      dispatch(
        forumActions.addTopic({
          author: user.login,
          authorId: user.id,
          id: topics.length,
          text: topicValue.current,
        }),
      );
    }
    topicValue.current = "";
    dispatch(forumActions.closeModal());
  };

  const handleAddTopicClick: MouseEventHandler = () => {
    dispatch(forumActions.openModal());
  };

  return (
    <Background>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Форум</h1>
          <Button variant="contained" onClick={handleAddTopicClick}>
            Новая тема
          </Button>
        </div>
        <hr />
        <div className={styles.content}>
          {topics.map((topic) => (
            <Topic key={topic.id} topic={topic} handleBtnClick={handleClick} />
          ))}
        </div>
      </div>
      <Modal isOpen={isOpenModal} handleClose={handleCloseModal} handleSave={handleSaveModal} title="Новый топик">
        <TextField className={styles.field} defaultValue={topicValue.current} onChange={handleTopicValueChange} />
      </Modal>
    </Background>
  );
};
