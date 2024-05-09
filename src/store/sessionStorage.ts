import { ScoreState } from ".";

export const sessionStorageKey = "localMatch";

export function saveSessionStore(state: ScoreState) {
  if (typeof window === "undefined") {
    return null;
  }
  sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
}

export function getSessionStore() {
  if (typeof window === "undefined") {
    return null;
  }
  const storedState = sessionStorage.getItem(sessionStorageKey);
  if (storedState) {
    return JSON.parse(storedState);
  }
  return null;
}
