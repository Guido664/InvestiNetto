import React from 'react';
import { CalculationResult, InvestmentParams } from '../types';
import { formatCurrency } from '../utils/calculations';

interface SummaryCardProps {
  results: CalculationResult;
  params: InvestmentParams;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ results, params }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-bold text-slate-800">Risultato Finale</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-500 mb-1">Capitale Finale (Netto)</p>
          <p className="text-2xl font-bold text-indigo-600">{formatCurrency(results.netTotal)}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-500 mb-1">Guadagno Netto</p>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(results.netProfit)}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl">
           <div className="flex justify-between">
            <p className="text-sm text-slate-500 mb-1">Tasse ({params.taxRate}%)</p>
            <p className="text-xs text-slate-400">Lordo: {formatCurrency(results.grossProfit)}</p>
           </div>
          <p className="text-2xl font-bold text-red-500">{formatCurrency(results.totalTax)}</p>
        </div>
      </div>
    </div>
  );
};