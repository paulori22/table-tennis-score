export enum ScoreActionType {
  INCREASE_PLAYER1_POINTS_BY_1 = "INCREASE_PLAYER1_POINTS_BY_1",
  DECREASE_PLAYER1_POINTS_BY_1 = "DECREASE_PLAYER1_POINTS_BY_1",
  CHANGE_PLAYER1_NAME = "CHANGE_PLAYER1_NAME",
  INCREASE_PLAYER2_POINTS_BY_1 = "INCREASE_PLAYER2_POINTS_BY_1",
  DECREASE_PLAYER2_POINTS_BY_1 = "DECREASE_PLAYER2_POINTS_BY_1",
  CHANGE_PLAYER2_NAME = "CHANGE_PLAYER2_NAME",
}

export interface ScoreAction {
  type: ScoreActionType;
  payload?: any;
}

export interface PlayerScore {
  name: string;
  wonSets: number;
  currentPoints: number;
}

interface SetType {
  player1Points: number;
  player2Points: number;
  currentPoints: number;
}

export interface ScoreState {
  player1: PlayerScore;
  player2: PlayerScore;
  sets: SetType[];
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
  const { type, payload } = action;
  switch (type) {
    case ScoreActionType.INCREASE_PLAYER1_POINTS_BY_1:
      return {
        ...state,
        player1: {
          ...state.player1,
          currentPoints: state.player1.currentPoints + 1,
        },
      };
    case ScoreActionType.DECREASE_PLAYER1_POINTS_BY_1:
      let newPointsP1 = state.player1.currentPoints - 1;
      if (newPointsP1 < 0) {
        newPointsP1 = 0;
      }
      return {
        ...state,
        player1: {
          ...state.player1,
          currentPoints: newPointsP1,
        },
      };
    case ScoreActionType.CHANGE_PLAYER1_NAME:
      return {
        ...state,
        player1: {
          ...state.player1,
          name: payload,
        },
      };
    case ScoreActionType.INCREASE_PLAYER2_POINTS_BY_1:
      return {
        ...state,
        player2: {
          ...state.player2,
          currentPoints: state.player2.currentPoints + 1,
        },
      };
    case ScoreActionType.DECREASE_PLAYER2_POINTS_BY_1:
      let newPointsP2 = state.player2.currentPoints - 1;
      if (newPointsP2 < 0) {
        newPointsP2 = 0;
      }
      return {
        ...state,
        player2: {
          ...state.player2,
          currentPoints: newPointsP2,
        },
      };
    case ScoreActionType.CHANGE_PLAYER2_NAME:
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
