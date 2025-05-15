import React, {useState} from "react";

const choices = ["pierre", "papier", "ciseaux"]; 

// Returns a random choice for the bot
const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

// Determines the result of the game
const getResult = (player, bot) => {
    if (player === bot) return "Egalité";
    if (
        (player === "pierre" && bot === "ciseaux") ||
        (player === "papier" && bot === "pierre") ||
        (player === "ciseaux" && bot === "papier")
    ) {
        return "Gagné";
    }
    return "perdu";
};

const Game = () => {
    const [playerC, setPlayerC] = useState("");
    const [botC, setBotC] = useState("");
    const [result, setResult] = useState("");
    const [score, setScore] = useState(0);

    const handleChoice = (choice) => {
        const bot = getRandomChoice();
        const outcome = getResult(choice, bot);

        setPlayerC(choice);
        setBotC(bot);
        setResult(outcome);

        if (outcome === "Gagné") {
            setScore((prevScore) => prevScore + 1);
        } else if (outcome === "perdu") {
            setScore((prevScore) => prevScore - 1);
        }
    };

    return (
        <div>
            <h1>Pierre / Papier / Ciseaux</h1>
            <p>score : <strong>{score}</strong></p>

            <div>
                {choices.map((choice) => (
                    <button
                        key={choice}
                        onClick={() => handleChoice(choice)}
                    >
                        {choice}
                    </button>
                ))}
            </div>

            {result && (
                <div>
                    <p>Tu as choisi : <strong>{playerC}</strong></p>
                    <p>L'ordi a choisi : <strong>{botC}</strong></p>
                    <p>Résultat : <strong>{result}</strong></p>
                </div>
            )}
        </div>
    );
};

export default Game;