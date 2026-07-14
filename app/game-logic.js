// @ts-check

/** @typedef {"X" | "O"} Mark */

export const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Finds the winner and the three winning cells, or returns null.
 * @param {(Mark | null)[]} board
 */
export function getWinner(board) {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    const mark = board[a];

    if (mark && mark === board[b] && mark === board[c]) {
      return { mark, line: combination };
    }
  }

  return null;
}
