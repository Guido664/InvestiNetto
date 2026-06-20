import { InvestmentParams, CalculationResult, DurationUnit, YearlyData } from '../types';

export const calculateInvestment = (params: InvestmentParams): CalculationResult => {
  const { capital, rate, duration, unit, taxRate } = params;

  // Annual compound interest calculation based on duration and rate
  const annualRateDecimal = rate / 100;
  const durationInYears = unit === DurationUnit.YEARS ? duration : duration / 12;
  
  const grossTotal = capital * Math.pow(1 + annualRateDecimal, durationInYears);
  const grossProfit = grossTotal - capital;
  
  const totalTax = grossProfit * (taxRate / 100);
  const netProfit = grossProfit - totalTax;
  const netTotal = capital + netProfit;

  const chartData: YearlyData[] = [];
  
  // Add initial point
  chartData.push({
    year: 'Inizio',
    invested: capital,
    interest: 0,
    tax: 0,
    total: capital
  });

  // Create integer steps for the chart
  const steps = Math.ceil(duration);

  for (let i = 1; i <= steps; i++) {
    // Current period t in years
    const t = unit === DurationUnit.YEARS ? i : i / 12;
    
    // Calculate intermediate value based on compound growth
    const currentGross = capital * Math.pow(1 + annualRateDecimal, t);
    const currentGrossProfit = currentGross - capital;
    const currentTax = currentGrossProfit * (taxRate / 100);
    const currentNetProfit = currentGrossProfit - currentTax;

    let label = '';
    if (unit === DurationUnit.MONTHS) {
      label = `Mese ${i}`;
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