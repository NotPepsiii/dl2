import { Search, Heart, Home, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import Focusable from "../Focus/Focusable";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 items-center justify-between px-8">
        <h1 className="text-3xl font-black tracking-wide text-white">
          Dulo TV
        </h1>

        <nav className="flex gap-8">
          {links.map(({ to, label, icon: Icon }, index) => (
            <Focusable
              key={to}
              id={`nav-${label.toLowerCase()}`}
              row={0}
              col={index}
            >
              <Link
                to={to}
                className={`
                  flex items-center gap-2 rounded-lg px-3 py-2
                  transition-all duration-200
                  ${
                    location.pathname === to
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }
                `}
              >
                <Icon size={20} />
                {label}
              </Link>
            </Focusable>
          ))}
        </nav>
      </div>
    </header>
  );
}