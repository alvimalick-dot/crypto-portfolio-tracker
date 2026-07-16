                ┌──────────────────────────┐
                │         App.tsx          │  ◄── Master Application Shell
                └────────────┬─────────────┘      (Manages State & Synchronization)
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│    Port.tsx     │    │PortDashboard.tsx │    │    Mycoin.tsx    │
├─────────────────┤    ├──────────────────┤    ├──────────────────┤
│ Asset Input Form│    │ Live Metrics     │    │ Position Roster  │
│ & Asset Additions│   │ Real-time P&L    │    │ Breakdowns &     │
└─────────────────┘    └──────────────────┘    │ Asset Row Items  │
└──────────────────┘


### 1. Master Application Layer (`App.tsx`)
Serves as the root state engine. It initializes global application states for asset holdings, real-time aggregated metrics, and streaming snapshot prices.
* **`val` (`data1[]`)**: Thread-safe dynamic array storing individual asset holdings.
* **`dash` (`data3`)**: Unified interface containing calculations for aggregated investment outlays, total asset weights, gross profits, and ROI spreads.
* **`live` (`LivePrices`)**: Live dictionary of pricing values streamed directly from the cloud network topology.

### 2. Transaction Interface Panel (`Port.tsx`)
A structural, stylized acquisition dashboard facilitating asset additions. Captures selected currency IDs, current volumes, and historical acquisition values. Features defensive input sanitation checks (e.g., verifying asset identification prior to ingestion dispatch).

### 3. Metric Engine Dashboard (`PortDashboard.tsx`)
The calculations epicenter. Contains an automated network polling engine targeting the REST API endpoints of CoinGecko. Upon feed acquisition, it translates currency configurations across cross-referenced arrays to map values (such as computing current dynamic margins against baseline initial outlays).

### 4. Position Roster Layout (`Mycoin.tsx`)
A grid-swappable roster interface mapping explicit token values. Computes granular position tracking, individual dynamic performance deltas, and includes defensive asset fallback strategies (such as visual element error handlers to replace missing asset icons with fallback badges).

---

## 💾 Core Interfaces (`main1.ts`)

The application's structural type safety is strictly enforced via explicit interface models:

```typescript
export interface data1 {
  coinType: string;     // Unique asset ticker token identifier (e.g., 'btc', 'eth')
  coinAmount: number;   // Total calculated token volume precision units held
  coinValue: number;    // Base fiat entry price representation ($ USD)
}

export interface data3 {
  totalInvestment: number;      // Total financial cost footprint of assets
  totalPorfoliocvalue: number;  // Current market-rate valuation aggregate
  profit: number;               // Absolute valuation change dollar matrix
  PercentageProfit: number;     // Percent delta performance scalar
  ROI: number;                  // Return on Investment ratio footprint
}

export interface LivePrices {
  [key: string]: {
    usd: number;                // Standardized raw floating point USD quote
  };
} 