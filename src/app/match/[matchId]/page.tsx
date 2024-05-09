"use client";
import Score from "@/components/Score";
import { scoreApi } from "@/util/http";
import { useQuery } from "@tanstack/react-query";

export default function MatchView({ params }: { params: { matchId: string } }) {
  const { isLoading, data: scoreState } = useQuery({
    queryKey: ["scoreState"],
    queryFn: async () => {
      const { data } = await scoreApi.get("match", {
        params: { matchId: params.matchId },
      });
      return data;
    },
    refetchInterval: 5000,
  });

  if (isLoading) return <div>Loading Match Score</div>;
  return <Score state={scoreState} />;
}
