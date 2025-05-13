export interface UserDetails {
  _id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  profile_img: string;
  __v: number;
}

export interface MessageChatType {
  _id: string;
  message_text: string;
  from_userId: string;
  message_type: string; // Example: "text", "image", etc. - you can use a union type if these are predefined
  imgUrl: string;
  conversation_id: string;
  sent_datetime: string; // ISO string format
  __v: number;
  from_UserDetails: UserDetails;
}

export interface GroupMember {
  _id: string;
  conversation_id: string;
  user_id: string;
  join_dateTime: string; // ISO string format
  __v: number;
}

export interface GroupDetails {
  _id: string;
  conversation_name: string;
  creator: string;
  avatar: string | null;
  GroupMembers: GroupMember[];
  UserDetails: UserDetails[];
}

export interface ChatDataDTOType {
  messages: MessageChatType[];
  groupDetails: GroupDetails;
}
