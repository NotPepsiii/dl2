const STORAGE_KEY = "dulo-continue-watching";

export function getLibrary() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLibrary(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function saveProgress(media, playerData) {
  let library = getLibrary();

  // Remove finished movies/shows
  if (playerData.progress >= 95) {
    library = library.filter(
      (item) => !(item.id === media.id && item.type === media.type)
    );

    saveLibrary(library);
    return;
  }

  const updated = {
    ...media,
    currentTime: playerData.currentTime,
    duration: playerData.duration,
    progress: playerData.progress,
    updatedAt: Date.now(),
  };

  library = library.filter(
    (item) => !(item.id === media.id && item.type === media.type)
  );

  library.unshift(updated);

  saveLibrary(library);
}

export function getProgress(id, type = "movie") {
  return getLibrary().find(
    (item) => item.id == id && item.type === type
  );
}

export function getContinueWatching() {
  return [...getLibrary()].sort(
    (a, b) => b.updatedAt - a.updatedAt
  );
}