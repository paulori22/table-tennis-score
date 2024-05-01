"use client";

import PlayerScore from "@/components/PlayerScore";
import { INITIAL_SCORE_STATE, ScoreActionType, scoreReducer } from "@/store";
import { whoWillServe } from "@/util";
import { useReducer } from "react";

export default function Home() {
  const [state, dispatch] = useReducer(scoreReducer, INITIAL_SCORE_STATE);
  const serverPlayer = whoWillServe(
    state.player1.currentPoints,
    state.player2.currentPoints,
    state.startedServing
  );
  return (
    <main>
      <div className="grid grid-cols-2 justify-items-center gap-2">
        <PlayerScore
          player="player1"
          playerScoreState={state.player1}
          dispatch={dispatch}
          serverPlayer={serverPlayer}
        />
        <PlayerScore
          player="player2"
          playerScoreState={state.player2}
          dispatch={dispatch}
          serverPlayer={serverPlayer}
        />
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-2">
        <div className="flex flex-col gap-2">
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() =>
              dispatch({ type: ScoreActionType.INCREASE_PLAYER1_POINTS_BY_1 })
            }
          >
            Add Score +
          </button>
          <button
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={() =>
              dispatch({ type: ScoreActionType.DECREASE_PLAYER1_POINTS_BY_1 })
            }
          >
            Remove Score -
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() =>
              dispatch({ type: ScoreActionType.INCREASE_PLAYER2_POINTS_BY_1 })
            }
          >
            Add Score +
          </button>

          <button
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={() =>
              dispatch({ type: ScoreActionType.DECREASE_PLAYER2_POINTS_BY_1 })
            }
          >
            Remove Score -
          </button>
        </div>
      </div>
    </main>
  );
}
