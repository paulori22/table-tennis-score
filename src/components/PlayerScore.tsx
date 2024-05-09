import {
  PlayerIdentifierType,
  PlayerScore as PlayerScoreType,
  ScoreAction,
  ScoreActionType,
} from "@/store";
import { Dispatch } from "react";
import { FaTableTennis } from "react-icons/fa";
import SwitchButton from "./SwitchButton";

export interface PlayerScoreProps {
  player: PlayerIdentifierType;
  playerScoreState: PlayerScoreType;
  dispatch?: Dispatch<ScoreAction>;
  serverPlayer: PlayerIdentifierType;
  isFirstPointOfMatch: boolean;
}

const PlayerScore: React.FunctionComponent<PlayerScoreProps> = ({
  player,
  playerScoreState,
  serverPlayer,
  dispatch,
  isFirstPointOfMatch,
}) => {
  const isJudgeView = dispatch ? true : false;
  const isMyServer = player === serverPlayer;
  return (
    <div className="flex flex-col place-items-center">
      <div className="py-5 text-4xl">
        <input
          type="text"
          value={playerScoreState.name}
          className="bg-black text-center w-full h-full"
          disabled={!isJudgeView}
          onChange={(e) => {
            if (isJudgeView) {
              dispatch &&
                dispatch({
                  type: ScoreActionType.CHANGE_PLAYER_NAME,
                  payload: { player, name: e.target.value },
                });
            }
          }}
        />
      </div>
      <div className="flex flex-row place-content-center gap-3 py-5 h-5">
        {isMyServer && <FaTableTennis size={30} />}
        {isMyServer && isFirstPointOfMatch && isJudgeView && (
          <SwitchButton
            onClick={() =>
              dispatch &&
              dispatch({ type: ScoreActionType.SWITCH_START_SERVER_PLAYER })
            }
          />
        )}
      </div>
      <div className="flex flex-row place-items-center py-5">
        <div className="text-8xl">{playerScoreState.currentPoints}</div>
        <div className="text-8xl"> - </div>
        <div className="text-8xl">{playerScoreState.wonSets}</div>
      </div>
      {isJudgeView && (
        <div className="flex flex-col gap-2 items-center">
          <button
            className="rounded w-40 h-20 bg-green-700 py-2 font-bold text-white hover:bg-green-900"
            onClick={() =>
              dispatch &&
              dispatch({
                type: ScoreActionType.INCREASE_PLAYER_POINTS_BY_1,
                payload: { player },
              })
            }
          >
            <div className="text-2xl">+ 1</div>
          </button>
          <button
            className="rounded w-20 h-10 bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={() =>
              dispatch &&
              dispatch({
                type: ScoreActionType.DECREASE_PLAYER_POINTS_BY_1,
                payload: { player },
              })
            }
          >
            <div className="text-2xl">- 1</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerScore;
