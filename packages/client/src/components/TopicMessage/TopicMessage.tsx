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
  createEmoji?: (id: number, emojiHex: string) => void;
  removeEmoji?: (id: number, emojiId: number) => void;
}

const emojiHexNodes: Record<string, JSX.Element> = {
  ["1F44C"]: <>&#x1F44C;</>,
  ["1F44D"]: <>&#x1F44D;</>,
  ["1F44E"]: <>&#x1F44E;</>,
};

export const TopicMessage: FC<I_Props> = ({ message, removeMessage, isOwn, createEmoji, removeEmoji }) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  const handleRemoveClick = () => {
    removeMessage?.(message.id);
  };

  const handleCreateEmoji = (hex: string) => {
    createEmoji?.(message.id, hex);
  };

  const handleRemoveEmoji = (id: number) => {
    removeEmoji?.(message.id, id);
  };

  const removeNode = (
    <span className={styles.pointer} onClick={handleRemoveClick}>
      Удалить
    </span>
  );

  const emojiList = (
    <div
      className={cn(styles.emojis, {
        [styles.reverse]: isOwn,
      })}
    >
      {Object.keys(emojiHexNodes).map((key) => (
        <span className={styles.pointer} key={key} onClick={() => handleCreateEmoji(key)}>
          {emojiHexNodes[key]}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(styles.message, {
        [styles.own]: isOwn,
      })}
    >
      <Tooltip title={isOwn ? null : emojiList} placement="left">
        <div className={styles.content}>
          <Tooltip title={isOwn ? removeNode : null} placement="right">
            <span
              ref={ref}
              className={cn(styles.title, {
                [styles.own]: isOwn,
              })}
            >
              {message.text}
            </span>
          </Tooltip>
          <div
            className={cn(styles.emojis, {
              [styles.reverse]: isOwn,
            })}
          >
            {message.emojis?.map((emoji) => (
              <span className={styles.pointer} key={emoji.id} onClick={() => handleRemoveEmoji(emoji.id)}>
                {emojiHexNodes[emoji.hex]}
              </span>
            ))}
          </div>
        </div>
      </Tooltip>
    </div>
  );
};
