import useChatStore from "@/stores/useChatStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import UserListSkeleton from "../skeletons/UserListSkeleton.jsx";

const UserList = () => {
  const { users, onlineUsers, setActiveChatUser,isLoading } = useChatStore();
  return (
    <>
      <ScrollArea className="h-full p-3">
        {!isLoading
          ? users.map((user) => {
              return (
                <div
                  onClick={() => setActiveChatUser(user)}
                  className="flex gap-2 cursor-pointer group hover:bg-zinc-600 p-2 items-center rounded-md mb-2"
                >
                  <div className="w-10 h-10 relative">
                    <div className="h-full w-full rounded-full overflow-hidden">
                      <img
                        src={user.imageURL}
                        className="h-full w-full object-cover object-center"
                        alt=""
                      />
                    </div>
                    <div
                      className={`h-2 w-2 rounded-full  absolute right-1 bottom-1 ring-2 ring-zinc-800 group-hover:ring-zinc-700 ${
                        onlineUsers.has(user.clerkID)
                          ? "bg-green-500"
                          : "bg-zinc-500"
                      }`}
                    />
                  </div>
                  <div className="text-white text-lg tracking-wide">
                    {user.fullName}
                  </div>
                </div>
              );
            })
          : <UserListSkeleton/>}{" "}
      </ScrollArea>
    </>
  );
};

export default UserList;
