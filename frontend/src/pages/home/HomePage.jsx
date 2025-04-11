import React, { useEffect } from "react";
import TopBar from "./components/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import FeaturedSection from "./components/FeaturedSection";
import { useMusicStore } from "@/stores/useMusicStore";
import SectionGrid from "./components/SectionGrid";
import { useMusicPlayerStore } from "@/stores/useMusicPlayerStore";
import PlaybackControls from "@/layout/components/PlaybackControls";

const HomePage = () => {
  const {
    getMadeForYouSongs,
    madeForYouSongs,
    getFeaturedSongs,
    featuredSongs,
    getTrendingSongs,
    trendingSongs,
  } = useMusicStore();
  const { initializeQueue } = useMusicPlayerStore();

  /**initializes the diff category of songs based upon there availability */
  useEffect(() => {
    if (
      madeForYouSongs.length > 0 ||
      featuredSongs.length > 0 ||
      trendingSongs.length > 0
    )
      initializeQueue(...featuredSongs, ...trendingSongs, ...madeForYouSongs);
  }, [madeForYouSongs, featuredSongs, trendingSongs]);

  /**fetches the diff category of songs as soon as the page load for first time */
  useEffect(() => {
    getFeaturedSongs();
    getTrendingSongs();
    getMadeForYouSongs();
  }, []);
  return (
    <main className="text-white h-full mx-3 flex flex-col overflow-hidden rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900">
      <TopBar />
      <ScrollArea className="px-6 my-3 h-[90vh]">
        <div className=" text-3xl font-bold">Welcome! to Qtify</div>
        <FeaturedSection songs={featuredSongs} />
        <SectionGrid tittle="Trending Songs" songs={trendingSongs} />
        <SectionGrid tittle="Made For You" songs={madeForYouSongs} />
      </ScrollArea>
      <PlaybackControls />
    </main>
  );
};

export default HomePage;
