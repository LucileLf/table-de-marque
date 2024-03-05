import React from "react";
import logoPath from "../../src/images/logo.png";
import colors from "../colors.module.css";
import { Team } from "./Home";

interface Props {
  winningTeam: Team;
}

const GameOver = ({ winningTeam }: Props) => {
  return (
    <div style={styles.mainContainer}>
      {/* LOGO */}
      <div style={styles.logoContainer}>
        <img style={styles.logo} src={logoPath} alt="Logo" />
      </div>

      {/* TITLE */}
      <div style={styles.titleContainer}>
        <p style={styles.title}>C'est fini !</p>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    backgroundColor: colors.blue,
    height: "100vh",
    justifyContent: "space-evenly",
    paddingBottom: "10%",
    paddingTop: "10%",
  },
  logoContainer: {
    height: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    border: "1px solid Yellow",
  },
  logo: {
    maxHeight: "100%",
  },
  titleContainer: {
    height: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
    border: "1px solid green",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 100,
    fontFamily: "Cochin",
    //textAlign: 'center',
  },
};

export default GameOver;
