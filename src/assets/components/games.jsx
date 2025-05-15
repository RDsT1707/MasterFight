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



};