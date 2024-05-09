import { ScoreAction, ScoreActionType, ScoreState } from "@/store";
import { scoreApi } from "@/util/http";
import { FaShareAlt } from "react-icons/fa";
import SwitchButton from "./SwitchButton";
import SetsHistory from "./SetsHistory";
import PopUpModal from "./PopModal";
import { isFirstPointOfMatch, whoWillServe, whoWonSet } from "@/util";
import useModal from "@/hooks/useModal";
import { Dispatch, useEffect } from "react";
import PlayerScore, { PlayerScoreProps } from "./PlayerScore";
import { sessionStorageKey } from "@/store/sessionStorage";
import ShareModal from "./ShareModal";

export interface ScoreProps {
  state: ScoreState;
  dispatch?: Dispatch<ScoreAction>;
}

const Score: React.FunctionComponent<ScoreProps> = ({ state, dispatch }) => {
  const isJudgeView = dispatch ? true : false;
  const isMatchShared = state.matchId !== null;

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
  const shareModal = useModal();

  useEffect(() => {
    if (wonSetPlayer !== null && isJudgeView) {
      modal.handleOpenModal();
    }
  }, [wonSetPlayer, modal, isJudgeView]);

  useEffect(() => {
    if (isJudgeView) {
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
    }
  }, [JSON.stringify(state), isJudgeView]);

  useEffect(() => {
    if (isJudgeView && state.matchId) {
      scoreApi.put("match", state);
    }
  }, [JSON.stringify(state), isJudgeView, state.matchId]);

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
      {isJudgeView && (
        <div className="flex flex-row-reverse justify-items-center h-5 gap-1 p-2">
          <button
            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
            type="button"
          >
            <FaShareAlt
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              onClick={async () => {
                if (!isMatchShared) {
                  const response = await scoreApi.post<{
                    matchId: string;
                  }>("match", state);
                  dispatch &&
                    dispatch({
                      type: ScoreActionType.SET_MATCH_ID,
                      payload: {
                        matchId: response.data.matchId,
                      },
                    });
                }
                shareModal.handleOpenModal();
              }}
            />
          </button>
        </div>
      )}

      {isJudgeView && (
        <div className="flex flex-row justify-items-center justify-center h-5 gap-1 p-2">
          <SwitchButton
            onClick={() =>
              dispatch && dispatch({ type: ScoreActionType.SWITCH_PLAYER_SIDE })
            }
          />
        </div>
      )}

      <div className="grid grid-cols-2 justify-items-center gap-2">
        {playersScore[player1Index]}
        {playersScore[player2Index]}
      </div>
      <SetsHistory
        sets={state.sets}
        switchPlayerSide={state.switchPlayerSide}
      />
      {isJudgeView && (
        <PopUpModal
          {...modal}
          message="Você tem certeza que deseja finalizar o set?"
          confirmationButton={{
            text: "Sim",
            onClick: () => {
              dispatch && dispatch({ type: ScoreActionType.END_SET });
              modal.handleCloseModal();
            },
          }}
          cancelButton={{
            text: "Não",
            onClick: () => {
              dispatch && dispatch({ type: ScoreActionType.CANCEL_END_SET });
              modal.handleCloseModal();
            },
          }}
        />
      )}
      <ShareModal {...shareModal} matchId={state.matchId} />
    </main>
  );
};

export default Score;
