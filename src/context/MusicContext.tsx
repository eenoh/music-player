import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Song = {
  readonly id: number;
  title: string;
  artist: string;
  url: string;
  duration: string;
};

export type Playlist = {
  id: number;
  name: string;
  songs: Song[];
};

export type MusicContextValue = {
  allSongs: Song[];
  currentTrack: Song;
  currentTrackIndex: number;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;

  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Song>>;

  handlePlaySong: (song: Song, index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  play: () => void;
  pause: () => void;

  formatTime: (time: number) => string;

  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  addSongToPlaylist: (playlistId: number, song: Song) => void;
  deletePlaylist: (playlistId: number) => void;
};

export const MusicContext = createContext<MusicContextValue | null>(null);

type MusicProviderProps = {
  children: React.ReactNode;
};

const songs: Song[] = [
  {
    id: 1,
    title: "Running Night",
    artist: "Alex MakeMusic",
    url: "/songs/Running Night.mp3",
    duration: "1:52",
  },
  {
    id: 2,
    title: "Burn the Track",
    artist: "AlexGrohl",
    url: "/songs/Burn the Track.mp3",
    duration: "2:08",
  },
  {
    id: 3,
    title: "Alone",
    artist: "Bodleasons",
    url: "/songs/Alone.mp3",
    duration: "1:33",
  },
  {
    id: 4,
    title: "Don't Talk",
    artist: "Cosmonkey",
    url: "/songs/Don't Talk.mp3",
    duration: "1:51",
  },
  {
    id: 5,
    title: "So Fresh",
    artist: "Cosmonkey",
    url: "/songs/So Fresh.mp3",
    duration: "1:37",
  },
  {
    id: 6,
    title: "Baby Mandala",
    artist: "Kontraa",
    url: "/songs/Baby Mandala.mp3",
    duration: "3:11",
  },
  {
    id: 7,
    title: "No Sleep",
    artist: "Kontraa",
    url: "/songs/No Sleep.mp3",
    duration: "2:47",
  },
  {
    id: 8,
    title: "Epic",
    artist: "KornevMusic",
    url: "/songs/Epic.mp3",
    duration: "2:00",
  },
  {
    id: 9,
    title: "Vlog Beat Background",
    artist: "TuneTank",
    url: "/songs/Vlog Beat Background.mp3",
    duration: "1:36",
  },
  {
    id: 10,
    title: "Brain Implant",
    artist: "Vasily Atsevich",
    url: "/songs/Brain Implant.mp3",
    duration: "0:49",
  },
];

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const [allSongs] = useState<Song[]>(songs);

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Song>(songs[0]);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const savedPlaylists = localStorage.getItem("musicPlayerPlaylists");
    if (savedPlaylists) {
      const playlists = JSON.parse(savedPlaylists);
      setPlaylists(playlists);
    }
  }, []);

  useEffect(() => {
    if (playlists.length > 0) {
      localStorage.setItem("musicPlayerPlaylists", JSON.stringify(playlists));
    }
  }, [playlists]);

  const handlePlaySong = useCallback((song: Song, index: number) => {
    setCurrentTrack(song);
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = (prev + 1) % allSongs.length;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setCurrentTime(0);
    setDuration(0);
  }, [allSongs]);

  const prevTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = (prev - 1 + allSongs.length) % allSongs.length;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setCurrentTime(0);
    setDuration(0);
  }, [allSongs]);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);

  const formatTime = useCallback((time: number) => {
    if (!Number.isFinite(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const createPlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: Date.now(),
      name,
      songs: [],
    };

    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const deletePlaylist = (playlistId: number) => {
    setPlaylists((prev) =>
      prev.filter((playlist: Playlist) => playlist.id !== playlistId),
    );
  };

  const addSongToPlaylist = (playlistId: number, song: Song) => {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist,
      ),
    );
  };

  const value = useMemo<MusicContextValue>(
    () => ({
      allSongs,
      currentTrack,
      currentTrackIndex,
      currentTime,
      duration,
      isPlaying,
      volume,
      setCurrentTime,
      setDuration,
      setVolume,
      handlePlaySong,
      nextTrack,
      prevTrack,
      play,
      pause,
      formatTime,
      createPlaylist,
      deletePlaylist,
      playlists,
      addSongToPlaylist,
      setCurrentTrack,
    }),
    [
      allSongs,
      currentTrack,
      currentTrackIndex,
      currentTime,
      duration,
      isPlaying,
      volume,
      handlePlaySong,
      nextTrack,
      prevTrack,
      play,
      pause,
      formatTime,
      createPlaylist,
      deletePlaylist,
      playlists,
      addSongToPlaylist,
      setCurrentTrack,
    ],
  );

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};

export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
};
