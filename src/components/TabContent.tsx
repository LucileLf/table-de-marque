import React from "react";
import { Tab } from "../App";
import styles from "../styles.module.css";
import images from "../../src/images/images";

interface Props {
  activeTab: Tab | null;
}


export default function TabContent({ activeTab }: Props) {
  if (!activeTab) {
    return null; // Return null if activeTab is null
  }
  // const logoStyle = [
  //   "logo",
  //   activeTab.title === "break" ? styles.rotatedLogo : null,
  // ].join(" ");

  return (
    <div className={styles.tabContentContainer}>
      {/* <div className={styles.zzzContainer}>
        {activeTab.ref === "break" && <p className={styles.zzz}>Zzz...</p>}

      </div> */}
      <div className={styles.TabContentLogoContainer}>
        <img
          className={styles.TabContentLogo}
          src={images[activeTab.imageTitle]}
          alt={activeTab.title}
        />
        {/* <p className="getStartedText">Open up the code for this screen:</p> */}
      </div>
      <div className={styles.TabContentTitleContainer}>
        <p className={styles.TabContentTitle}>{activeTab?.title}</p>
      </div>
    </div>
  );
}
