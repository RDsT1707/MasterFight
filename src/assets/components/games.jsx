import React, {useState} from "react";

const choices = ["pierre", "papier", "ciseaux"]; 

const getRandomChoice = () => {
    if (player === bot) return "Egaliter";
    if (
     (player === "pierrre" && === "ciseaux") ||
     (player === "papier" && === "pierrre") ||
     (player === "ciseaux" && === "papier") 

    ) {
        return "Gagné"; 
    }
    return "perdu";
};

const game = () => {
    const [playerC, setPlayerC] = useState("");
    const [botC, setBotC] = useState("");
    const [result, setresult ] = useState("");
    const [score, setScore ] = useState(0);


    const handleChoice = (choice) => {
        const bot = getRandomChoice();
        const outcome = getResult(choice, bot);


        setPlayerC(choice);
        setBotC(bot);
        setresult(outcome);

        if (outcome === "Gagné") {
            setScore(score + 1);
        } else if (outcome === "perdu") {
            setScore(score - 1);
        }
    }

};