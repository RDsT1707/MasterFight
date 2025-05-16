import React, { useState } from "react";
import './Games.css';

import Rules from "../../images/image-rules.svg";
import IcônePierre from "../../images/icon-rock.svg";
import IcônePapier from "../../images/icon-paper.svg";
import IcôneCiseaux from "../../images/icon-scissors.svg";
import Logo from "../../images/logo.svg";

const ICONS = {
  pierre: <img src={IcônePierre} alt="Pierre" className="icon-image" />,
  papier: <img src={IcônePapier} alt="Papier" className="icon-image" />,
  ciseaux: <img src={IcôneCiseaux} alt="Ciseaux" className="icon-image" />
};

const CHOIX = ["pierre", "papier", "ciseaux"];

const calculerRésultat = (joueur, ordinateur) => {
  if (joueur === ordinateur) return "ÉGALITÉ";
  if (
    (joueur === "papier" && ordinateur === "pierre") ||
    (joueur === "pierre" && ordinateur === "ciseaux") ||
    (joueur === "ciseaux" && ordinateur === "papier")
  ) {
    return "GAGNÉ";
  }
  return "PERDU";
};

export default function Games() {
  const [score, setScore] = useState(0);
  const [étapeJeu, setÉtapeJeu] = useState("sélection"); // sélection, attente, résultat
  const [choixJoueur, setChoixJoueur] = useState(null);
  const [choixMaison, setChoixMaison] = useState(null);
  const [résultatJeu, setRésultatJeu] = useState(null);
  const [afficherRègles, setAfficherRègles] = useState(false);

  const gérerClicChoix = (choix) => {
    setChoixJoueur(choix);
    setÉtapeJeu("attente");
    
    // Simuler le choix de la maison
    setTimeout(() => {
      const choixAléatoire = CHOIX[Math.floor(Math.random() * CHOIX.length)];
      setChoixMaison(choixAléatoire);
      setÉtapeJeu("résultat");
      
      const résultat = calculerRésultat(choix, choixAléatoire);
      setRésultatJeu(résultat);
      
      // Mettre à jour le score
      if (résultat === "GAGNÉ") {
        setScore(prevScore => prevScore + 1);
      } else if (résultat === "PERDU") {
        setScore(prevScore => Math.max(0, prevScore - 1));
      }
    }, 1500);
  };

  const rejouer = () => {
    setÉtapeJeu("sélection");
    setChoixJoueur(null);
    setChoixMaison(null);
    setRésultatJeu(null);
  };

  return (
    <div className="game-container">
      {/* En-tête avec logo et score */}
      <header className="game-header">
        <div className="game-title">
          <h1>PIERRE<br />PAPIER<br />CISEAUX</h1>
        </div>
        <div className="score-box">
          <span className="score-label">SCORE</span>
          <div className="score-value">{score}</div>
        </div>
      </header>

      {/* Corps du jeu */}
      {étapeJeu === "sélection" && (
        <div className="selection-screen">
          {/* Triangle de sélection */}
          <div className="choice-btn pierre" onClick={() => gérerClicChoix("pierre")}>
            {ICONS.pierre}
          </div>
          <div className="choice-btn papier" onClick={() => gérerClicChoix("papier")}>
            {ICONS.papier}
          </div>
          <div className="choice-btn ciseaux" onClick={() => gérerClicChoix("ciseaux")}>
            {ICONS.ciseaux}
          </div>
        </div>
      )}

      {étapeJeu === "attente" && (
        <div className="duel-screen">
          <div className="duel-side">
            <h2 className="duel-title">VOUS AVEZ CHOISI</h2>
            <div className={`duel-choice ${choixJoueur}`}>
              {ICONS[choixJoueur]}
            </div>
          </div>
          
          <div className="duel-side">
            <h2 className="duel-title">LA MAISON A CHOISI</h2>
            <div className="house-choice-placeholder">
              <div className="loading-spinner"></div>
            </div>
          </div>
        </div>
      )}

      {étapeJeu === "résultat" && (
        <div className="duel-screen">
          <div className="duel-side">
            <h2 className="duel-title">VOUS AVEZ CHOISI</h2>
            <div className={`duel-choice ${choixJoueur} ${résultatJeu === "GAGNÉ" ? "winner" : ""}`}>
              {ICONS[choixJoueur]}
            </div>
          </div>
          
          <div className="result-box">
            <h2 className="result-text">
              {résultatJeu === "GAGNÉ" ? "VOUS AVEZ GAGNÉ" : résultatJeu === "PERDU" ? "VOUS AVEZ PERDU" : "ÉGALITÉ"}
            </h2>
            <button className="play-again-btn" onClick={rejouer}>
              REJOUER
            </button>
          </div>
          
          <div className="duel-side">
            <h2 className="duel-title">L'ORDINATEUR A CHOISI</h2>
            <div className={`duel-choice ${choixMaison} ${résultatJeu === "PERDU" ? "winner" : ""}`}>
              {ICONS[choixMaison]}
            </div>
          </div>
        </div>
      )}

      {/* Bouton règles */}
      <button className="rules-btn" onClick={() => setAfficherRègles(!afficherRègles)}>
        RÈGLES
      </button>

      {/* Modal des règles */}
      {afficherRègles && (
        <div className="rules-modal">
          <div className="rules-content">
            <h2>RÈGLES</h2>
            <div className="rules-image">
              <img src={Rules} alt="regles" className="rules-image" />
            </div>
            <button className="close-modal" onClick={() => setAfficherRègles(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
