import { InvestmentParams, CalculationResult, DurationUnit, YearlyData } from '../types';

export const calculateInvestment = (params: InvestmentParams): CalculationResult => {
  const { capital, rate, duration, unit, taxRate } = params;

  // Rate interpretation:
  // If unit is YEARS, rate is Annual %.
  // If unit is MONTHS, rate is Monthly %.
  const rateDecimal = rate / 100;
  
  // Compounding periods corresponds exactly to the duration value
  // Formula: A = P(1 + r)^t
  const periods = duration;
  
  const grossTotal = capital * Math.pow(1 + rateDecimal, periods);
  const grossProfit = grossTotal - capital;
  
  const totalTax = grossProfit * (taxRate / 100);
  const netProfit = grossProfit - totalTax;
  const netTotal = capital + netProfit;

  // Generate Chart Data
  const chartData: YearlyData[] = [];
  
  // Add initial point
  chartData.push({
    year: 'Start',
    invested: capital,
    interest: 0,
    tax: 0,
    total: capital
  });

  // Create integer steps for the chart
  const steps = Math.ceil(periods);

  for (let i = 1; i <= steps; i++) {
    // Current period
    const t = i;
    
    const currentGross = capital * Math.pow(1 + rateDecimal, t);
    const currentGrossProfit = currentGross - capital;
    const currentTax = currentGrossProfit * (taxRate / 100);
    const currentNetProfit = currentGrossProfit - currentTax;

    let label = '';
    if (unit === DurationUnit.MONTHS) {
      label = `M${i}`;
    } else {
      label = `Anno ${i}`;
    }

    chartData.push({
      year: label,
      invested: Number(capital.toFixed(2)),
      interest: Number(currentNetProfit.toFixed(2)),
      tax: Number(currentTax.toFixed(2)),
      total: Number((capital + currentNetProfit).toFixed(2))
    });
  }

  return {
    grossTotal,
    netTotal,
    totalTax,
    netProfit,
    grossProfit,
    chartData
  };
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat('it-IT', { maximumFractionDigits: 2 }).format(value);
};