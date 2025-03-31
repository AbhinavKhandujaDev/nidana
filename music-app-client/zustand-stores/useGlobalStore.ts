"use client";

import { create } from "zustand";

const BASE_URL = process.env.BASE_URL;

console.log({ BASE_URL });

const makeurl = (path: string) => BASE_URL + path;

export const USER_ID_HEADER = { "x-user-id": "123" };

export type Song = {
  id: number;
  title: string;
  artist: string;
  length: number;
  favourite: string | boolean;
};

type TGlobalStore = {
  songs: Song[];
  selectedSong: Song | null;
  fetchSongs: (skip?: number, limit?: number) => void;
  searchSongs: (title?: string) => Promise<void>;
  setSelectedSong: (next?: boolean, play?: Song) => void;
  markFavourite: (songId: number) => Promise<void>;
};

let setSongs: (songs: Song[]) => void = () => {};
let getLocalSongs: () => Song[] = () => [];
let defaultSongs: Song[] = [];

if (typeof window !== "undefined") {
  setSongs = (songs: Song[]) => {
    window.localStorage.setItem("songs", JSON.stringify(songs));
  };
  getLocalSongs = () =>
    JSON.parse(window.localStorage.getItem("songs") || "[]") as Song[];
  defaultSongs = JSON.parse(window.localStorage.getItem("songs") || "[]");
}

const useGlobalStore = create<TGlobalStore>((set) => {
  return {
    songs: defaultSongs,
    selectedSong: null,
    searchSongs: async (title?: string) => {
      if (!title) {
        set({ songs: getLocalSongs() });
        return;
      }

      const url = makeurl(`/songs?title=${title.toString()}`);

      const songsRes = await fetch(url, { headers: USER_ID_HEADER }).then(
        (res) => res.json()
      );
      const { data } = songsRes;

      if (data?.length) set({ songs: data });
    },
    fetchSongs: async (skip = 0, limit = 10) => {
      if (skip === 0 && getLocalSongs()?.length) return;

      const url = makeurl(`/songs?skip=${skip}&limit=${limit}`);
      const songsRes = await fetch(url, { headers: USER_ID_HEADER }).then(
        (res) => res.json()
      );
      const { data: songs } = songsRes;

      if (skip === 0) setSongs(songs);

      set({ songs });
    },
    markFavourite: async (songId: number) => {
      const { songs } = useGlobalStore.getState();
      const songIdx = songs.findIndex((o) => o.id === songId);
      const { id, favourite } = songs[songIdx];

      const url = makeurl(`/favourites/${id}`);
      const res = await fetch(url, {
        method: favourite ? "DELETE" : "POST",
        headers: USER_ID_HEADER,
      }).then((res) => res.json());

      if (res.error) return;

      const localSongs = getLocalSongs();
      const lidx = localSongs.findIndex((o) => o.id === songId);
      if (lidx) {
        localSongs[lidx].favourite = !favourite;
        setSongs(localSongs);
      }

      const updated = [...songs];
      updated[songIdx].favourite = !favourite;
      set({ songs: updated });
    },
    setSelectedSong: (next = false, play) => {
      if (play?.id) {
        set({ selectedSong: play });
        return;
      }
      const { songs, selectedSong: song } = useGlobalStore.getState();
      if (!song) return;
      const songIdx = songs.findIndex((o) => o.id === song.id);

      const selectedSong = next ? songs[songIdx + 1] : songs[songIdx - 1];
      set({ selectedSong: selectedSong });
    },
  };
});

export default useGlobalStore;

// function deleteWFRun() {
//   const optionsOpen = document.getElementsByClassName(
//     "timeline-comment-action"
//   )[0];

//   if (!optionsOpen) return;

//   const delOpt = document.getElementsByClassName("menu-item-danger")[0];
//   const delButton = document.getElementsByClassName("Button--danger")[0];

//   optionsOpen.click();
//   delOpt.click();
//   delButton.click();
// }
