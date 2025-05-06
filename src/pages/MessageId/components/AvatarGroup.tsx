import { useState, useEffect } from "react";
import { ChatDataDTOType } from "../../../type/ChatDataDTO";

const AvatarGroup = ({
  chatData,
  ConversationRoomName,
}: {
  chatData: ChatDataDTOType;
  ConversationRoomName: string;
}) => {
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);

  return (
    <div className="w-12 h-12 flex items-center rounded-full hover:">
      {!ConversationRoomName ? (
        <div className="inline-flex relative w-full h-full">
          <span className="relative z-10">
            {loading1 && !error1 && (
              <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center bg-white">
                <div className="animate-spin h-3 w-3 border-2 border-gray-500 border-t-transparent rounded-full"></div>
              </div>
            )}
            {!error1 && (
              <img
                src={chatData?.groupDetails.UserDetails[0].profile_img}
                alt="avatar"
                title={chatData?.groupDetails.UserDetails[0].name}
                width={24}
                height={24}
                loading="lazy"
                onLoad={() => setLoading1(false)}
                onError={() => {
                  setLoading1(false);
                  setError1(true);
                }}
                className={`w-6 h-6 rounded-full border border-black ${
                  loading1 ? "hidden" : "block"
                }`}
              />
            )}
          </span>

          <span className="absolute left-3 z-0">
            {loading2 && !error2 && (
              <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center bg-white">
                <div className="animate-spin h-3 w-3 border-2 border-gray-500 border-t-transparent rounded-full"></div>
              </div>
            )}
            {!error2 && (
              <img
                src={chatData?.groupDetails.UserDetails[1].profile_img}
                alt="avatar"
                title={chatData?.groupDetails.UserDetails[1].name}
                width={24}
                height={24}
                loading="lazy"
                onLoad={() => setLoading2(false)}
                onError={() => {
                  setLoading2(false);
                  setError2(true);
                }}
                className={`w-6 h-6 rounded-full border border-black ${
                  loading2 ? "hidden" : "block"
                }`}
              />
            )}
          </span>
        </div>
      ) : (
        <img
          src={"https://avatars.dicebear.com/api/human/123.svg"}
          alt="avatar"
          loading="lazy"
          className="rounded-full"
        />
      )}
    </div>
  );
};

export default AvatarGroup;
