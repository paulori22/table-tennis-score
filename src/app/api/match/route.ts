import { createMatch, getMatchState, saveMatchState } from "@/store/database";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const matchId = request.nextUrl.searchParams.get("matchId");
  if (!matchId) {
    return NextResponse.error();
  }
  const scoreState = await getMatchState(matchId);
  return NextResponse.json(scoreState);
}

export async function POST(request: NextRequest) {
  const scoreState = await request.json();
  const matchId = await createMatch(scoreState);
  return NextResponse.json({ matchId });
}

export async function PUT(request: NextRequest) {
  const scoreState = await request.json();
  saveMatchState(scoreState.matchId, scoreState);
  return NextResponse.json({ matchId: scoreState.matchId });
}
