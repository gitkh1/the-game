/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FC } from "react";
import cn from "classnames";

import { I_Comment } from "../../../../global/store/slices/forum";

import styles from "./Comment.module.scss";

interface I_Props {
  isOwn: boolean;
  comment: I_Comment;
}

export const Comment: FC<I_Props> = ({ isOwn, comment }) => {
  return (
    <div
      className={cn(styles.comment, {
        [styles["comment-own"]]: isOwn,
      })}
    >
      <span>{comment.text}</span>
    </div>
  );
};
