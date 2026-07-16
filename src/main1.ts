export interface data1 {
  coinType: string;
  coinAmount: number;
  coinValue: number;
}

export interface data3{
totalInvestment : number;
totalPorfoliocvalue:number;
profit: number ;
PercentageProfit: number;
ROI : number
}
// Add this to the bottom of src/main1.ts
export interface LivePrices {
  [key: string]: {
    usd: number;
  };
}