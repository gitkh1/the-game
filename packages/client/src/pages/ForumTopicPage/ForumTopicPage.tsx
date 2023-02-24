import { FC, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { Background } from "../../components/Background";
import { TopicComments } from "../../components/TopicComments";
import { TopicMessages } from "../../components/TopicMessages";
import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { selectUserInfo } from "../../global/store";
import { forumActions, forumSelector, I_Comment } from "../../global/store/slices/forum";
import { PATHS } from "../../routes";

import styles from "./ForumTopicPage.module.scss";

export const ForumTopicPage: FC = () => {
  const navigate = useNavigate();
  const { selectedTopic, selectedComment } = useAppSelector(forumSelector);
  const user = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  const handleBackClick: MouseEventHandler = () => {
    if (selectedComment) {
      dispatch(forumActions.unselectComment());
    } else {
      dispatch(forumActions.unselectTopic());
      navigate(PATHS.FORUM);
    }
  };

  const showMessages = (comment: I_Comment) => {
    dispatch(forumActions.selectComment(comment));
  };

  return (
    <Background>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>{selectedComment ? "Сообщения" : "Комментарии"}</h1>
          <Button variant="contained" onClick={handleBackClick}>
            Назад
          </Button>
        </div>
        <hr />
        <div className={styles.content}>
          {selectedTopic && !selectedComment && <TopicComments userId={user?.id} showMessages={showMessages} />}
          {selectedTopic && !!selectedComment && <TopicMessages userId={user?.id} />}
        </div>
      </div>
    </Background>
  );
};
