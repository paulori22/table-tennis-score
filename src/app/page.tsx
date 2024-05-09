"use client";

import { useReducer } from "react";

import { INITIAL_SCORE_STATE, scoreReducer } from "@/store";
import Score from "@/components/Score";
import { getSessionStore } from "@/store/sessionStorage";

export default function Home() {
  const stateFromSession = getSessionStore();
  const [state, dispatch] = useReducer(
    scoreReducer,
    stateFromSession ?? INITIAL_SCORE_STATE
  );
  return <Score state={state} dispatch={dispatch} />;
}
