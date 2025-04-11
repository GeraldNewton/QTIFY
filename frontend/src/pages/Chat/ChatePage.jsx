import React from "react";
import TopBar from "../home/components/TopBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import UserList from "./components/UserList";
import ChatComponent from "./components/ChatComponent";
import { useUser } from "@clerk/clerk-react";

const ChatePage = () => {
  const { user } = useUser();
  return (
    <main className="h-full mx-3 flex flex-col overflow-hidden rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900">
      <TopBar />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} minSize={20} collapsible>
          <UserList />
        </ResizablePanel>
        <ResizableHandle className="bg-zinc-600 w-2  rounded-lg transition-colors"/>
        <ResizablePanel minSize={65}>
          <ChatComponent user={user} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default ChatePage;
