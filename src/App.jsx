import { Routes, Route } from "react-router-dom";

import BackHandler from "./components/BackHandler";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import TV from "./pages/TV";
import Player from "./pages/Player";
import WatchMovie from "./pages/WatchMovie";
import WatchTV from "./pages/WatchTV";
import Favorites from "./pages/Favorites";
import ContinueWatching from "./pages/ContinueWatching";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <>
      {/* Global Back Handler */}
      <BackHandler />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/search" element={<Search />} />

        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/tv/:id" element={<TV />} />

        {/* Watch Routes */}
        <Route
          path="/watch/movie/:id"
          element={<WatchMovie />}
        />

        <Route
          path="/watch/tv/:id/:season/:episode"
          element={<WatchTV />}
        />

        {/* Legacy Player */}
        <Route path="/player/*" element={<Player />} />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/continue"
          element={<ContinueWatching />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </>
  );
}