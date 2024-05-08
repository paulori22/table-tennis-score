import {
  PlayerIdentifierType,
  PlayerScore as PlayerScoreType,
  ScoreAction,
  ScoreActionType,
} from "@/store";
import { Dispatch } from "react";
import { FaTableTennis, FaExchangeAlt } from "react-icons/fa";

export interface PlayerScoreProps {
  player: PlayerIdentifierType;
  playerScoreState: PlayerScoreType;
  dispatch: Dispatch<ScoreAction>;
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
      <div className="flex flex-row place-content-center gap-3 py-5 h-5">
        {isMyServer && <FaTableTennis size={30} />}
        {isMyServer && isFirstPointOfMatch && (
          <button
            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
            type="button"
            onClick={() =>
              dispatch({ type: ScoreActionType.SWITCH_START_SERVER_PLAYER })
            }
          >
            <FaExchangeAlt
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              size={30}
            />
          </button>
        )}
      </div>
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
