"use client";

import PlayerScore from "@/components/PlayerScore";
import PopUpModal from "@/components/PopModal";
import SetsHistory from "@/components/SetsHistory";
import useModal from "@/hooks/useModal";
import { INITIAL_SCORE_STATE, ScoreActionType, scoreReducer } from "@/store";
import { whoWillServe, whoWonSet } from "@/util";
import { useEffect, useReducer } from "react";

export default function Home() {
  const [state, dispatch] = useReducer(scoreReducer, INITIAL_SCORE_STATE);
  const serverPlayer = whoWillServe(
    state.player1.currentPoints,
    state.player2.currentPoints,
    state.startedServing
  );
  const wonSetPlayer = whoWonSet(
    state.player1.currentPoints,
    state.player2.currentPoints
  );
  const modal = useModal();

  useEffect(() => {
    if (wonSetPlayer !== null) {
      modal.handleOpenModal();
    }
  }, [wonSetPlayer, modal]);

  console.log(state);

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
      <SetsHistory sets={state.sets} />
      <PopUpModal
        {...modal}
        message="Você tem certeza que deseja finalizar o set?"
        confirmationButton={{
          text: "Sim",
          onClick: () => {
            dispatch({ type: ScoreActionType.END_SET });
            modal.handleCloseModal();
          },
        }}
        cancelButton={{ text: "Não" }}
      />
    </main>
  );
}
