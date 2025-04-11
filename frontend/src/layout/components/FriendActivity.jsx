import { ScrollArea } from "@/components/ui/scroll-area";
import useChatStore from "@/stores/useChatStore";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import FriendActivitySkeleton from "../skeletons/FriendActivitySkeleton";

const FriendActivity = ({ user }) => {
  const { onlineUsers, users, usersAndActivities, isLoading } = useChatStore();
  return (
    <div className="bg-zinc-800 ml-3 h-full rounded-lg overflow-hidden">
      <div className="text-white flex gap-2 p-3 bg-zinc-900/75">
        <Users className="size-7" />
        <div className="text-xl">What they're listening to</div>
      </div>
      {/**  if the user is logged in then show set of users and their activities otherwise show login prompt */}
      {user ? (
        /** check if the users are fetched from database or not
         users.length != 0 &&
         Array.from(usersAndActivities.keys()).length != 0 */
        !isLoading ? (
          <ScrollArea className="my-2 h-[70vh]">
            {users.map((obj) => {
              const isOnline = onlineUsers.has(obj.clerkID);
              const activity =
                usersAndActivities?.get(obj.clerkID)?.activity ?? "-1";

              return (
                <div
                  className="my-2 flex gap-2 cursor-pointer group hover:bg-zinc-700 items-center mx-3 p-2 rounded-md"
                  key={obj._id}
                >
                  <div className="w-10 h-10 relative">
                    <div className="h-full w-full rounded-full overflow-hidden">
                      <img
                        src={obj.imageURL}
                        className="h-full w-full object-cover object-center"
                        alt=""
                      />
                    </div>
                    <div
                      className={`h-2 w-2 rounded-full  absolute right-1 bottom-1 ring-2 ring-zinc-800 group-hover:ring-zinc-700 ${
                        isOnline ? "bg-green-500" : "bg-zinc-500"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="flex gap-1">
                      <div className="text-white text-lg tracking-wide">
                        {obj.fullName}
                      </div>
                      {activity != "-1" && (
                        <Music
                          strokeWidth={2}
                          className="size-4 text-green-300 font-bold"
                        />
                      )}
                    </div>
                    {activity != "-1" ? (
                      <div className="text-zinc-100">{activity}</div>
                    ) : (
                      <div className="text-zinc-400">idle</div>
                    )}
                  </div>
                </div>
              );
            })}{" "}
          </ScrollArea>
        ) : (
          <FriendActivitySkeleton />
        )
      ) : (
        <LoginPrompt />
      )}
    </div>
  );
};
const LoginPrompt = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-60">
      <div className="h-16 w-16 rounded-full relative">
        <div
          className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg animate-pulse
     opacity-75"
          aria-hidden="true"
        />
        <div className="relative bg-zinc-800 rounded-full p-4">
          <HeadphonesIcon className="size-8 text-emerald-400" />
        </div>
      </div>
      <div className="space-y-1 max-w-[250px] text-center">
        <h3 className="text-lg font-semibold text-white">
          See What Friends Are Playing
        </h3>
        <p className="text-sm text-zinc-400">
          Login to discover what music your friends are enjoying right now
        </p>
      </div>
    </div>
  );
};

export default FriendActivity;
