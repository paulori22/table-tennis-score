import { kv } from "@vercel/kv";
import { ScoreState } from ".";
import { v4 as uuidv4 } from "uuid";

export function createMatchId() {
  return uuidv4();
}

export async function createMatch(scoreState: ScoreState) {
  const matchId = createMatchId();
  await saveMatchState(matchId, scoreState);
  return matchId;
}

export async function saveMatchState(matchId: string, scoreState: ScoreState) {
  return await kv.set(matchId, { ...scoreState, matchId });
}

export async function getMatchState(matchId: string) {
  return await kv.get(matchId);
}
