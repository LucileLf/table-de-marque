import React from "react";
import { Tab } from "../App";
import Colors from "../../constants/Colors";
import styles from "../styles.module.css";

interface Props {
  activeTab: Tab | null;
}

export default function TabContent({ activeTab }: Props) {
  const logoStyle = [
    "logo",
    activeTab?.title === "break" ? styles.rotatedLogo : null,
  ].join(" ");

  return (
    <div className={styles.tabContentContainer}>
      <div className={styles.zzzContainer}>
        {activeTab?.title === "break" && <p className={styles.zzz}>Zzz...</p>}
      </div>
      <div className="logoContainer">
        <img
          className={logoStyle}
          src={`../../src/images/${activeTab?.imageTitle}.webp`}
          alt={activeTab?.title}
        />
        {/* <p className="getStartedText">Open up the code for this screen:</p> */}
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.title}>{activeTab?.title}</p>
      </div>
    </div>
  );
}
