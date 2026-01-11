import React from 'react';
import { InvestmentParams, DurationUnit, TaxPreset } from '../types';

interface InputSectionProps {
  params: InvestmentParams;
  setParams: React.Dispatch<React.SetStateAction<InvestmentParams>>;
}

export const InputSection: React.FC<InputSectionProps> = ({ params, setParams }) => {
  
  const handleTaxChange = (preset: number) => {
    setParams(prev => ({ ...prev, taxRate: preset }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const isCustomTax = ![26, 12.5, 0].includes(params.taxRate);

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Parametri Investimento
      </h2>

      {/* Capital */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Capitale Investito (€)</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-slate-500">€</span>
          </div>
          <input
            type="number"
            min="0"
            step="100"
            value={params.capital}
            onChange={(e) => setParams({ ...params, capital: parseFloat(e.target.value) || 0 })}
            onFocus={handleFocus}
            className="block w-full pl-8 pr-12 py-3 border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg border transition-colors"
          />
        </div>
      </div>

      {/* Rate and Duration Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rate */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Rendimento Totale (%)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.1"
              value={params.rate}
              onChange={(e) => setParams({ ...params, rate: parseFloat(e.target.value) || 0 })}
              onFocus={handleFocus}
              className="block w-full px-4 py-3 border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg border"
            />
             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-slate-400">%</span>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Durata</label>
          <div className="flex rounded-md shadow-sm">
            <input
              type="number"
              min="1"
              value={params.duration}
              onChange={(e) => setParams({ ...params, duration: parseFloat(e.target.value) || 1 })}
              onFocus={handleFocus}
              className="flex-1 block w-full px-4 py-3 rounded-l-lg border-slate-200 border focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg min-w-0"
            />
            <select
              value={params.unit}
              onChange={(e) => setParams({ ...params, unit: e.target.value as DurationUnit })}
              className="inline-flex items-center px-4 py-3 border border-l-0 border-slate-200 bg-slate-50 text-slate-500 sm:text-sm rounded-r-lg hover:bg-slate-100 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value={DurationUnit.YEARS}>Anni</option>
              <option value={DurationUnit.MONTHS}>Mesi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Taxation */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Regime Fiscale</label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <button
            onClick={() => handleTaxChange(TaxPreset.STANDARD)}
            className={`px-3 py-2 text-sm font-medium rounded-md border transition-all ${
              params.taxRate === TaxPreset.STANDARD
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            26% Standard
          </button>
          <button
            onClick={() => handleTaxChange(TaxPreset.GOV_BONDS)}
            className={`px-3 py-2 text-sm font-medium rounded-md border transition-all ${
              params.taxRate === TaxPreset.GOV_BONDS
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            12.5% Stato
          </button>
          <button
            onClick={() => handleTaxChange(0)}
            className={`px-3 py-2 text-sm font-medium rounded-md border transition-all ${
              params.taxRate === 0
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            0% Lordo
          </button>
        </div>
        
        {/* Custom Tax Input - Shows if custom or lets user fine tune */}
        <div className="relative flex items-center">
            <label className="mr-3 text-sm text-slate-600">Aliquota:</label>
            <input 
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={params.taxRate}
                onChange={(e) => setParams({...params, taxRate: parseFloat(e.target.value) || 0})}
                onFocus={handleFocus}
                className="block w-24 px-3 py-1.5 border-slate-200 rounded-md text-sm border focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="ml-2 text-slate-500 text-sm">%</span>
        </div>
      </div>
    </div>
  );
};