import { whoWillServe } from ".";

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
