import { isFirstPointOfMatch, whoWonSet } from "@/util";

export enum ScoreActionType {
  INCREASE_PLAYER_POINTS_BY_1 = "INCREASE_PLAYER_POINTS_BY_1",
  DECREASE_PLAYER_POINTS_BY_1 = "DECREASE_PLAYER_POINTS_BY_1",
  CHANGE_PLAYER_NAME = "CHANGE_PLAYER_NAME",
  END_SET = "END_SET",
  CANCEL_END_SET = "CANCEL_END_SET",
  SWITCH_START_SERVER_PLAYER = "SWITCH_START_SERVER_PLAYER",
  SWITCH_PLAYER_SIDE = "SWITCH_PLAYER_SIDE",
  SET_MATCH_ID = "SET_MATCH_ID",
  END_MATCH = "END_MATCH",
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
    }
  | {
      type: ScoreActionType.CANCEL_END_SET;
    }
  | {
      type: ScoreActionType.SWITCH_START_SERVER_PLAYER;
    }
  | {
      type: ScoreActionType.SWITCH_PLAYER_SIDE;
    }
  | {
      type: ScoreActionType.SET_MATCH_ID;
      payload: { matchId: string };
    }
  | {
      type: ScoreActionType.END_MATCH;
    };
export interface PlayerScore {
  name: string;
  wonSets: number;
  currentPoints: number;
}
export type Set = [number, number];
export interface ScoreState {
  matchId: string | null;
  player1: PlayerScore;
  player2: PlayerScore;
  sets: Set[];
  startedServing: PlayerIdentifierType;
  switchPlayerSide: boolean;
}

export type PlayerIdentifierType = "player1" | "player2";

export const INITIAL_SCORE_STATE: ScoreState = {
  matchId: null,
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
  switchPlayerSide: false,
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
    case ScoreActionType.END_SET: {
      const setWinnerPlayer = whoWonSet(
        state.player1.currentPoints,
        state.player2.currentPoints
      );

      if (setWinnerPlayer === null) {
        return state;
      }

      const otherPlayer = setWinnerPlayer === "player1" ? "player2" : "player1";

      return {
        ...state,
        startedServing:
          state.startedServing === "player1" ? "player2" : "player1",
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
    case ScoreActionType.CANCEL_END_SET: {
      const whoHasHigherPoints =
        state.player1.currentPoints > state.player2.currentPoints
          ? "player1"
          : "player2";

      return {
        ...state,
        [whoHasHigherPoints]: {
          ...state[whoHasHigherPoints],
          currentPoints: state[whoHasHigherPoints].currentPoints - 1,
        },
      };
    }
    case ScoreActionType.SWITCH_START_SERVER_PLAYER: {
      if (
        !isFirstPointOfMatch(
          state.player1.currentPoints,
          state.player2.currentPoints,
          state.sets.length
        )
      ) {
        return state;
      }

      const serverPlayer =
        state.startedServing === "player1" ? "player2" : "player1";

      return {
        ...state,
        startedServing: serverPlayer,
      };
    }
    case ScoreActionType.SWITCH_PLAYER_SIDE: {
      return {
        ...state,
        switchPlayerSide: !state.switchPlayerSide,
      };
    }
    case ScoreActionType.SET_MATCH_ID: {
      return {
        ...state,
        matchId: action.payload.matchId,
      };
    }
    case ScoreActionType.END_MATCH: {
      return INITIAL_SCORE_STATE;
    }
    default:
      return state;
  }
}
