import { FC } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import { Button } from "@mui/material";

import { I_Topic } from "../../global/store/slices/forum";

import styles from "./Topic.module.scss";

interface I_Props {
  topic: I_Topic;
  handleBtnClick: (topic: I_Topic) => void;
}

export const Topic: FC<I_Props> = ({ topic, handleBtnClick }) => {
  return (
    <div className={styles.container}>
      <ForumIcon />
      <div className={styles.info}>
        <span className={styles.topic}>{topic.text}</span>
        <span className={styles.author}>{topic.author}</span>
      </div>
      <Button variant="contained" onClick={() => handleBtnClick(topic)}>
        Перейти
      </Button>
    </div>
  );
};
