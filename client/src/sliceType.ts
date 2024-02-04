// import { chatOrgType } from "./slice";
import { ChatDataType } from "./type/chatDataType";
import { messageRoomType } from "./type/messageRoomType";

export interface chatAppType {
  roomCredential: messageRoomType[];
  chatData: ChatDataType[];
}
