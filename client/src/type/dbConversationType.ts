export type ConversationUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  profile_img: string;
  __v: number;
};

export type ConversationMember = {
  _id: string;
  conversation_id: string;
  user_id: string;
  join_dateTime: string;
  __v: number;
  userDetails: ConversationUser[];
};

export type ConversationType = {
  _id: string;
  conversation_name: string;
  __v: number;
  ConversationWithMember: ConversationMember[];
};

export type ConversationsTypeArray = ConversationType[];
