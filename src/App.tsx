import { AllSongs } from "./components/AllSongs"
import { MusicPlayer } from "./components/MusicPlayer"
import { Playlists } from "./components/Playlists"
import { BrowserRouter, Routes, Route } from "react-router"
import { MusicProvider } from "./context/MusicContext"


function App() {

  return (
    <BrowserRouter>
     <MusicProvider>
        <div className="app">
          <main className="app-name">
            <div className="player-section">
              <MusicPlayer />
            </div>
            <div className="content-section">
              <Routes>
                <Route path="/" element={<AllSongs />} />
                <Route path="/playlists" element={<Playlists />} />
              </Routes>
            </div>
          </main>
        </div>
      </MusicProvider>
    </BrowserRouter>
  )
}

export default App
