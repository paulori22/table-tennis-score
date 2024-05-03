export function whoWillServe(
  player1Points: number,
  player2Points: number,
  startedServing: "player1" | "player2"
) {
  const totalPoints = player1Points + player2Points;
  let calculationToCompare = null;
  //Players must alternate the server each point
  if (player1Points > 10 || player2Points > 10) {
    calculationToCompare = totalPoints;
  } else {
    //Players must alternate the server every two point
    calculationToCompare = Math.floor(totalPoints / 2);
  }
  if (calculationToCompare % 2 === 0) {
    return startedServing;
  } else {
    return startedServing === "player1" ? "player2" : "player1";
  }
}

export function whoWonSet(player1Points: number, player2Points: number) {
  if (player1Points >= 11 && player1Points - player2Points >= 2) {
    return "player1";
  }

  if (player2Points >= 11 && player2Points - player1Points >= 2) {
    return "player2";
  }

  return null;
}
