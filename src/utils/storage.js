export function clearContinueWatching() {
  localStorage.removeItem("dulo-continue-watching");
}

export function clearFavorites() {
  localStorage.removeItem("dulo-favorites");
}

export function resetApp() {
  clearContinueWatching();
  clearFavorites();
}