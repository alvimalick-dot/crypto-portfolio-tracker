import React from 'react'
import { useState } from 'react'
import type { data1 } from './main1';

interface PortProps {
  func1 : (inputData: data1) => void;
}

function Port( {func1 } : PortProps) {
    const [data, setData] = useState<data1>(
        {
            coinType : "",
            coinAmount : 0,
            coinValue : 0
        }
    )
  
    const [emp] = useState<data1>({
        coinType : "",
        coinAmount : 0,
        coinValue : 0
    })

    function handleClick(){
        if (!data.coinType) {
            alert("Please select a coin first!");
            return;
        }
        func1(data)
        setData(emp);
    }

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>){
        setData({ ...data, coinType: e.target.value })
    }

    const inputStyle = {
        width: "100%",
        padding: "12px 14px",
        borderRadius: "8px",
        border: "1px solid #1f2229",
        backgroundColor: "#121318",
        color: "white",
        fontSize: "14px",
        marginTop: "6px",
        boxSizing: "border-box" as const,
        outline: "none",
        transition: "border-color 0.15s, box-shadow 0.15s"
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", boxSizing: "border-box" }}>
                <div>
                    <h3 style={{ margin: "0 0 24px 0", fontSize: "18px", fontWeight: "600", letterSpacing: "-0.3px", borderBottom: "1px solid #1f2229", paddingBottom: "16px", color: "#f3f4f6" }}>
                        Add to Portfolio
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                            <h4 style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#8a909f", fontWeight: "600", textTransform: "uppercase" }}>Select a coin</h4>
                            <select 
                                id="crypto-select" 
                                value={data.coinType} 
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="">Select Coin...</option>
                                <option value="btc">Bitcoin (BTC)</option>
                                <option value="eth">Ethereum (ETH)</option>
                                <option value="sol">Solana (SOL)</option>
                                <option value="ada">Cardano (ADA)</option>
                            </select>
                        </div>

                        <div>
                            <h4 style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#8a909f", fontWeight: "600", textTransform: "uppercase" }}>Amount owned</h4>
                            <input 
                                type="number" 
                                value={data.coinAmount || ""}  
                                onChange={(e)=> setData({ ...data, coinAmount : parseFloat(e.target.value) || 0 })}
                                style={inputStyle}
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <h4 style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#8a909f", fontWeight: "600", textTransform: "uppercase" }}>Average Buy-In price</h4>
                            <input 
                                type="number" 
                                value={data.coinValue || ""} 
                                onChange={(e)=> setData({ ...data, coinValue : parseFloat(e.target.value) || 0 })}
                                style={inputStyle}
                                placeholder="$0.00"
                            />
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "32px" }}>
                    <button 
                        onClick={handleClick}
                        style={{
                          width: "100%",
                          padding: "14px",
                          borderRadius: "8px",
                          border: "none",
                          backgroundColor: "#2563eb",
                          color: "white",
                          fontWeight: "600",
                          fontSize: "14px",
                          cursor: "pointer",
                          transition: "background-color 0.2s, transform 0.1s",
                          boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)"
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                    >
                        Add to portfolio
                    </button>
                </div>
            </div>
        </>
    )
}

export default Port;