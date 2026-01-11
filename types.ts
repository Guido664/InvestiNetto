export enum DurationUnit {
  YEARS = 'Anni',
  MONTHS = 'Mesi'
}

export enum TaxPreset {
  STANDARD = 26,     // Azioni, ETF, Fondi, Conti Deposito
  GOV_BONDS = 12.5,  // Titoli di Stato (BTP, BOT)
  ZERO = 0,          // Lordo / Piani esenti
  CUSTOM = -1        // Personalizzato
}

export interface InvestmentParams {
  capital: number;
  rate: number;
  duration: number;
  unit: DurationUnit;
  taxRate: number;
}

export interface YearlyData {
  year: string;
  invested: number;
  interest: number; // Cumulative Net Interest
  tax: number;      // Cumulative Tax
  total: number;    // Invested + Net Interest
}

export interface CalculationResult {
  grossTotal: number;
  netTotal: number;
  totalTax: number;
  netProfit: number;
  grossProfit: number;
  chartData: YearlyData[];
}