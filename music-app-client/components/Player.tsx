"use client";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";
import useGlobalStore from "@/zustand-stores/useGlobalStore";
import { useEffect, useRef, useState } from "react";

const thumbnail =
  "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400&q=80";

function Player() {
  const { songs, selectedSong, setSelectedSong } = useGlobalStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const interval = useRef<any>();

  const playNext = () => setSelectedSong(true);
  const playPrev = () => setSelectedSong();

  const { id, title, artist, length } = selectedSong || {};
  const fwdDisabled = songs.at(-1)?.id === id;
  const bwdDisabled = songs.at(0)?.id === id;

  useEffect(() => {
    if (!isPlaying || !selectedSong)
      return () => clearInterval(interval.current);

    interval.current = setInterval(() => {
      if (progress >= selectedSong.length) {
        playNext();
        return;
      }
      setProgress(progress + 1);
    }, 1000);

    return () => clearInterval(interval.current);
  }, [isPlaying, progress]);

  useEffect(() => {
    setProgress(0);
  }, [id]);

  if (!selectedSong) {
    return (
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        No Song Selected
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 flex flex-col items-center justify-center">
      <img
        src={thumbnail}
        alt={title}
        className="w-64 h-64 rounded-lg shadow-lg object-cover mb-8"
      />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-8">{artist}</p>

      <div className="w-full max-w-md">
        <Slider
          value={[progress]}
          onValueChange={(value) => setProgress(value[0])}
          max={length}
          step={1}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground mb-8">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(length)}</span>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            disabled={bwdDisabled}
            onDoubleClick={playPrev}
            onClick={() => setProgress(0)}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 20L9 12L19 4V20Z" />
              <path d="M5 19V5" />
            </svg>
          </Button>

          <Button size="icon" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 4H10V20H6V4Z" />
                <path d="M14 4H18V20H14V4Z" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 4L19 12L5 20V4Z" />
              </svg>
            )}
          </Button>

          <Button
            disabled={fwdDisabled}
            variant="outline"
            size="icon"
            onClick={playNext}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 4L15 12L5 20V4Z" />
              <path d="M19 5V19" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Player;
