import React, { useState } from "react";
import './Games.css';

import IcônePierre from "../../images/icon-rock.svg";
import IcônePapier from "../../images/icon-paper.svg";
import IcôneCiseaux from "../../images/icon-scissors.svg";

const choix = ["pierre", "papier", "ciseaux"];

const icônes = {
  pierre: <img src={IcônePierre} alt="Pierre" />,
  papier: <img src={IcônePapier} alt="Papier" />,
  ciseaux: <img src={IcôneCiseaux} alt="Ciseaux" />,
};

const calculerRésultat = (joueur, ordinateur) => {
  if (joueur === ordinateur) return "Égalité";
  if (
    (joueur === "papier" && ordinateur === "pierre") ||
    (joueur === "pierre" && ordinateur === "ciseaux") ||
    (joueur === "ciseaux" && ordinateur === "papier")
  ) {
    return "Gagné";
  }
  return "Perdu";
};

export default function Games() {
  const [score, setScore] = useState(0);
  const [choixJoueur, setChoixJoueur] = useState(null);
  const [choixOrdi, setChoixOrdi] = useState(null);
  const [résultat, setRésultat] = useState(null);

  const jouer = (choixFait) => {
    const ordi = choix[Math.floor(Math.random() * choix.length)];
    const résultatPartie = calculerRésultat(choixFait, ordi);

    setChoixJoueur(choixFait);
    setChoixOrdi(ordi);
    setRésultat(résultatPartie);

    if (résultatPartie === "Gagné") setScore((s) => s + 1);
    else if (résultatPartie === "Perdu") setScore((s) => s - 1);
  };

  const recommencer = () => {
    setChoixJoueur(null);
    setChoixOrdi(null);
    setRésultat(null);
  };

  return (
    <div className="conteneur-jeu-triangle">
      <header className="entete">
        <div className="titre-jeu">ROCK<br />PAPER<br />SCISSORS</div>
        <div className="boite-score">
          <div className="etiquette-score">SCORE</div>
          <div className="nombre-score">{score}</div>
        </div>
      </header>

      {!résultat ? (
        <div className="zone-jeu">
          {/* lignes du triangle */}
          <div className="ligne ligne-haut"></div>
          <div className="ligne ligne-gauche"></div>
          <div className="ligne ligne-droite"></div>

          {/* boutons choix */}
          <button
            className="bouton-choix papier"
            onClick={() => jouer("papier")}
            aria-label="papier"
          >
            {icônes.papier}
          </button>
          <button
            className="bouton-choix ciseaux"
            onClick={() => jouer("ciseaux")}
            aria-label="ciseaux"
          >
            {icônes.ciseaux}
          </button>
          <button
            className="bouton-choix pierre"
            onClick={() => jouer("pierre")}
            aria-label="pierre"
          >
            {icônes.pierre}
          </button>
        </div>
      ) : (
        <div className="ecran-resultat">
          <div className="choix-joueur">
            <div className={`bouton-choix grand ${choixJoueur}`}>
              {icônes[choixJoueur]}
            </div>
            <p>TU AS CHOISI</p>
          </div>

          <div className="texte-resultat">
            <h2>
              {résultat === "Gagné"
                ? "TU AS GAGNÉ"
                : résultat === "Perdu"
                ? "TU AS PERDU"
                : "ÉGALITÉ"}
            </h2>
            <button onClick={recommencer}>REJOUER</button>
          </div>

          <div className="choix-ordi">
            <div className={`bouton-choix grand ${choixOrdi}`}>
              {icônes[choixOrdi]}
            </div>
            <p>L’ORDI A CHOISI</p>
          </div>
        </div>
      )}
    </div>
  );
}
