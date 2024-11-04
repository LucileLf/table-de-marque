//GET ELEMENTS FROM GAMESTATE!
import React, { useState, useEffect } from "react";
import { FaFontAwesome } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import styles from "../styles.module.css";
import playIconPath from "../../src/images/play_icon.png";
import pauseIconPath from "../../src/images/pause_icon.png";
import penaltyYes from "../../src/images/penalty-red.png";
import penaltyNo from "../../src/images/penalty-dark.png";
import GameOver from "./GameOver";
import Colors from "../../constants/Colors";
import { GameInfo, GameState, Team } from "../types";
import { useGameState } from "../providers/GameStateProvider";

// interface GameTrackerProps {
//   gameState: GameState;
//   setGameState: (updateFn: (currentState: GameState) => GameState) => void;
//   clearGame: () => void;
// }

export default function GameTracker() {
  const {
    gameState,
    clearGame,
    updateScore,
    updatePenalty,
    setTitle,
    setTeamName,
    endGame,
  } = useGameState();

  console.log("hello from gametracker");
  console.log(gameState);

  useEffect(() => {
    console.log("GameTracker mounted");
    return () => {
      console.log("GameTracker will unmount");
    };
  }, []);

  const [time, setTime] = useState(50 * 60); // 50 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState<string | null>("50");
  const [inputSeconds, setInputSeconds] = useState<string | null>("00");

  // const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [placeholdersVisible, setPlaceholdersVisible] = useState({
    title: true,
    team1: true,
    team2: true,
  });
  // console.log('game state from app', gameState);

  type PlaceholderKeys = "title" | "team1" | "team2";

  const handleInputFocus = (inputType: PlaceholderKeys) => {
    console.log("hello handleInputFocus");
    console.log("is placeholder visible?", placeholdersVisible[inputType]);
    setPlaceholdersVisible((prevState) => ({
      ...prevState,
      [inputType]: false,
    }));
    console.log("is placeholder visible?", placeholdersVisible[inputType]);
  };

  const handleInputBlur = (inputType: PlaceholderKeys) => {
    // if (!title) {
    setPlaceholdersVisible((prevState) => ({
      ...prevState,
      [inputType]: false,
    }));
    // }
  };

  const [gameIsOver, setGameIsOver] = useState(false);

  useEffect(() => {
    if (time < 30) {
      // Hide time when under 30 seconds
      setInputMinutes(null);
      setInputSeconds(null);
    } else {
      // Update inputs with formatted time
      const minutes = String(Math.floor(time / 60)).padStart(2, "0");
      const seconds = String(time % 60).padStart(2, "0");
      setInputMinutes(minutes);
      setInputSeconds(seconds);
    }
  }, [time]);

  //COUNTDOWN
  useEffect(() => {
    if (time > 0 && isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (time === 0) {
      setIsRunning(false);
      endGame();
    }
  }, [time, isRunning, endGame]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const totalTimeInSeconds = minutes * 60 + seconds;
    if (totalTimeInSeconds === 0) {
      const winningTeam = endGame();
      // return <GameOver winningTeam={winningTeam} />
    } else if (totalTimeInSeconds > 30) {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      return "...";
    }
  };

  const setCustomTime = () => {
    const totalSeconds = (parseInt(inputMinutes || "0", 10) * 60) + (parseInt(inputSeconds || "0", 10));
    setTime(totalSeconds);
  };

  const toggleTimer = () => {
    if (!isRunning) {
      // Set the timer to the input values if the timer is not running
      setCustomTime();
    }
    setIsRunning((prevState) => !prevState);
  };

  const renderPenaltyLogos = (team: Team, teamIndex: number) => {
    return team.penalties.map((isPenalty, penaltyIndex) => (
      <button
        key={`${teamIndex}-${penaltyIndex}-${isPenalty}`}
        className={styles.penaltyButton}
        onClick={() => updatePenalty(teamIndex, penaltyIndex)} // Ensure correct indices are passed
      >
        <img
          className={styles.penaltyLogo}
          src={isPenalty ? penaltyYes : penaltyNo}
          alt="Penalty Status"
        />
      </button>
    ));
  };

  const handleClick = (gameState: GameState) => {
    endGame();
    console.log("winning teams is ", gameState.winningTeam);
  };

  return (
    <div className={styles.mainContainer}>
      {" "}
      {/* 90vh */}
      {/* LOGO */}
      {/* <div className={styles.logoContainer}>
        <img className={styles.homeLogo} src={logoPath} alt="Logo" />
        <button onClick={() => handleClick(gameState)} style={{color: 'red'}}>TERMINER LA PARTIE</button>
      </div> */}
      {/* TITLE */}
      <div className={styles.titleContainer}>
        {" "}
        {/* 10% */}
        {/* <h1 className={styles.title}>{gameState.gameName}</h1> */}
        <input
          className={styles.title}
          type="text"
          // value={gameState.gameName}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={placeholdersVisible.title ? gameState.gameName : ""}
          onFocus={() => handleInputFocus("title")}
          onBlur={() => handleInputBlur("title")}
        />
      </div>
      {/* BOTTOMCONTAINER BEGIN */}
      <div className={styles.bottomContainer}>
        {" "}
        {/* 35% */}
        {/* TEAM1 SCORE + PENALTIES */}
        <div className={styles.scoreContainer}>
          <div className={styles.penaltyContainer}>
            {renderPenaltyLogos(gameState.teams[0], 0)}
          </div>

          {/* <div className={styles.pointsContainer}> */}
          <div className={styles.score}>
            <button
              onClick={() => updateScore(0, "increase")}
              className={styles.arrowButton}
            >
              {/* <FaFontAwesome name="chevron-up" size={24} color={Colors.blue} /> */}
              <FaChevronUp size={"33%"} color={Colors.blue} />
            </button>
            <p className={styles.scoreText}>{gameState.teams[0].score}</p>
            <button
              onClick={() => updateScore(0, "decrease")}
              className={styles.arrowButton}
            >
              <FaChevronDown size={"33%"} color={Colors.blue} />
            </button>
          </div>

          {/* </div> */}
        </div>
        {/* TIMER */}
        <div className={styles.timeContainer}>
          <button onClick={toggleTimer} className={styles.playIconContainer}>
            <img
              src={isRunning ? pauseIconPath : playIconPath}
              className={styles.playIcon}
              alt=""
            />
          </button>

          <div className={styles.countDownContainer}>
            <input
              type="number"
              min="0"
              value={inputMinutes !== null ? inputMinutes : ""}
              onChange={(e) =>
                setInputMinutes(e.target.value === "" ? "00" : String(parseInt(e.target.value, 10)).padStart(2, "0"))
              }
              placeholder={isRunning ? "..." : "00"}
              className={styles.time}
            />

            <span className={styles.colon}>{(isRunning && (time < 30)) ? "" : ":"}</span>
            <input
              type="number"
              min="0"
              max="59"
              value={inputSeconds !== null ? inputSeconds : ""}
              onChange={(e) =>
                setInputSeconds(e.target.value === "" ? "00" : String(parseInt(e.target.value, 10)).padStart(2, "0"))
              }
              placeholder={isRunning ? "" : "00"}
              className={(isRunning && (time < 30)) ? styles.displayNone : styles.time}
            />
          </div>
          {/* <button onClick={setCustomTime} className={styles.setButton}>
            Set Time
          </button> */}

        </div>
        {/* TEAM2 SCORE + PENALTIES */}
        <div className={styles.scoreContainer} id={styles.scoreContainerTeam2}>
          {/* <div className={styles.pointsContainer}> */}
          <div className={styles.score}>
            <button
              onClick={() => updateScore(1, "increase")}
              className={styles.arrowButton}
            >
              <FaChevronUp size={"33%"} color={Colors.blue} />
            </button>
            <p className={styles.scoreText}>{gameState.teams[1].score}</p>
            <button
              onClick={() => updateScore(1, "decrease")}
              className={styles.arrowButton}
            >
              <FaChevronDown size={"33%"} color={Colors.blue} />
            </button>
          </div>
          {/* </div> */}

          <div className={styles.penaltyContainer}>
            {renderPenaltyLogos(gameState.teams[1], 1)}
          </div>
        </div>
      </div>
      {/* BOTTOMCONTAINER END */}
      <div className={styles.timeContainerMobile}>
        <button
          onClick={toggleTimer}
          className={styles.playIconContainerMobile}
        >
          <img
            src={isRunning ? pauseIconPath : playIconPath}
            className={styles.playIconMobile}
            alt=""
          />
        </button>
        <p className={styles.timeMobile}>{formatTime()}</p>
      </div>
      {/* TEAMNAMES CONTAINER BEGIN */}
      <div className={styles.teamNamesContainer}>
        {" "}
        {/* 15% */}
        {gameState.teams.map((team, index) => (
          // return <h3 key={team.name} className={styles.teamName1}>{team.name}</h3>
          <input
            key={index}
            className={styles.teamName}
            type="text"
            value={team.name}
            onChange={(e) => setTeamName(team, e.target.value)}
            placeholder={placeholdersVisible.team1 ? "Equipe 1" : ""}
            onFocus={() => handleInputFocus("team1")}
            onBlur={() => handleInputBlur("team1")}
          />
        ))}
        {/*
        // ALLOW TEAM NAMES CHANGES??
        <input
          className={styles.teamName1}
          type="text"
          value={team1.name}
          onChange={(e) => setTeam1({ ...team1, name: e.target.value })}
          placeholder={placeholdersVisible.team1 ? "Equipe 1" : ""}
          onFocus={() => handleInputFocus("team1")}
          onBlur={() => handleInputBlur("team1")}
        />
        <div className={styles.teamsNamesMargin}></div>
        <input
          className={styles.teamName2}
          type="text"
          value={team2.name}
          onChange={(e) => setTeam2({ ...team2, name: e.target.value })}
          placeholder={placeholdersVisible.team2 ? "Equipe 2" : ""}
          onFocus={() => handleInputFocus("team2")}
          onBlur={() => handleInputBlur("team2")}
        />
        */}
      </div>
      <div className={styles.endGameButtonContainer}>        {/* 5vh */}
        <button onClick={() => handleClick(gameState)} style={{ color: "white" , backgroundColor: "gray" }}>
          TERMINER LA PARTIE
        </button>
      </div>
      {/* TEAMNAMES CONTAINER END */}
    </div>
  );
}
