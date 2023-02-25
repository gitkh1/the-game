/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FC, useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import cn from "classnames";

import { I_Message } from "../../global/store/slices/forum";

import styles from "./TopicMessage.module.scss";

interface I_Props {
  isOwn: boolean;
  message: I_Message;
  removeMessage?: (id: number) => void;
}

export const TopicMessage: FC<I_Props> = ({ message, removeMessage, isOwn }) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  const handleRemoveClick = () => {
    removeMessage?.(message.id);
  };

  const removeNode = (
    <span className={styles.remove} onClick={handleRemoveClick}>
      Удалить
    </span>
  );

  return (
    <div
      className={cn(styles.message, {
        [styles.own]: isOwn,
      })}
    >
      <Tooltip title={isOwn ? removeNode : null} placement="right">
        <span
          ref={ref}
          className={cn(styles.title, {
            [styles.left]: isOwn,
          })}
        >
          {message.text}
        </span>
      </Tooltip>
    </div>
  );
};
