import React, { useState, useEffect } from 'react';
import { FaFontAwesome } from 'react-icons/fa'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import styles from '../styles.module.css';
import logoPath from '../../public/images/logo.png'
import playIconPath from '../../public/images/play_icon.png';
import pauseIconPath from '../../public/images/pause_icon.png';
import penaltyYes from '../../public/images/penalty-red.png';
import penaltyNo from '../../public/images/penalty-dark.png';
import GameOver from './GameOver'
import Colors from '../../constants/Colors';

export interface Team {
  name: string;
  score: number;
  penalties: boolean[];
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(50 * 60); // 50 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  const [team1, setTeam1] = useState<Team>({
    name: '',
    score: 0,
    penalties: [false, false, false]
  });

  const [team2, setTeam2] = useState<Team>({
    name: '',
    score: 0,
    penalties: [false, false, false]
  });

  const [gameIsOver, setGameIsOver] = useState(false);

  useEffect(() => {
    if (time > 0 && isRunning) {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (time === 0) {
      setGameIsOver(true);
    }
  }, [time, isRunning]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const totalTimeInSeconds = minutes * 60 + seconds;

    if (totalTimeInSeconds === 0) {
      return <GameOver winningTeam={team1} />;
    } else if (totalTimeInSeconds > 30) {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    } else {
      return "...";
    }
  };

  const toggleTimer = () => {
    setIsRunning(prevState => !prevState);
  };

  const updateScore = (team: Team, action: string) => {
    let newScore = team.score;
    if (action === 'increase') {
      newScore = ++team.score;
    } else if (action === 'decrease') {
      newScore = --team.score;
    }
    if (team === team1) {
      setTeam1({ ...team1, score: newScore });
    } else if (team === team2) {
      setTeam2({ ...team2, score: newScore });
    }
  };

  const handleImageClick = (team: Team, logoIndex: number) => {
    if (team === team1) {
      const newPenalties = team1.penalties.map((penalty, index) =>
        index === logoIndex ? !penalty : penalty
      );
      const allTrue = newPenalties.every(penalty => penalty === true);
      if (allTrue) {
        const finalPenalties = newPenalties.map(() => false);
        setTeam1({ ...team1, penalties: finalPenalties });
        updateScore(team2, 'increase');
      } else {
        setTeam1({ ...team1, penalties: newPenalties });
      }
    } else if (team === team2) {
      const newPenalties = team2.penalties.map((penalty, index) =>
        index === logoIndex ? !penalty : penalty
      );
      const allTrue = newPenalties.every(penalty => penalty === true);
      if (allTrue) {
        const finalPenalties = newPenalties.map(() => false);
        setTeam2({ ...team2, penalties: finalPenalties });
        updateScore(team1, 'increase');
      } else {
        setTeam2({ ...team2, penalties: newPenalties });
      }
    }
  };

  const renderPenaltyLogos = (team: Team) => {
    const teamPenalties = team.penalties;
    return teamPenalties.map((isPenalty, index) => (
      <button key={index} className={styles.penaltyButton} onClick={() => handleImageClick(team, index)}>
        <img
          className={styles.penaltyLogo}
          src={isPenalty ? penaltyYes : penaltyNo}
          alt=""
        />
      </button>
    ));
  };

  return (
    <div className={styles.mainContainer}>

      {/* LOGO */}
      <div className={styles.logoContainer}>
        <img
          className={styles.logo}
          src={logoPath}
          alt="Logo"
        />
      </div>

      {/* TITLE */}
      <div className={styles.titleContainer}>
        <input
          className={styles.title}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={placeholderVisible ? "Titre de l'impro" : ''}
          onFocus={() => setPlaceholderVisible(false)}
          onBlur={() => {
            if (!title) {
              setPlaceholderVisible(true);
            }
          }}
        />
      </div>

      {/* BOTTOMCONTAINER BEGIN */}
      <div className={styles.bottomContainer}>

        {/* TEAM1 SCORE + PENALTIES */}
        <div className={styles.scoreContainer}>

          <div className={styles.penaltyContainer}>
            {renderPenaltyLogos(team1)}
          </div>

          {/* <div className={styles.pointsContainer}> */}
            <div className={styles.score}>
              <button onClick={() => updateScore(team1, 'increase')} className={styles.arrowButton}>
                {/* <FaFontAwesome name="chevron-up" size={24} color={Colors.blue} /> */}
                <FaChevronUp size={"33%"} color={Colors.blue}/>
              </button>
              <p className={styles.scoreText}>{team1.score}</p>
              <button onClick={() => updateScore(team1, 'decrease')} className={styles.arrowButton}>
                <FaChevronDown size={"33%"} color={Colors.blue}/>
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
          <p className={styles.time}>{formatTime()}</p>
        </div>

        {/* TEAM2 SCORE + PENALTIES */}
        <div className={styles.scoreContainer}>

          {/* <div className={styles.pointsContainer}> */}
            <div className={styles.score}>
              <button onClick={() => updateScore(team2, 'increase')} className={styles.arrowButton}>
                <FaChevronUp size={"33%"} color={Colors.blue}/>
              </button>
              <p className={styles.scoreText}>{team2.score}</p>
              <button onClick={() => updateScore(team2, 'decrease')} className={styles.arrowButton}>
                <FaChevronDown size={"33%"} color={Colors.blue}/>
              </button>
            </div>
          {/* </div> */}

          <div className={styles.penaltyContainer}>
            {renderPenaltyLogos(team2)}
          </div>

        </div>
      </div>
      {/* BOTTOMCONTAINER END */}

      {/* TEAMNAMES CONTAINER BEGIN */}
      <div className={styles.teamNamesContainer}>
        <input
          className={styles.teamName1}
          type="text"
          value={team1.name}
          onChange={(e) => setTeam1({ ...team1, name: e.target.value })}
          placeholder={placeholderVisible ? "Equipe 1" : ''}
          onFocus={() => setPlaceholderVisible(false)}
          onBlur={() => {
            if (!team1.name) {
              setPlaceholderVisible(true);
            }
          }}
        />
        {/* <div className={styles.teamsNamesMargin}></div> */}

        <input
          className={styles.teamName2}
          type="text"
          value={team2.name}
          onChange={(e) => setTeam2({ ...team2, name: e.target.value })}
          placeholder={placeholderVisible ? "Equipe 2" : ''}
          onFocus={() => setPlaceholderVisible(false)}
          onBlur={() => {
            if (!team2.name) {
              setPlaceholderVisible(true);
            }
          }}
        />
      </div>
      {/* TEAMNAMES CONTAINER END */}

    </div>
  );
}
