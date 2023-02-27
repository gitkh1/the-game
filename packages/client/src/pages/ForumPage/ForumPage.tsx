import { FC } from "react";

import { Background } from "../../components/Background";
import { TopicComments } from "../../containers/TopicComments";
import { TopicMessages } from "../../containers/TopicMessages";
import { Topics } from "../../containers/Topics";
import { useAppSelector } from "../../global/hooks";
import { forumSelector } from "../../global/store/slices/forum";

import styles from "./ForumPage.module.scss";

export const ForumPage: FC = () => {
  const { selectedTopic, selectedComment } = useAppSelector(forumSelector);

  return (
    <Background>
      <div className={styles.container}>
        {!selectedTopic && !selectedComment && <Topics />}
        {selectedTopic && !selectedComment && <TopicComments />}
        {selectedTopic && selectedComment && <TopicMessages />}
      </div>
    </Background>
  );
};
