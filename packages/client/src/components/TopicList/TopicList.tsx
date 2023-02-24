/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC } from "react";
import cn from "classnames";

import { I_Topic } from "../../global/store/slices/forum";

import { Topic } from "./components/Topic";

interface I_Props {
  topics: I_Topic[];
  className?: string;
}

export const TopicList: FC<I_Props> = ({ topics, className }) => {
  return (
    <div className={cn(className)}>
      {topics.map((topic) => (
        <Topic key={topic.id} topic={topic} />
      ))}
    </div>
  );
};
