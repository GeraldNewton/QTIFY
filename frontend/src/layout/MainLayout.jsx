import React, { useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/LeftSideBar";
import AudioPlayer from "./components/AudioPlayer";
import FriendActivity from "./components/FriendActivity";
import { useUser } from "@clerk/clerk-react";
import useChatStore from "@/stores/useChatStore";

const MainLayout = () => {
  const { user } = useUser();
  const { initSocket, getUsers, disconnectSocket } = useChatStore();
  useEffect(() => {
    /** disconnect the socket if the user is not logged in*/
    if (!user) {
      disconnectSocket();
      return;
    }
    /**
     * Initialize the socket and get the users
     * @returns {Promise<void>}
     */
    const init = async () => {
      await initSocket(user.id);
      await getUsers();
    };
    init();
    
    /** if the user changes ot anyhting happens then disconnect socket func is called*/
    return () => disconnectSocket();
  }, [user]);
  return (
    <div className="h-screen bg-black p-3">
      <AudioPlayer />

      <ResizablePanelGroup direction="horizontal">
        {/* album panel */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25} collapsible>
          <LeftSideBar />
        </ResizablePanel>

        <ResizableHandle className="bg-zinc-800 w-2  rounded-lg transition-colors" />

        {/* main content */}
        <ResizablePanel defaultSize={60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="bg-zinc-800 w-2  rounded-lg transition-colors" />

        {/* users info */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25} collapsible>
          <FriendActivity user={user} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
