/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FC, useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import cn from "classnames";

import { I_Message } from "../../global/store/slices/forum";

import styles from "./TopicMessage.module.scss";

interface I_Props {
  userId?: number;
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

export const TopicMessage: FC<I_Props> = ({ message, removeMessage, userId, createEmoji, removeEmoji }) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  const isOwn = userId === message.authorId;

  const handleRemoveClick = () => {
    removeMessage?.(message.id);
  };

  const handleCreateEmoji = (hex: string) => {
    const isExist = message.emojis.find((emoji) => emoji.hex === hex && emoji.authorId === userId);
    if (isExist) return;
    createEmoji?.(message.id, hex);
  };

  const handleRemoveEmoji = (id: number) => {
    removeEmoji?.(message.id, id);
  };

  const getTooltipElement = () => {
    return isOwn ? (
      <span className={styles.pointer} onClick={handleRemoveClick}>
        Удалить
      </span>
    ) : (
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
  };

  return (
    <div
      className={cn(styles.message, {
        [styles.own]: isOwn,
      })}
    >
      <div className={styles.content}>
        <Tooltip title={getTooltipElement()} placement="right">
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
    </div>
  );
};
