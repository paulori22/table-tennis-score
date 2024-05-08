"use client";

import PlayerScore, { PlayerScoreProps } from "@/components/PlayerScore";
import PopUpModal from "@/components/PopModal";
import SetsHistory from "@/components/SetsHistory";
import SwitchButton from "@/components/SwitchButton";
import useModal from "@/hooks/useModal";
import { INITIAL_SCORE_STATE, ScoreActionType, scoreReducer } from "@/store";
import { isFirstPointOfMatch, whoWillServe, whoWonSet } from "@/util";
import { useEffect, useReducer, useState } from "react";

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
  const isFirstPointOfMatchResult = isFirstPointOfMatch(
    state.player1.currentPoints,
    state.player2.currentPoints,
    state.sets.length
  );

  const modal = useModal();

  useEffect(() => {
    if (wonSetPlayer !== null) {
      modal.handleOpenModal();
    }
  }, [wonSetPlayer, modal]);

  const player1ScoreProps: PlayerScoreProps = {
    player: "player1",
    playerScoreState: state.player1,
    dispatch: dispatch,
    serverPlayer: serverPlayer,
    isFirstPointOfMatch: isFirstPointOfMatchResult,
  };

  const player2ScoreProps: PlayerScoreProps = {
    player: "player2",
    playerScoreState: state.player2,
    dispatch: dispatch,
    serverPlayer: serverPlayer,
    isFirstPointOfMatch: isFirstPointOfMatchResult,
  };

  const player1Index = state.switchPlayerSide ? 1 : 0;
  const player2Index = player1Index === 0 ? 1 : 0;

  const playersScore = [
    <PlayerScore key={0} {...player1ScoreProps} />,
    <PlayerScore key={1} {...player2ScoreProps} />,
  ];

  return (
    <main>
      <div className="flex flex-row justify-items-center justify-center h-5 gap-1 p-2">
        <SwitchButton
          onClick={() => dispatch({ type: ScoreActionType.SWITCH_PLAYER_SIDE })}
        />
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-2">
        {playersScore[player1Index]}
        {playersScore[player2Index]}
      </div>
      <SetsHistory
        sets={state.sets}
        switchPlayerSide={state.switchPlayerSide}
      />
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
        cancelButton={{
          text: "Não",
          onClick: () => {
            dispatch({ type: ScoreActionType.CANCEL_END_SET });
            modal.handleCloseModal();
          },
        }}
      />
    </main>
  );
}
