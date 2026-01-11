import { InvestmentParams, CalculationResult, DurationUnit, YearlyData } from '../types';

export const calculateInvestment = (params: InvestmentParams): CalculationResult => {
  const { capital, rate, duration, unit, taxRate } = params;

  // New Logic: The rate input is the TOTAL return over the specified duration.
  // Example: Capital 100, Rate 42%, Duration 6 months.
  // Gross Profit = 42. Gross Total = 142.
  
  const totalRateDecimal = rate / 100;
  
  const grossProfit = capital * totalRateDecimal;
  const grossTotal = capital + grossProfit;
  
  const totalTax = grossProfit * (taxRate / 100);
  const netProfit = grossProfit - totalTax;
  const netTotal = capital + netProfit;

  // Generate Chart Data
  // To plot the curve, we calculate the implied periodic rate that results in the total return
  // Formula: (1 + totalRate) = (1 + periodicRate)^duration
  const impliedPeriodicRate = duration > 0 
    ? Math.pow(1 + totalRateDecimal, 1 / duration) - 1 
    : 0;

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
  const steps = Math.ceil(duration);

  for (let i = 1; i <= steps; i++) {
    // Current period t
    const t = i;
    
    // Calculate intermediate value based on implied compound growth
    const currentGross = capital * Math.pow(1 + impliedPeriodicRate, t);
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

  // Ensure the final data point matches exactly the simple total calculation
  // (Overwrite the last point of the loop to avoid floating point drift)
  if (chartData.length > 1) {
    const lastIndex = chartData.length - 1;
    chartData[lastIndex].interest = Number(netProfit.toFixed(2));
    chartData[lastIndex].tax = Number(totalTax.toFixed(2));
    chartData[lastIndex].total = Number(netTotal.toFixed(2));
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