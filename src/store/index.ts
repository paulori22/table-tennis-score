import { whoWonSet } from "@/util";

export enum ScoreActionType {
  INCREASE_PLAYER_POINTS_BY_1 = "INCREASE_PLAYER_POINTS_BY_1",
  DECREASE_PLAYER_POINTS_BY_1 = "DECREASE_PLAYER_POINTS_BY_1",
  CHANGE_PLAYER_NAME = "CHANGE_PLAYER_NAME",
  END_SET = "END_SET",
}

export type ScoreAction =
  | {
      type: ScoreActionType.INCREASE_PLAYER_POINTS_BY_1;
      payload: { player: PlayerIdentifierType };
    }
  | {
      type: ScoreActionType.DECREASE_PLAYER_POINTS_BY_1;
      payload: { player: PlayerIdentifierType };
    }
  | {
      type: ScoreActionType.CHANGE_PLAYER_NAME;
      payload: { player: PlayerIdentifierType; name: string };
    }
  | {
      type: ScoreActionType.END_SET;
    };

export interface PlayerScore {
  name: string;
  wonSets: number;
  currentPoints: number;
}
export type Set = [number, number];
export interface ScoreState {
  player1: PlayerScore;
  player2: PlayerScore;
  sets: Set[];
  startedServing: PlayerIdentifierType;
}

export type PlayerIdentifierType = "player1" | "player2";

export const INITIAL_SCORE_STATE: ScoreState = {
  player1: {
    name: "Player 1",
    wonSets: 0,
    currentPoints: 0,
  },
  player2: {
    name: "Player 2",
    wonSets: 0,
    currentPoints: 0,
  },
  startedServing: "player1",
  sets: [],
};

export function scoreReducer(
  state: ScoreState,
  action: ScoreAction
): ScoreState {
  const { type } = action;
  switch (type) {
    case ScoreActionType.INCREASE_PLAYER_POINTS_BY_1: {
      const player = action.payload.player;
      return {
        ...state,
        [player]: {
          ...state[player],
          currentPoints: state[player].currentPoints + 1,
        },
      };
    }
    case ScoreActionType.DECREASE_PLAYER_POINTS_BY_1: {
      const player = action.payload.player;
      const newPoints =
        state[player].currentPoints - 1 > 0
          ? state[player].currentPoints - 1
          : 0;

      return {
        ...state,
        [player]: {
          ...state[player],
          currentPoints: newPoints,
        },
      };
    }
    case ScoreActionType.CHANGE_PLAYER_NAME: {
      const player = action.payload.player;
      return {
        ...state,
        [player]: {
          ...state[player],
          name: action.payload.name,
        },
      };
    }
    case ScoreActionType.END_SET:
      {
        const setWinnerPlayer = whoWonSet(
          state.player1.currentPoints,
          state.player2.currentPoints
        );

        if (setWinnerPlayer === null) {
          return state;
        }

        const otherPlayer =
          setWinnerPlayer === "player1" ? "player2" : "player1";

        return {
          ...state,
          [setWinnerPlayer]: {
            ...state[setWinnerPlayer],
            wonSets: state[setWinnerPlayer].wonSets + 1,
            currentPoints: 0,
          },
          [otherPlayer]: {
            ...state[otherPlayer],
            currentPoints: 0,
          },
          sets: [
            ...state.sets,
            [state.player1.currentPoints, state.player2.currentPoints],
          ],
        };
      }
      return {
        ...state,
        player2: {
          ...state.player2,
          name: payload,
        },
      };
    default:
      return state;
  }
}
