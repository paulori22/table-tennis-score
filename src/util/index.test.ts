import { isFirstPointOfMatch, setHasEnded, whoWillServe, whoWonSet } from ".";

test("Test whoWillServe Function (player1 starting to server) score bellow 10x10", () => {
  const serverPlayer = "player1";
  expect(whoWillServe(0, 0, serverPlayer)).toBe("player1");
  expect(whoWillServe(0, 1, serverPlayer)).toBe("player1");
  expect(whoWillServe(0, 2, serverPlayer)).toBe("player2");
  expect(whoWillServe(0, 3, serverPlayer)).toBe("player2");
  expect(whoWillServe(0, 4, serverPlayer)).toBe("player1");
  expect(whoWillServe(0, 5, serverPlayer)).toBe("player1");
  expect(whoWillServe(0, 6, serverPlayer)).toBe("player2");

  expect(whoWillServe(7, 8, serverPlayer)).toBe("player2");
  expect(whoWillServe(3, 2, serverPlayer)).toBe("player1");
});

test("Test whoWillServe Function (player2 starting to server) score bellow 10x10", () => {
  const serverPlayer = "player2";
  expect(whoWillServe(0, 0, serverPlayer)).toBe("player2");
  expect(whoWillServe(0, 1, serverPlayer)).toBe("player2");
  expect(whoWillServe(0, 2, serverPlayer)).toBe("player1");
  expect(whoWillServe(0, 3, serverPlayer)).toBe("player1");
  expect(whoWillServe(0, 4, serverPlayer)).toBe("player2");
  expect(whoWillServe(0, 5, serverPlayer)).toBe("player2");
  expect(whoWillServe(0, 6, serverPlayer)).toBe("player1");

  expect(whoWillServe(7, 8, serverPlayer)).toBe("player1");
  expect(whoWillServe(3, 2, serverPlayer)).toBe("player2");
});

test("Test whoWillServe Function (player1 starting to server) score above or equal 10x10", () => {
  const serverPlayer = "player1";
  expect(whoWillServe(10, 10, serverPlayer)).toBe("player1");
  expect(whoWillServe(11, 10, serverPlayer)).toBe("player2");
  expect(whoWillServe(11, 11, serverPlayer)).toBe("player1");
  expect(whoWillServe(12, 11, serverPlayer)).toBe("player2");
  expect(whoWillServe(12, 12, serverPlayer)).toBe("player1");
  expect(whoWillServe(15, 16, serverPlayer)).toBe("player2");
});

test("Test whoWillServe Function (player2 starting to server) score above or equal 10x10", () => {
  const serverPlayer = "player2";
  expect(whoWillServe(10, 10, serverPlayer)).toBe("player2");
  expect(whoWillServe(11, 10, serverPlayer)).toBe("player1");
  expect(whoWillServe(11, 11, serverPlayer)).toBe("player2");
  expect(whoWillServe(12, 11, serverPlayer)).toBe("player1");
  expect(whoWillServe(12, 12, serverPlayer)).toBe("player2");
  expect(whoWillServe(15, 16, serverPlayer)).toBe("player1");
});

test("Test whoWonSet function", () => {
  expect(whoWonSet(0, 0)).toBe(null);
  expect(whoWonSet(1, 5)).toBe(null);
  expect(whoWonSet(10, 10)).toBe(null);
  expect(whoWonSet(11, 10)).toBe(null);
  expect(whoWonSet(15, 15)).toBe(null);

  expect(whoWonSet(11, 5)).toBe("player1");
  expect(whoWonSet(5, 11)).toBe("player2");
  expect(whoWonSet(11, 1)).toBe("player1");
  expect(whoWonSet(11, 6)).toBe("player1");
});

test("Test isFirstPointOfMatch function", () => {
  expect(isFirstPointOfMatch(0, 0, 1)).toBe(false);
  expect(isFirstPointOfMatch(1, 0, 0)).toBe(false);
  expect(isFirstPointOfMatch(0, 1, 1)).toBe(false);
  expect(isFirstPointOfMatch(1, 0, 1)).toBe(false);

  expect(isFirstPointOfMatch(0, 0, 0)).toBe(true);
});
