# Crypto Portfolio Tracker

A sleek, responsive, and real-time cryptocurrency portfolio tracker built using **React**, **TypeScript**, and **Vite**. This application allows users to log their digital asset holdings, tracks their initial investments, fetches live coin prices, and provides key financial metrics including total value, overall profit/loss, and identifying the top-performing asset.

---

## 🚀 Live Demo & Key Features

* **Real-time Price Tracking:** Automatically pulls live prices for Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and Cardano (ADA) via the CoinGecko API.
* **Comprehensive Financial Dashboard:**
    * **Total Portfolio Value:** Calculates current holdings valuation utilizing real-time API rates.
    * **Total Investment:** Displays initial capital input.
    * **Overall Profit/Loss:** Showcases net profit/loss with intuitive, color-coded indicators (green/red).
    * **Top Performer:** Pinpoints which asset in your portfolio has generated the highest return on investment (ROI).
* **Asset Management:** Add custom holding allocations including specific coin amounts and unique average buy-in prices.
* **Fully Responsive Native Feel:** Optimized layouts ranging from multi-column desktop setups to vertical stacking for mobile screens, equipped with premium custom dark-mode scrollbars.

---

## 🛠️ Tech Stack

* **Frontend Library:** React (TypeScript)
* **Styles:** Clean inline-CSS coupled with dynamic, responsive media-query CSS injections
* **API Integration:** CoinGecko API (`/simple/price`)
* **Build Tool:** Vite

---

## ⚙️ How It Works (System Architecture & Data Flow)

The application utilizes a **centralized state architecture** located in `App.tsx` which manages and synchronizes state between three core child components:

### 1. Data Flow Diagram


          +--------------------------+
          |         App.tsx          |
          | (Holds State: val, dash) |
          +------------+-------------+
                       |
        +--------------+--------------+
        |                             |
        v                             v
 +------------+               +---------------+
 |  Port.tsx  |               | PortDashboard |
 | (Add Coin) |               |  (Fetch API)  |
 +-----+------+               +-------+-------+
       |                              |
       | Passes New Holding           | Passes Live Prices
       | via handleInput()            | & Updated Dashboard
       v                              v
[State Updated] -------------->  [State Updated]
                                      |
                                      | Passes holdings,
                                      | live prices & metrics
                                      v
                               +--------------+
                               |  Mycoin.tsx  |
                               | (Asset List) |
                               +--------------+
| live prices & metrics
                                      v
                               +--------------+
                               |  Mycoin.tsx  |
                               | (Asset List) |
                               +--------------+

### 2. Component Breakdowns

#### 🧬 `App.tsx` (The Brain)
Acts as the global state orchestrator. It holds:
* `val`: An array of asset holdings (`data1[]`).
* `dash`: Core dashboard metrics (`data3`).
* `live`: Live currency prices (`LivePrices`).

It defines the state modifiers (`handleInput` and `handleInput2`) which are passed down to child components to keep the user interface in perfect sync.

#### 📥 `Port.tsx` (Data Entry)
A clean sidebar panel that allows you to log a transaction. 
* Takes user inputs: Selected Coin, Amount Owned, and Average Buy-In Price.
* Performs structural checks (e.g., verifying a coin is selected) and triggers the parent's `func1` wrapper, instantly feeding the data up to the global holdings array before clearing its local fields for the next transaction.

#### 📊 `PortDashboard.tsx` (Calculations & API Fetching)
The analytical hub of the app.
* **API Engine:** Upon mounting, a `useEffect` hook makes an asynchronous fetch call to CoinGecko's simple price API to retrieve live USD prices for `bitcoin`, `ethereum`, `solana`, and `cardano`.
* **Calculators:** Another `useEffect` runs whenever the parent holdings (`dataFromParent`) or `livePrices` change. It calculates:
    $$\text{Total Investment} = \sum (\text{Asset Amount} \times \text{Buy-in Price})$$
    $$\text{Total Portfolio Value} = \sum (\text{Asset Amount} \times \text{Current Live Price})$$
    $$\text{Profit/Loss} = \text{Total Portfolio Value} - \text{Total Investment}$$
* **Top Performer Engine:** Iterates through holdings to find the coin with the highest ROI percentage and isolates it on the board.
* **State Dispatcher:** Fires the updated analytics and raw pricing data back up to `App.tsx` via `func2` to update the shared workspace.

#### 🪙 `Mycoin.tsx` (Asset Performance Grid)
Receives the shared holdings and real-time live prices.
* Iterates through each holding in your portfolio and computes specific coin-by-coin statistics, including real-time visual progress percentages.
* Gracefully displays a placeholder state if no coins have been added yet.
* Includes responsive fallback states; if the icon for a specific token fails to load from the remote repository, it automatically catches the error and serves a clean generic placeholder icon.

---

## 📋 Types & Schemas

The application types are imported from a central definition file (e.g., `main1.ts`). They strictly define the structure of your entities:

```typescript
export interface data1 {
  coinType: string;
  coinAmount: number;
  coinValue: number; // Represents the average buy-in price
}

export interface data3 {
  totalInvestment: number;
  totalPorfoliocvalue: number;
  profit: number;
  PercentageProfit: number;
  ROI: number;
}

export interface LivePrices {
  [coinId: string]: {
    usd: number;
  };
}