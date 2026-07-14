import assert from "node:assert/strict";
import test from "node:test";

import {
  getWinner,
  winningCombinations,
} from "../app/game-logic.js";

test("recognizes every winning combination", () => {
  for (const combination of winningCombinations) {
    const board = Array(9).fill(null);

    for (const index of combination) board[index] = "X";

    assert.deepEqual(getWinner(board), {
      mark: "X",
      line: combination,
    });
  }
});

test("returns null when nobody has won", () => {
  const draw = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
  assert.equal(getWinner(draw), null);
});
