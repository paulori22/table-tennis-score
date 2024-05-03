import {
  PlayerIdentifierType,
  PlayerScore as PlayerScoreType,
  ScoreAction,
  ScoreActionType,
} from "@/store";
import { Dispatch } from "react";
import { FaTableTennis } from "react-icons/fa";

export interface PlayerScoreProps {
  player: PlayerIdentifierType;
  playerScoreState: PlayerScoreType;
  dispatch: Dispatch<ScoreAction>;
  serverPlayer: PlayerIdentifierType;
}

const PlayerScore: React.FunctionComponent<PlayerScoreProps> = ({
  player,
  playerScoreState,
  serverPlayer,
  dispatch,
}) => {
  const isMyServer = player === serverPlayer;
  return (
    <div className="flex flex-col place-items-center">
      <div className="py-5 text-4xl">
        <input
          type="text"
          value={playerScoreState.name}
          className="bg-black text-center w-full h-full"
          onChange={(e) =>
            dispatch({
              type: ScoreActionType.CHANGE_PLAYER_NAME,
              payload: { player, name: e.target.value },
            })
          }
        />
      </div>
      <div className="py-5">{isMyServer && <FaTableTennis size={30} />}</div>
      <div className="flex flex-row place-items-center py-5">
        <div className="text-8xl">{playerScoreState.currentPoints}</div>
        <div className="text-8xl"> - </div>
        <div className="text-8xl">{playerScoreState.wonSets}</div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() =>
            dispatch({
              type: ScoreActionType.INCREASE_PLAYER_POINTS_BY_1,
              payload: { player },
            })
          }
        >
          + 1
        </button>
        <button
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={() =>
            dispatch({
              type: ScoreActionType.DECREASE_PLAYER_POINTS_BY_1,
              payload: { player },
            })
          }
        >
          - 1
        </button>
      </div>
    </div>
  );
};

export default PlayerScore;
