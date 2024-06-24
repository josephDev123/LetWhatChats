export interface pollType {
  _id: string;
  question: string;
  options: { option: string; count: number; _id: string }[];
  multiple_answer: boolean;
  createdAt: string;
  updatedAt: string;
  peopleWhovoted: string[];
}

export type ChatDataType = {
  name: string;
  room: string;
  chat: string;
  time: string;
  type?: string;
  poll_id: pollType;
  img?: string;
};
