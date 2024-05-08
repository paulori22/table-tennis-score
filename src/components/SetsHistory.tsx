import { ScoreState, Set } from "@/store";

export interface SetsHistoryProps {
  sets: Set[];
  switchPlayerSide: ScoreState["switchPlayerSide"];
}

const SetsHistory: React.FunctionComponent<SetsHistoryProps> = ({
  sets,
  switchPlayerSide,
}) => {
  const player1Index = switchPlayerSide ? 1 : 0;
  const player2Index = player1Index === 0 ? 1 : 0;
  return (
    <div className="flex flex-col place-items-center gap-1">
      <h2>Sets History</h2>
      {sets.map((s, index) => (
        <div key={index}>
          {s[player1Index]} x {s[player2Index]}
        </div>
      ))}
    </div>
  );
};

export default SetsHistory;
