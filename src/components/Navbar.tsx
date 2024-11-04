import React, { useEffect, useRef } from "react";
import { Tab } from "../App";
import styles from "../styles.module.css";
import { tabs } from "../assets/tabs";
import logoPath from "../../src/images/medaillon.png";

interface Props {
  activeTab: Tab | null;
  setActiveTab: (tab: Tab | null) => void;
}

const Navbar = ({ activeTab, setActiveTab }: Props) => {
  const navbarRef = useRef<HTMLDivElement>(null);

  // Detect clicks outside of the navbar to deactivate the tab
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setActiveTab(null); // deactivate the active tab if click is outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveTab]);

  return (
    <div className={styles.navbarContainer} ref={navbarRef}>
      <div className={styles.logoContainer} onClick={()=>setActiveTab(null)}>
        <img className={styles.homeLogo} src={logoPath} alt="Logo" />
      </div>
      <div className={styles.navbar}>
        {tabs.map((tab: Tab, index: number) => (
          <button
            key={index}
            className={styles.navbarIcon}
            onClick={() => setActiveTab(activeTab === tab ? null : tab)}
            // onMouseEnter={() => !activeTab && setActiveTab(tab)}
            // onMouseLeave={() => {
            //   if (activeTab !== tab) setActiveTab(null);
            // }}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
}


export default Navbar;
