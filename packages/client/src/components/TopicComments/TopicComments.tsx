/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC } from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import MaterialTextField from "@mui/material/TextField";
import cn from "classnames";

import { I_Comment, I_Topic } from "../../global/store/slices/forum";

import { Comment } from "./components/Comment";

import styles from "./TopicComments.module.scss";

const TextField = styled(MaterialTextField)({
  "& .MuiInputBase-root": {
    borderRadius: 10,
    backgroundColor: "white",
    padding: "3px 10px",
  },
});

interface I_Props {
  userId?: number;
  topic: I_Topic;
  comments: I_Comment[];
  className?: string;
}

export const TopicComments: FC<I_Props> = ({ topic, comments, className, userId }) => {
  return (
    <div className={cn(className, styles.comments)}>
      <div className={styles.header}>
        <span>{topic.text}</span>
      </div>
      <div className={styles.content}>
        {!!comments.length && comments.map((comment) => <Comment key={comment.id} comment={comment} isOwn={userId === comment.authorId} />)}

        {!comments.length && <span>Комментариев нет</span>}
      </div>
      <div className={styles.active}>
        <TextField className={styles.input} />
        <Button variant="contained">Отправить</Button>
      </div>
    </div>
  );
};
