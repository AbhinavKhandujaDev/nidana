"use client";

import { useEffect } from "react";
import useGlobalStore from "@/zustand-stores/useGlobalStore";
import LeftSidebar from "@/components/left-sidebar";
import { Toaster } from "@/components/ui/toaster";
import Player from "@/components/Player";

export default function Home() {
  const { fetchSongs } = useGlobalStore();

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Left Side - Song List */}
      <LeftSidebar />

      {/* Right Side - Player */}
      <Player />

      <Toaster />
    </div>
  );
}
