import React, { useEffect } from "react";
import Header from "./components/Header";
import DashBoardStats from "./components/DashBoardStats";
import { useMusicStore } from "@/stores/useMusicStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import AlbumsTabContent from "./components/AlbumsTabContent";
import SongsTabContent from "./components/SongsTabContent";

const AdminPage = () => {
  const { stats, getStats, allSongs,getAllSongs,albums } = useMusicStore();
    /**Fetches stats and All the songs*/
  useEffect(() => {
    getStats();
    getAllSongs();
  }, []);
  return (
    <main className="mx-3 h-full overflow-hidden rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900">
      <Header />
      <div className="mx-3">
        <DashBoardStats stats={stats} />
        <Tabs defaultValue="songs" className="mt-7">
          <TabsList className="bg-zinc-600 text-zinc-400">
            <TabsTrigger
              className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
              value="songs"
            >
              <Music className="mr-2 size-4" />
              Songs
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
              value="albums"
            >
              <Album className="mr-2 size-4" />
              Albums
            </TabsTrigger>
          </TabsList>
          <TabsContent value="songs" className="mt-6">
            <SongsTabContent songs={allSongs}/>
          </TabsContent>
          <TabsContent value="albums" className="mt-6">
            <AlbumsTabContent albums={albums}/>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default AdminPage;
