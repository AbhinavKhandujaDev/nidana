"use client";

import { Search, Heart, HeartOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useGlobalStore from "@/zustand-stores/useGlobalStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/hooks/use-toast";
import { formatTime } from "@/lib/utils";

const thumbnail =
  "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400&q=80";

function LeftSidebar() {
  const { songs, selectedSong, setSelectedSong, searchSongs, markFavourite } =
    useGlobalStore();

  const { toast } = useToast();
  const debounce = useDebounce((title) => searchSongs(title));

  const toggleFavorite = (songIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const { favourite: fav, title } = songs?.[songIdx];
    markFavourite(songIdx).then(() => {
      const msg = fav
        ? `Removed ${title} from favourites`
        : `Added ${title} to favourites`;
      toast({ title: msg });
    });
  };

  return (
    <div className="w-1/3 border-r border-border p-4 flex flex-col">
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search songs..."
          className="pl-10"
          onChange={(e) => debounce(e.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {songs.map((song) => (
          <div
            key={song.id}
            className={`flex items-center p-3 rounded-lg mb-2 cursor-pointer hover:bg-accent ${
              selectedSong?.id === song.id ? "bg-accent" : ""
            }`}
            onClick={() => setSelectedSong(false, song)}
          >
            <img
              src={thumbnail}
              alt={song.title}
              className="w-12 h-12 rounded object-cover"
            />
            <div className="ml-3 flex-1">
              <h3 className="font-medium">{song.title}</h3>
              <p className="text-sm text-muted-foreground">{song.artist}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {formatTime(song.length)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => toggleFavorite(song.id, e)}
              >
                {!!song.favourite ? (
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                ) : (
                  <HeartOff className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftSidebar;
