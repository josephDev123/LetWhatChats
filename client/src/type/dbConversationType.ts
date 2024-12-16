export type ConversationMember = {
  _id: string;
  conversation_id: string;
  user_id: string;
  join_dateTime: string;
  __v: number;
};

export type ConversationType = {
  _id: string;
  conversation_name: string;
  __v: number;
  ConversationWithMember: ConversationMember[];
};

export type ConversationsTypeArray = ConversationType[];
