import { UserDetails } from "./ChatDataDTO";

export interface ChatbroadCastDataDTOType {
  message_id: string;
  message_text: string;
  from_userId: string;
  message_type: string;
  imgUrl?: string;
  sent_datetime?: string;
  conversation_id: string;
  from_UserDetails: UserDetails;
  // status?:"pending" | "success" | "fail"
}
