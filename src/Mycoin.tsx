import type { LivePrices } from './main1'
import type { data1, data3 } from './main1'

interface data4 {
  holdings: data1[];          
  dataFromParent2: LivePrices;
  dataFromParent3?: data3;
}

function Mycoin({ holdings, dataFromParent2 }: data4) {

  const getCoinId = (symbol: string): string => {
    const mapping: { [key: string]: string } = {
      btc: "bitcoin",
      eth: "ethereum",
      sol: "solana",
      ada: "cardano"
    };
    return mapping[symbol.toLowerCase()] || "";
  };

  const getCoinName = (symbol: string): string => {
    const names: { [key: string]: string } = {
      btc: "Bitcoin",
      eth: "Ethereum",
      sol: "Solana",
      ada: "Cardano"
    };
    return names[symbol.toLowerCase()] || symbol.toUpperCase();
  };

  const getCoinLogo = (symbol: string): string => {
    return `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${symbol.toLowerCase()}.png`;
  };

  const containerStyle = {
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "white"
  };

  const positiveGreen = "#10b981";
  const negativeRed = "#f43f5e";

  return (
    <div style={containerStyle}>
      {/* Dynamic Mobile CSS inject */}
      <style>{`
        /* Header responsiveness */
        .mycoin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 12px;
        }
        .mycoin-search {
          background-color: #121318;
          border: 1px solid #1f2229;
          border-radius: 8px;
          padding: 8px 16px;
          color: white;
          outline: none;
          font-size: 13px;
          width: 100%;
          max-width: 200px;
        }

        /* Responsive Row list */
        .mycoin-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mycoin-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          align-items: center;
          background-color: #121318;
          padding: 14px 20px;
          border-radius: 12px;
          border: 1px solid #1f2229;
          border-left: 4px solid #3b82f6;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
          gap: 8px;
        }

        .coin-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* --- MOBILE MEDIA QUERY --- */
        @media (max-width: 600px) {
          .mycoin-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .mycoin-search {
            max-width: 100%;
          }
          /* Switch from rigid grid to vertical stacking on tiny screens */
          .mycoin-row {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            gap: 12px;
            padding: 16px;
          }
          /* Span brand full width */
          .coin-brand {
            grid-column: span 2;
          }
          .coin-amount {
            font-size: 14px !important;
          }
          .coin-value {
            font-size: 14px !important;
            text-align: right;
          }
          .coin-profit {
            grid-column: span 2;
            text-align: left !important;
            border-top: 1px solid #1f2229;
            padding-top: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .coin-profit-lbl {
            margin-bottom: 0 !important;
          }
        }
      `}</style>

      {/* Header with Search Bar */}
      <div className="mycoin-header">
        <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0, color: "#f3f4f6" }}>Your Coins</h3>
        <input 
          type="text" 
          placeholder="Filter coins..." 
          className="mycoin-search"
          disabled 
        />
      </div>

      {holdings.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#8a909f", border: "1px dashed #1f2229", borderRadius: "12px" }}>
          No coins added to your portfolio yet.
        </div>
      ) : (
        <div className="mycoin-list">
          {holdings.map((item, index) => {
            const apiName = getCoinId(item.coinType);
            const livePrice = dataFromParent2[apiName]?.usd || item.coinValue;
            
            const currentTotalValue = item.coinAmount * livePrice;
            const priceChangePercent = item.coinValue > 0 
              ? ((livePrice - item.coinValue) / item.coinValue) * 100 
              : 0;

            const isPositive = priceChangePercent >= 0;

            return (
              <div key={index} className="mycoin-row">
                
                {/* Column 1: Asset Brand */}
                <div className="coin-brand">
                  <img 
                    src={getCoinLogo(item.coinType)} 
                    alt={item.coinType} 
                    style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1px solid #1f2229" }}
                    onError={(e) => {
                      e.currentTarget.src = "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/generic.png";
                    }}
                  />
                  <div>
                    <span style={{ fontWeight: "700", display: "block", fontSize: "15px" }}>{item.coinType.toUpperCase()}</span>
                    <span style={{ fontSize: "11px", color: "#8a909f", fontWeight: "500" }}>{getCoinName(item.coinType)}</span>
                  </div>
                </div>

                {/* Column 2: Holding Scale */}
                <div className="coin-amount" style={{ fontWeight: "600", fontSize: "15px", color: "#e5e7eb" }}>
                  {item.coinAmount.toLocaleString(undefined, { maximumFractionDigits: 8 })}
                </div>

                {/* Column 3: Asset Value */}
                <div className="coin-value" style={{ fontWeight: "700", fontSize: "16px", color: "#f3f4f6" }}>
                  ${currentTotalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                {/* Column 4: Percent Metrics */}
                <div className="coin-profit" style={{ textAlign: "right" }}>
                  <span className="coin-profit-lbl" style={{ fontSize: "11px", color: "#8a909f", display: "block", marginBottom: "2px", fontWeight: "500" }}>
                    Real time profit/Loss
                  </span>
                  <span style={{ 
                    color: isPositive ? positiveGreen : negativeRed, 
                    fontWeight: "700",
                    fontSize: "14px" 
                  }}>
                    {isPositive ? "+" : ""}{priceChangePercent.toFixed(1)}%
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default Mycoin;