import React, { useState, useMemo } from 'react';
import { InputSection } from './components/InputSection';
import { SummaryCard } from './components/SummaryCard';
import { InvestmentParams, DurationUnit } from './types';
import { calculateInvestment } from './utils/calculations';

const App: React.FC = () => {
  const [params, setParams] = useState<InvestmentParams>({
    capital: 10000,
    rate: 4,
    duration: 5,
    unit: DurationUnit.YEARS,
    taxRate: 26
  });

  // Real-time calculation using useMemo
  const results = useMemo(() => calculateInvestment(params), [params]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Investi<span className="text-indigo-600">Netto</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Calcola il rendimento reale dei tuoi investimenti con la tassazione italiana aggiornata.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs (4 columns wide on large screens) */}
          <div className="lg:col-span-4">
             <InputSection params={params} setParams={setParams} />
          </div>

          {/* Right Column: Results (8 columns wide) */}
          <div className="lg:col-span-8 space-y-6">
            <SummaryCard results={results} params={params} />
          </div>

        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} InvestiNetto Italia. I calcoli sono a scopo illustrativo.</p>
        </div>

      </div>
    </div>
  );
};

export default App;