import { useState } from "react"

type Song = {
  readonly id: number;
  title: string;
  artist: string;
  url: string;
  duration: string;
}

const songs: Song[] = [
  {
    id: 1,
    title: "Running Night",
    artist: "Alex MakeMusic",
    url: "/songs/Running Night.mp3",
    duration: "1:52"
  },
  {
    id: 2,
    title: "Burn the Track",
    artist: "AlexGrohl",
    url: "/songs/Burn the Track.mp3",
    duration: "2:08"
  },
  {
    id: 3,
    title: "Alone",
    artist: "Bodleasons",
    url: "/songs/Alone.mp3",
    duration: "1:33"
  },
  {
    id: 4,
    title: "Don't Talk",
    artist: "Cosmonkey",
    url: "/songs/Don't Talk.mp3",
    duration: "1:51"
  },
  {
    id: 5,
    title: "So Fresh",
    artist: "Cosmonkey",
    url: "/songs/So Fresh.mp3",
    duration: "1:37"
  },
  {
    id: 6,
    title: "Baby Mandala",
    artist: "Kontraa",
    url: "/songs/Baby Mandala.mp3",
    duration: "3:11"
  },
  {
    id: 7,
    title: "No Sleep",
    artist: "Kontraa",
    url: "/songs/No Sleep.mp3",
    duration: "2:47"
  },
  {
    id: 8,
    title: "Epic",
    artist: "KornevMusic",
    url: "/songs/Epic.mp3",
    duration: "2:00"
  },
  {
    id: 9,
    title: "Vlog Beat Background",
    artist: "TuneTank",
    url: "/songs/Vlog Beat Background.mp3",
    duration: "1:36"
  },
  {
    id: 10,
    title: "Brain Implant",
    artist: "Vasily Atsevich",
    url: "/songs/Brain Implant.mp3",
    duration: "0:49"
  }
]



export const useMusic = () => {
  const [allSongs, setAllSongs] = useState<Song[]>(songs);
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  const handlePlaySong = (song: Song, index: number) => {
    setCurrentTrack(song);
    setCurrentTrackIndex(index);
  };


  return { allSongs, handlePlaySong, currentTrackIndex, currentTrack };
} 