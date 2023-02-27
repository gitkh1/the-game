import { FC, MouseEventHandler } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ForumIcon from "@mui/icons-material/Forum";
import { Button } from "@mui/material";

import { I_Topic } from "../../global/store/slices/forum";

import styles from "./Topic.module.scss";

interface I_Props {
  userId?: number;
  topic: I_Topic;
  handleBtnClick: (topic: I_Topic) => void;
  removeTopic: (id: number) => void;
}

export const Topic: FC<I_Props> = ({ topic, handleBtnClick, removeTopic, userId }) => {
  const handleRemove: MouseEventHandler = () => {
    removeTopic(topic.id);
  };

  return (
    <div className={styles.container}>
      <ForumIcon />
      <div className={styles.info}>
        <span className={styles.topic}>{topic.text}</span>
        <span className={styles.author}>{topic.author}</span>
      </div>
      <div className={styles.buttons}>
        <Button variant="contained" onClick={() => handleBtnClick(topic)}>
          Перейти
        </Button>

        <Button variant="contained" color="error" onClick={handleRemove} disabled={userId !== topic.authorId}>
          <DeleteOutlineIcon />
        </Button>
      </div>
    </div>
  );
};
