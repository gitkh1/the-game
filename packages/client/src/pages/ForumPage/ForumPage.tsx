/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { ChangeEventHandler, FC, MouseEventHandler, useRef } from "react";
import styled from "@emotion/styled";
import { Button, TextField as MaterialTextField } from "@mui/material";
import cn from "classnames";

import { Background } from "../../components/Background";
import { Modal } from "../../components/Modal";
import { TopicComments } from "../../components/TopicComments";
import { TopicList } from "../../components/TopicList/TopicList";
import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { selectUserInfo } from "../../global/store";
import { forumActions, forumSelector } from "../../global/store/slices/forum";

import global from "../../global/styles/Global.module.scss";
import styles from "./ForumPage.module.scss";

const TextField = styled(MaterialTextField)({
  "& .MuiInputBase-root": {
    borderRadius: 10,
    backgroundColor: "white",
    padding: "3px 10px",
  },
});

export const ForumPage: FC = () => {
  const selectedTopicIsDitty = useRef<boolean>(false);
  const topicValue = useRef<string>("");
  const { topics, selectedTopic, isOpenModal } = useAppSelector(forumSelector);
  const user = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  const handleBackClick: MouseEventHandler = () => {
    selectedTopicIsDitty.current = true;
    dispatch(forumActions.unselectTopic());
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

  const handleNewTopicClick: MouseEventHandler = () => {
    dispatch(forumActions.openModal());
  };

  return (
    <Background>
      <div className={styles.container}>
        <div className={cn(global["form-wrapper"], styles["full-width"], styles.forum)}>
          <div className={styles.header}>
            <h1>Форум</h1>
            {!selectedTopic && (
              <Button variant="contained" onClick={handleNewTopicClick}>
                Новая тема
              </Button>
            )}
            {selectedTopic && (
              <Button variant="contained" onClick={handleBackClick}>
                Назад
              </Button>
            )}
          </div>
          <hr />
          <div className={styles.content}>
            <TopicList
              topics={topics}
              className={cn(styles.topic, {
                [styles["topic-hidden"]]: !!selectedTopic,
                [styles["topic-visible"]]: !selectedTopic && selectedTopicIsDitty.current,
              })}
            />

            {selectedTopic && (
              <TopicComments
                className={cn(styles.comments, {
                  [styles["comments-hidden"]]: !selectedTopic && selectedTopicIsDitty.current,
                  [styles["comments-visible"]]: !!selectedTopic,
                })}
                topic={selectedTopic}
                comments={[]}
                userId={user?.id}
              />
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenModal} handleClose={handleCloseModal} handleSave={handleSaveModal} title="Новый топик">
        <TextField className={styles["full-width"]} defaultValue={topicValue.current} onChange={handleTopicValueChange} />
      </Modal>
    </Background>
  );
};
