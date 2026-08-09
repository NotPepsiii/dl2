import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FocusContext from "../context/FocusContext";

import SearchBar from "../components/Search/SearchBar";
import SearchGrid from "../components/Search/SearchGrid";
import EmptySearch from "../components/Search/EmptySearch";
import NoResults from "../components/Search/NoResults";
import SearchSkeleton from "../components/Search/SearchSkeleton";

import useDebounce from "../hooks/useDebounce";
import useSearch from "../hooks/useSearch";

export default function Search() {
  const [query, setQuery] = useState("");

  const { setFocusedId } = useContext(FocusContext);

  // Always focus the search bar when this page opens
  useEffect(() => {
    // Wait until SearchBar has registered itself
    requestAnimationFrame(() => {
      setFocusedId("search-input");
    });
  }, [setFocusedId]);

  const debounced = useDebounce(query);

  const {
    data = [],
    isLoading,
  } = useSearch(debounced);

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="mx-auto max-w-[1700px] px-8 py-8">
        <SearchBar
          value={query}
          onChange={setQuery}
        />

        <AnimatePresence mode="wait">
          {!query ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptySearch />
            </motion.div>
          ) : isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SearchSkeleton />
            </motion.div>
          ) : data.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <NoResults />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SearchGrid results={data} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}