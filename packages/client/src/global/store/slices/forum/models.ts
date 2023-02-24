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
}
