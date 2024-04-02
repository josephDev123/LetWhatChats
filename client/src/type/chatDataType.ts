export interface pollType {
  _id: string;
  question: string;
  options: { option: string; count: number }[];
  multiple_answer: boolean;
}

export type ChatDataType = {
  name: string;
  room: string;
  chat: string;
  time: string;
  type?: string;
  poll_id: pollType;
};
