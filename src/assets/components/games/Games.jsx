// Import de React et du hook useState pour la gestion des états
import React, { useState } from "react";

// Importation de la feuille de style associée
import './Games.css';

// Importation des images utilisées dans le jeu
import Rules from "../../images/image-rules.svg";
import IcônePierre from "../../images/icon-rock.svg";
import IcônePapier from "../../images/icon-paper.svg";
import IcôneCiseaux from "../../images/icon-scissors.svg";
import Logo from "../../images/logo.svg"; // (non utilisé dans ce code)

// Dictionnaire d’icônes associées à chaque choix
const ICONS = {
  pierre: <img src={IcônePierre} alt="Pierre" className="icon-image" />,
  papier: <img src={IcônePapier} alt="Papier" className="icon-image" />,
  ciseaux: <img src={IcôneCiseaux} alt="Ciseaux" className="icon-image" />
};

// Liste des choix possibles
const CHOIX = ["pierre", "papier", "ciseaux"];

// Fonction qui détermine le résultat en comparant le choix du joueur et celui de l’ordinateur
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

// Composant principal du jeu
export default function Games() {
  // États du composant
  const [score, setScore] = useState(0);                         // Score du joueur
  const [étapeJeu, setÉtapeJeu] = useState("sélection");         // Étapes : sélection > attente > résultat
  const [choixJoueur, setChoixJoueur] = useState(null);          // Choix fait par le joueur
  const [choixMaison, setChoixMaison] = useState(null);          // Choix aléatoire de l'ordinateur
  const [résultatJeu, setRésultatJeu] = useState(null);          // Résultat du duel (GAGNÉ, PERDU, ÉGALITÉ)
  const [afficherRègles, setAfficherRègles] = useState(false);   // Affichage de la modal des règles

  // Fonction appelée quand le joueur clique sur un choix
  const gérerClicChoix = (choix) => {
    setChoixJoueur(choix);           // Enregistrer le choix du joueur
    setÉtapeJeu("attente");          // Passer à l'étape "attente"

    // Simuler le choix de l’ordinateur après un délai (effet suspense)
    setTimeout(() => {
      const choixAléatoire = CHOIX[Math.floor(Math.random() * CHOIX.length)];
      setChoixMaison(choixAléatoire);   // Enregistrer le choix de la maison
      setÉtapeJeu("résultat");          // Afficher l'écran du résultat

      // Calculer le résultat du duel
      const résultat = calculerRésultat(choix, choixAléatoire);
      setRésultatJeu(résultat);

      // Mise à jour du score en fonction du résultat
      if (résultat === "GAGNÉ") {
        setScore(prevScore => prevScore + 1);
      } else if (résultat === "PERDU") {
        setScore(prevScore => Math.max(0, prevScore - 1)); // Le score ne descend jamais sous 0
      }
    }, 1500); // 1,5 seconde d'attente
  };

  // Fonction pour rejouer une partie
  const rejouer = () => {
    setÉtapeJeu("sélection"); // Retour à l'écran de sélection
    setChoixJoueur(null);
    setChoixMaison(null);
    setRésultatJeu(null);
  };

  // Rendu du composant JSX
  return (
    <div className="game-container">
      {/* En-tête : logo et score */}
      <header className="game-header">
        <div className="game-title">
          <h1>PIERRE<br />PAPIER<br />CISEAUX</h1>
        </div>
        <div className="score-box">
          <span className="score-label">SCORE</span>
          <div className="score-value">{score}</div>
        </div>
      </header>

      {/* Affichage de l'écran de sélection */}
      {étapeJeu === "sélection" && (
        <div className="selection-screen">
          {/* Trois boutons correspondant à chaque choix */}
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

      {/* Affichage pendant la phase d'attente (chargement du choix de l'ordi) */}
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
              <div className="loading-spinner"></div> {/* Animation de chargement */}
            </div>
          </div>
        </div>
      )}

      {/* Affichage de l'écran de résultat */}
      {étapeJeu === "résultat" && (
        <div className="duel-screen">
          {/* Choix du joueur */}
          <div className="duel-side">
            <h2 className="duel-title">VOUS AVEZ CHOISI</h2>
            <div className={`duel-choice ${choixJoueur} ${résultatJeu === "GAGNÉ" ? "winner" : ""}`}> {/* ? = if/else*/}
              {ICONS[choixJoueur]}
            </div>
          </div>
          
          {/* Résultat affiché au centre */}
          <div className="result-box">
            <h2 className="result-text">
              {résultatJeu === "GAGNÉ" ? "VOUS AVEZ GAGNÉ" : résultatJeu === "PERDU" ? "VOUS AVEZ PERDU" : "ÉGALITÉ"}
            </h2>
            <button className="play-again-btn" onClick={rejouer}>
              REJOUER
            </button>
          </div>
          
          {/* Choix de la maison */}
          <div className="duel-side">
            <h2 className="duel-title">L'ORDINATEUR A CHOISI</h2>
            <div className={`duel-choice ${choixMaison} ${résultatJeu === "PERDU" ? "winner" : ""}`}>
              {ICONS[choixMaison]}
            </div>
          </div>
        </div>
      )}

      {/* Bouton pour afficher ou cacher les règles suivis du modal*/}
      <button className="rules-btn" onClick={() => setAfficherRègles(!afficherRègles)}>
        RÈGLES
      </button>

      {/* modale avec les rules */}
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
