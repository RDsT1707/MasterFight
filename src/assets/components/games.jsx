import React, { useState } from "react";

// Remplace ces imports par tes vrais icônes SVG ou PNG
import IconPierre from "./icons/pierre.svg";
import IconPapier from "./icons/papier.svg";
import IconCiseaux from "./icons/ciseaux.svg";

const choices = ["pierre", "papier", "ciseaux"];

const icons = {
  pierre: <img src={IconPierre} alt="Pierre" />,
  papier: <img src={IconPapier} alt="Papier" />,
  ciseaux: <img src={IconCiseaux} alt="Ciseaux" />,
};

const getResult = (player, bot) => {
  if (player === bot) return "Égalité";
  if (
    (player === "papier" && bot === "pierre") ||
    (player === "pierre" && bot === "ciseaux") ||
    (player === "ciseaux" && bot === "papier")
  ) {
    return "Gagné";
  }
  return "Perdu";
};

export default function Game() {
  const [score, setScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [result, setResult] = useState(null);

  const handleChoice = (choice) => {
    const botPick = choices[Math.floor(Math.random() * choices.length)];
    const res = getResult(choice, botPick);

    setPlayerChoice(choice);
    setBotChoice(botPick);
    setResult(res);

    if (res === "Gagné") setScore((s) => s + 1);
    else if (res === "Perdu") setScore((s) => s - 1);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setBotChoice(null);
    setResult(null);
  };

  return (
    <div className="game-container">
      <header className="header">
        <div className="game-title">ROCK PAPER SCISSORS</div>
        <div className="score-box">
          <div className="score-label">SCORE</div>
          <div className="score-number">{score}</div>
        </div>
      </header>

      {!result ? (
        <div className="choices">
          {choices.map((choice) => (
            <button
              key={choice}
              className={`choice-button ${choice}`}
              onClick={() => handleChoice(choice)}
              aria-label={choice}
            >
              {icons[choice]}
            </button>
          ))}
        </div>
      ) : (
        <div className="result-screen">
          <div className="choice-picked">
            <div className={`choice-button large ${playerChoice}`}>
              {icons[playerChoice]}
            </div>
            <p>YOU PICKED</p>
          </div>

          <div className="result-text">
            <h2>
              {result === "Gagné"
                ? "YOU WIN"
                : result === "Perdu"
                ? "YOU LOSE"
                : "TIE"}
            </h2>
            <button onClick={resetGame}>PLAY AGAIN</button>
          </div>

          <div className="choice-picked">
            <div className={`choice-button large ${botChoice}`}>
              {icons[botChoice]}
            </div>
            <p>THE HOUSE PICKED</p>
          </div>
        </div>
      )}
    </div>
  );
}
