import { Set } from "@/store";

export interface SetsHistoryProps {
  sets: Set[];
}

const SetsHistory: React.FunctionComponent<SetsHistoryProps> = ({ sets }) => {
  return (
    <div className="flex flex-col place-items-center gap-1">
      <h2>Sets History</h2>
      {sets.map((s, index) => (
        <div key={index}>
          {s[0]} x {s[1]}
        </div>
      ))}
    </div>
  );
};

export default SetsHistory;
