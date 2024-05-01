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
  const playerNameTypeDispatch =
    player === "player1"
      ? ScoreActionType.CHANGE_PLAYER1_NAME
      : ScoreActionType.CHANGE_PLAYER2_NAME;
  return (
    <div className="flex flex-col place-items-center">
      <div className="py-5 text-4xl">
        <input
          type="text"
          value={playerScoreState.name}
          className="bg-black text-center w-full h-full"
          onChange={(e) =>
            dispatch({
              type: playerNameTypeDispatch,
              payload: e.target.value,
            })
          }
        />
      </div>
      <div className="py-5">{isMyServer && <FaTableTennis size={30} />}</div>
      <div className="py-5 text-8xl">{playerScoreState.currentPoints}</div>
    </div>
  );
};

export default PlayerScore;
