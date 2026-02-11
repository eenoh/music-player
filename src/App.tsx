import { AllSongs } from "./components/AllSongs"
import { MusicPlayer } from "./components/MusicPlayer"
import { Playlists } from "./components/Playlists"
import { BrowserRouter, Routes, Route } from "react-router"


function App() {

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
