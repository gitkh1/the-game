import { FC, MouseEventHandler } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import { Button } from "@mui/material";

import { useAppDispatch } from "../../../../global/hooks";
import { forumActions, I_Topic } from "../../../../global/store/slices/forum";

import styles from "./Topic.module.scss";

interface I_Props {
  topic: I_Topic;
}

export const Topic: FC<I_Props> = ({ topic }) => {
  const dispatch = useAppDispatch();
  const handleClick: MouseEventHandler = () => {
    dispatch(forumActions.selectTopic(topic));
  };

  return (
    <div className={styles["forum-item"]}>
      <ForumIcon />
      <div className={styles.info}>
        <span className={styles.topic}>{topic.text}</span>
        <span className={styles.author}>{topic.author}</span>
      </div>
      <Button variant="contained" onClick={handleClick}>
        Перейти
      </Button>
    </div>
  );
};
