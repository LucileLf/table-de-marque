import React from 'react';
import { Tab } from '../App'
import styles from '../styles.module.css';
import {tabs} from '../assets/tabs';

// const tab1: Tab = {
//   ref: 'home',
//   title: 'Attention... on joue bientôt !',
//   imageTitle: 'attention'
// };
// const tab2: Tab = {
//   ref: 'hymnes',
//   title: 'Hymnes',
//   imageTitle: 'hymns'
// };
// const tab3: Tab = {
//   ref: 'caucus',
//   title: 'Caucus...',
//   imageTitle: 'caucus'
// };
// const tab4: Tab = {
//   ref: 'break',
//   title: 'Entracte...',
//   imageTitle: 'break'
// };
// const tab5: Tab = {
//   ref: 'votes',
//   title: 'A vos votes !',
//   imageTitle: 'votes'
// };

// const tab6: Tab = {
//   ref: 'penalty',
//   title: 'Pénalité !',
//   imageTitle: 'penalty'
// };
// const tab7: Tab = {
//   ref: 'exclusion',
//   title: 'Expulsion !',
//   imageTitle: 'exclusion'
// };

// const tab8: Tab = {
//   ref: 'fusillade',
//   title: 'Fusillade !',
//   imageTitle: 'fusillade'
// };
// const tab9: Tab = {
//   ref: 'podium',
//   title: 'Podium',
//   imageTitle: 'podium'
// };

interface Props {
  activeTab: Tab | null;
  setActiveTab: (tab: Tab | null) => void;
}


const Navbar = ({ activeTab, setActiveTab }: Props) => {
    //const tabs = [tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8, tab9];
    console.log(activeTab);
    
    return (
      <div className={styles.navbar}>
        {tabs.map((tab: Tab, index: number) => (
          <button
            key={index}
            className={styles.navbarIcon}
            onClick={() => setActiveTab(tab)}
            onMouseEnter={() => setActiveTab(tab)}
            onMouseLeave={() => setActiveTab(null)}
          >
            {tab.title}
          </button>
        ))}
      </div>
    );
  };
  
  export default Navbar;