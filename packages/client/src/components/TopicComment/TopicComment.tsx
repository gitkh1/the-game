import { FC } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";

import { I_Comment } from "../../global/store/slices/forum";

import styles from "./TopicComment.module.scss";

interface I_Props {
  isOwn: boolean;
  comment: I_Comment;
  removeComment?: (id: number) => void;
  showMessages?: (comment: I_Comment) => void;
}

export const TopicComment: FC<I_Props> = ({ comment, removeComment, showMessages, isOwn }) => {
  return (
    <div className={styles.comment}>
      <span className={styles.title}>{comment.text}</span>
      <div className={styles.panel}>
        <IconButton className={styles.button} onClick={() => showMessages?.(comment)}>
          {comment.messageCount && <span className={styles.count}>{comment.messageCount}</span>}
          <CommentIcon className={styles.icon} />
        </IconButton>
        {isOwn && (
          <IconButton className={styles.button} onClick={() => removeComment?.(comment.id)}>
            <DeleteOutlineIcon className={styles.icon} />
          </IconButton>
        )}
      </div>
    </div>
  );
};
