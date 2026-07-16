import  { useEffect, useState } from 'react'
import type { data1 } from './main1'
import type { data3 } from './main1'
import type { LivePrices } from './main1'

interface data2 {
  dataFromParent: data1[]
  func2 : (inputData: LivePrices , inputData3 : data3) => void;
}

function PortDashboard({ dataFromParent , func2 }: data2) {
  const [livePrices, setLivePrices] = useState<LivePrices>({});
  const [dis, setDis] = useState<data3>({
    totalInvestment: 0,
    totalPorfoliocvalue: 0,
    profit: 0,
    PercentageProfit: 0,
    ROI: 0
  });

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano&vs_currencies=usd"
        );
        const apiData: LivePrices = await response.json();
        setLivePrices(apiData);
      } catch (error) {
        console.error("Error fetching live prices:", error);
      }
    }
    fetchPrices();
  }, []);

  const getCoinId = (symbol: string): string => {
    const mapping: { [key: string]: string } = {
      btc: "bitcoin",
      eth: "ethereum",
      sol: "solana",
      ada: "cardano"
    };
    return mapping[symbol.toLowerCase()] || "";
  };

  useEffect(() => {
    let calculatedInvestment = 0;
    let calculatedPortfolioValue = 0;

    dataFromParent.forEach((item) => {
      calculatedInvestment += item.coinAmount * item.coinValue;

      const apiName = getCoinId(item.coinType);
      const livePrice = livePrices[apiName]?.usd || item.coinValue; 
      calculatedPortfolioValue += item.coinAmount * livePrice;
    });

    const calculatedProfit = calculatedPortfolioValue - calculatedInvestment;
    const calculatedPercentage = calculatedInvestment > 0 
      ? (calculatedProfit / calculatedInvestment) * 100 
      : 0;

    const updatedDashboardValues = {
      totalInvestment: calculatedInvestment,
      totalPorfoliocvalue: calculatedPortfolioValue,
      profit: calculatedProfit,
      PercentageProfit: calculatedPercentage,
      ROI: calculatedPercentage 
    };

    setDis(updatedDashboardValues);
    func2(livePrices , updatedDashboardValues);

  }, [dataFromParent, livePrices]);

  let topPerformerName = "N/A";
  let topPerformerRoi = 0;

  if (dataFromParent.length > 0) {
    dataFromParent.forEach((item) => {
      const apiName = getCoinId(item.coinType);
      const livePrice = livePrices[apiName]?.usd || item.coinValue;
      const roi = item.coinValue > 0 ? ((livePrice - item.coinValue) / item.coinValue) * 100 : 0;
      
      if (roi > topPerformerRoi || topPerformerName === "N/A") {
        topPerformerRoi = roi;
        topPerformerName = item.coinType;
      }
    });
  }

  const formatDisplayName = (sym: string) => {
    const names: { [key: string]: string } = {
      btc: "Bitcoin",
      eth: "Ethereum",
      sol: "Solana",
      ada: "Cardano"
    };
    return names[sym.toLowerCase()] || sym.toUpperCase();
  };

  const containerStyle = {
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "#ffffff",
    boxSizing: "border-box" as const
  };

  const cardStyle = {
    backgroundColor: "#121318",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #1f2229",
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    boxSizing: "border-box" as const
  };

  const labelStyle = {
    color: "#8a909f",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px"
  };

  const valueStyle = {
    fontSize: "24px",
    fontWeight: "700",
    margin: "2px 0",
    letterSpacing: "-0.5px",
    wordBreak: "break-word" as const
  };

  const positiveGreen = "#10b981";
  const negativeRed = "#f43f5e";

  return (
    <div style={containerStyle}>
      {/* Injected responsive breakpoints for the dashboard cards */}
      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-top: 16px;
          width: 100%;
        }
        @media (max-width: 1200px) {
          .dashboard-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 480px) {
          .dashboard-grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>

      <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 16px 0", letterSpacing: "-0.3px", color: "#f3f4f6" }}>
        Portfolio Dashboard
      </h3>

      <div className="dashboard-grid">
        
        {/* Card 1: Total Portfolio Value */}
        <div style={cardStyle}>
          <span style={labelStyle}>Total Portfolio Value</span>
          <span style={valueStyle}>${dis.totalPorfoliocvalue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          <span style={{ fontSize: "13px", color: dis.profit >= 0 ? positiveGreen : negativeRed, fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
            {dis.profit >= 0 ? "▲" : "▼"} {Math.abs(dis.PercentageProfit).toFixed(1)}%
          </span>
        </div>

        {/* Card 2: Total Investment */}
        <div style={cardStyle}>
          <span style={labelStyle}>Total Investment</span>
          <span style={valueStyle}>${dis.totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          <span style={{ fontSize: "13px", color: "#8a909f", fontWeight: "500" }}>Initial Capital</span>
        </div>

        {/* Card 3: Overall Profit/Loss */}
        <div style={cardStyle}>
          <span style={labelStyle}>Overall Profit/Loss</span>
          <span style={{ ...valueStyle, color: dis.profit >= 0 ? positiveGreen : negativeRed }}>
            {dis.profit >= 0 ? "+" : ""}${dis.profit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <span style={{ fontSize: "13px", color: dis.profit >= 0 ? positiveGreen : negativeRed, fontWeight: "600" }}>
            ({dis.profit >= 0 ? "+" : ""}{dis.PercentageProfit.toFixed(1)}%)
          </span>
        </div>

        {/* Card 4: Top Performer */}
        <div style={cardStyle}>
          <span style={labelStyle}>Top Performer</span>
          <span style={valueStyle}>
            {topPerformerName !== "N/A" ? formatDisplayName(topPerformerName) : "N/A"}
          </span>
          <span style={{ fontSize: "13px", color: topPerformerRoi >= 0 ? positiveGreen : negativeRed, fontWeight: "600" }}>
            {topPerformerName !== "N/A" ? `+${topPerformerRoi.toFixed(1)}%` : "0.0%"}
          </span>
        </div>

      </div>
    </div>
  )
}

export default PortDashboard;