import useChatStore from "@/stores/useChatStore";
import React, { useEffect } from "react";
import ChatInput from "./ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const ChatComponent = ({ user }) => {
  const {
    activeChatUser,
    onlineUsers,
    clerkID,
    getMessages,
    messages,
    gotMessages,
  } = useChatStore();
  const check = onlineUsers.has(activeChatUser?.clerkID);
  useEffect(() => {
    /**
     * Initializes the chat component. If user is not active, or the current user's
     * clerk id is not available, this function will return without doing anything.
     * Otherwise, it will call the getMessages function to retrieve and set the
     * messages for the current user.
     */
    const init = () => {
      if (!activeChatUser || !clerkID) return;
      getMessages();
    };
    init();
  }, [activeChatUser, clerkID]);
  return (
    <>
      {activeChatUser ? (
        <div className="h-full m-3">
          {/* user status */}
          <div className="flex gap-3 items-center ">
            <div
              className={`ring-4 ring-offset-4 h-10 w-10 rounded-full overflow-hidden ring-offset-zinc-700 ${
                check ? "ring-green-500" : "ring-zinc-500"
              }  `}
            >
              <img
                src={activeChatUser.imageURL}
                alt=""
                className="h-full w-full"
              />
            </div>
            <div className="">
              <div className="text-white text-xl">
                {activeChatUser.fullName}
              </div>
              <div
                className={`text-base ${
                  check ? "text-green-300" : "text-zinc-300"
                }`}
              >
                {check ? "Online" : "Offline"}
              </div>
            </div>
          </div>

          {/* message area */}
          <ScrollArea className="h-[80%] my-2">
            <div className="flex flex-col gap-4 h-full ">
              {gotMessages ? (
                messages.map((message) => {
                  const bool = message.senderID == clerkID;
                  return (
                    <div
                      className={`flex gap-2  h-fit    ${
                        bool ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                          src={bool ? user.imageUrl : activeChatUser.imageURL}
                          alt=""
                          className="h-full w-full"
                        />
                      </div>
                      <div
                        className={`max-w-[400px] min-w-[50px]  w-fit break-words h-fit  text-left p-4 rounded-lg  font-semibold whitespace-normal   ${
                          bool
                            ? "bg-zinc-100 text-zinc-700"
                            : "bg-green-300 text-zinc-700"
                        }`}
                      >
                        {message.chat}
                      </div>
                    </div>
                  );
                })
              ) : (
                <MessageSkeleton />
              )}
            </div>
          </ScrollArea>

          {/* chat input */}
          <ChatInput />
        </div>
      ) : (
        chatNotSelected()
      )}
    </>
  );
};
const chatNotSelected = () => (
  <div className="flex h-full justify-center items-center">
    <div className="text-center">
      <img src="/spotify.png" alt="" className="h-12 w-12 mx-auto" />
      <div className="text-white text-xl mt-2">No conversation selected</div>
      <div className="text-zinc-400 text-lg mt-0">
        Select a friend to start chatting
      </div>
    </div>
  </div>
);

export default ChatComponent;
