import { useState } from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import TabContent from './components/TabContent'


export interface Tab {
  ref: string, 
  title: string,
  imageTitle: string
}

export function App() {

  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  return(
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab}/>
      <Home/>
      {/* <TabContent activeTab={activeTab}></TabContent> */}
      {/* {activeTab ? (
      <TabContent activeTab={activeTab}></TabContent>
      ) : <Home/>} */}
    </>
  )
};

//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

export default App
