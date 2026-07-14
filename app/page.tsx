"use client";

import { useState } from "react";
import { getWinner } from "./game-logic";

type Mark = "X" | "O";
type Cell = Mark | null;
type Scores = Record<Mark | "draws", number>;

const emptyBoard = (): Cell[] => Array<Cell>(9).fill(null);

export default function Home() {
  const [board, setBoard] = useState<Cell[]>(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Mark>("X");
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draws: 0 });

  const winner = getWinner(board);
  const isDraw = !winner && board.every(Boolean);
  const roundFinished = Boolean(winner || isDraw);

  const status = winner
    ? `Wygrywa gracz ${winner.mark}!`
    : isDraw
      ? "Remis! Dobra rozgrywka."
      : `Ruch gracza ${currentPlayer}`;

  function playMove(index: number) {
    if (board[index] || roundFinished) return;

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    const nextWinner = getWinner(nextBoard);
    const nextIsDraw = !nextWinner && nextBoard.every(Boolean);

    setBoard(nextBoard);

    if (nextWinner) {
      setScores((previous) => ({
        ...previous,
        [nextWinner.mark]: previous[nextWinner.mark] + 1,
      }));
      return;
    }

    if (nextIsDraw) {
      setScores((previous) => ({
        ...previous,
        draws: previous.draws + 1,
      }));
      return;
    }

    setCurrentPlayer((player) => (player === "X" ? "O" : "X"));
  }

  function startNewRound() {
    setBoard(emptyBoard());
    setCurrentPlayer("X");
  }

  function resetMatch() {
    startNewRound();
    setScores({ X: 0, O: 0, draws: 0 });
  }

  return (
    <main className="game-shell">
      <div className="decor decor-left" aria-hidden="true" />
      <div className="decor decor-right" aria-hidden="true" />
      <div className="dot-grid" aria-hidden="true" />

      <header className="topbar">
        <div className="title-wrap">
          <span className="brand-symbol" aria-hidden="true">
            <span>X</span>
            <span>O</span>
          </span>
          <h1>Kółko i krzyżyk</h1>
        </div>
        <span className="challenge-badge">
          <span className="badge-dot" aria-hidden="true" />
          PITax challenge
        </span>
      </header>

      <section className="game-area" aria-label="Gra w kółko i krzyżyk">
        <div
          className={`status-pill ${roundFinished ? "status-finished" : ""}`}
          role="status"
          aria-live="polite"
        >
          <span className="status-dot" aria-hidden="true" />
          {status}
        </div>

        <div className="board-wrap">
          <div
            className={`board board-player-${currentPlayer.toLowerCase()}`}
            role="grid"
            aria-label="Plansza 3 na 3"
          >
            {board.map((cell, index) => {
              const isWinningCell = winner
                ? winner.line.some((cellIndex) => cellIndex === index)
                : false;

              return (
                <button
                  className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ""} ${isWinningCell ? "winning-cell" : ""}`}
                  key={index}
                  type="button"
                  role="gridcell"
                  onClick={() => playMove(index)}
                  disabled={Boolean(cell) || roundFinished}
                  aria-label={
                    cell
                      ? `Pole ${index + 1}: ${cell}`
                      : `Pole ${index + 1}: puste`
                  }
                >
                  {cell && (
                    <span className="mark" aria-hidden="true">
                      {cell}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="scoreboard" aria-label="Wynik meczu">
          <article className="score-card score-x">
            <span className="score-icon" aria-hidden="true">X</span>
            <span className="score-label">Gracz X</span>
            <strong>{scores.X}</strong>
          </article>
          <article className="score-card score-draws">
            <span className="score-icon" aria-hidden="true">=</span>
            <span className="score-label">Remisy</span>
            <strong>{scores.draws}</strong>
          </article>
          <article className="score-card score-o">
            <span className="score-icon" aria-hidden="true">O</span>
            <span className="score-label">Gracz O</span>
            <strong>{scores.O}</strong>
          </article>
        </div>

        <div className="actions">
          <button className="primary-button" type="button" onClick={startNewRound}>
            <span className="button-icon" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            {roundFinished ? "Zagraj ponownie" : "Nowa gra"}
          </button>
          <button className="secondary-button" type="button" onClick={resetMatch}>
            Resetuj wynik
          </button>
        </div>
      </section>

      <footer>Prosta gra. Dobre decyzje. Najlepszy wynik.</footer>
    </main>
  );
}
