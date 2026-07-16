import Port from "./Port";
import PortDashboard from "./PortDashboard";
import Mycoin from "./Mycoin";
import type { data1 ,data3, LivePrices} from "./main1";
import { useState } from "react";

function App() {
  const [val, setVal] = useState<data1[]>([]);
  const [dash, setdash] = useState<data3>({
    totalInvestment: 0,
    totalPorfoliocvalue: 0,
    profit: 0,
    PercentageProfit: 0,
    ROI: 0
  });

  const [live, setlive] = useState<LivePrices>({});

  function handleInput(inputData: data1) {
    setVal([...val, inputData]);
  }

  function handleInput2(inputData: LivePrices, inputData3: data3) {
    setlive(inputData);
    setdash(inputData3);
  }

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background-color: #060709;
        }
        /* Sleek custom scrollbars for that premium native app feel */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0b0d;
        }
        ::-webkit-scrollbar-thumb {
          background: #23262f;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #353945;
        }
        @media (max-width: 960px) {
          .app-container {
            flex-direction: column !important;
            height: auto !important;
            overflow-y: auto !important;
          }
          .sidebar-panel {
            width: 100% !important;
            height: auto !important;
          }
          .content-panel {
            width: 100% !important;
          }
        }
      `}</style>
      <div 
        className="app-container"
        style={{ 
          display: "flex", 
          flexDirection: "row", 
          justifyContent: "space-between", 
          width: "100vw", 
          height: "100vh",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          backgroundColor: "#060709",
          overflow: "hidden"
        }}
      >
        {/* Sidebar Panel Container */}
        <div 
          className="sidebar-panel"
          style={{ 
            width: "25%", 
            backgroundColor: "#0d0e12", 
            color: "white",
            padding: "24px",
            boxShadow: "1px 0 0px rgba(255,255,255,0.05)",
            boxSizing: "border-box",
            borderRight: "1px solid #1f2229",
            height: "100%"
          }}
        >
          <Port func1={handleInput}/>
        </div>

        {/* Main Content Area */}
        <div 
          className="content-panel"
          style={{ 
            width: "75%", 
            backgroundColor: "#060709", 
            color: "white",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          <div style={{ background: "#0d0e12", padding: "24px", borderRadius: "16px", border: "1px solid #1f2229" }}>
            <PortDashboard dataFromParent={val} func2={handleInput2} />
          </div>
          <div style={{ background: "#0d0e12", padding: "24px", borderRadius: "16px", border: "1px solid #1f2229" }}>
            <Mycoin 
              holdings={val}          
              dataFromParent2={live} 
              dataFromParent3={dash} 
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;