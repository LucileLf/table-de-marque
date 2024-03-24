import React from "react";
import logoPath from "../../src/images/logo.png";
import colors from "../colors.module.css";
import { Team } from "../types";
import styles from "../styles.module.css";
import { useGameState } from "../providers/GameStateProvider";


interface Props {
  winningTeam: Team | null;
}


const GameOver = ({ winningTeam }: Props) => {
  const { clearGame } = useGameState()

  const handleClick = () => {
    clearGame();
  }
  return (
    <div className={styles.gameOverMainContainer}>
      {/* TITLE */}
      <div className={styles.winnerContainer}>
        <p className={styles.winner}>C'est fini !</p>
        <p className={styles.winner}>{winningTeam ? `Bravo ${winningTeam.name} !!!` : 'Egalité !'}</p>
      </div>
      {/* LOGO */}
      <div className={styles.gameOverLogoContainer}>
        <img className={styles.gameOverLogo} src={logoPath} alt="Logo" />
        <button className={styles.newGameBtn} onClick={() => handleClick()} style={{color: 'white', fontWeight: 'bold'}}>NOUVELLE PARTIE</button>
      </div>
    </div>
  );
};

// const styles = {
  // mainContainer: {
  //   backgroundColor: colors.blue,
  //   height: "100vh",
  //   justifyContent: "space-evenly",
  //   paddingBottom: "10%",
  //   paddingTop: "10%",
  // },
//   logoContainer: {
//     height: "60%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: colors.blue,
//     border: "1px solid Yellow",
//   },
//   logo: {
//     maxHeight: "100%",
//   },
//   titleContainer: {
//     height: "20%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: colors.blue,
//     border: "1px solid green",
//   },
//   title: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 100,
//     fontFamily: "Cochin",
//     //textAlign: 'center',
//   },
// };

export default GameOver;
