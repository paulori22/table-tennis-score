"use client";

import { ScoreState } from ".";

export const sessionStorageKey = "localMatch";

export function saveSessionStore(state: ScoreState) {
  sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
}

export function getSessionStore() {
  const storedState = sessionStorage.getItem(sessionStorageKey);
  if (storedState) {
    return JSON.parse(storedState);
  }
  return null;
}
