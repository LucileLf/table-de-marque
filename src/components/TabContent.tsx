import React from 'react';
import { Tab } from '../App';
import Colors from '../../constants/Colors';
import styles from './styles.module.css';

interface Props {
  activeTab: Tab;
}


export default function TabContent( {activeTab}: Props ) {
  const logoStyle = [
    'logo',
    (activeTab.title === 'Entracte...') ? 'rotatedLogo' : null,
  ].join(' ');

  return (
    <div className={styles.mainContainer}>
      <div className="zzzContainer">
        {/* <p className="zzz">Zzz...</p> */}
      </div>
      <div className="logoContainer">
        <img
          className={logoStyle}
          src={`../../public/images/${activeTab.imageTitle}.webp`}
          alt={activeTab.title}
        />
        {/* <p className="getStartedText">Open up the code for this screen:</p> */}
      </div>
      <div className="titleContainer">
        <p className="title">{activeTab.title}</p>
      </div>
    </div>
  );
}