export interface I_Topic {
  id: number;
  text: string;
  author: string;
  authorId: number;
}

export interface I_Comment {
  id: number;
  text: string;
  authorId: number;
  topicId: number;
}

export interface I_Message {
  id: number;
  text: string;
  authorId: number;
  commentId: number;
  emojis: I_Emoji[];
}

export interface I_Emoji {
  id: number;
  hex: string;
  authorId: number;
  messageId: number;
}
