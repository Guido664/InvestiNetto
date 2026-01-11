import { GoogleGenAI } from "@google/genai";
import { InvestmentParams, CalculationResult, DurationUnit } from "../types";
import { formatCurrency, formatNumber } from "../utils/calculations";

export const getFinancialInsight = async (
  params: InvestmentParams, 
  results: CalculationResult
): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key mancante. Impossibile generare l'analisi.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const durationText = `${params.duration} ${params.unit === DurationUnit.YEARS ? 'anni' : 'mesi'}`;
  const rateLabel = params.unit === DurationUnit.YEARS ? 'Annuo' : 'Mensile';
  
  const prompt = `
    Agisci come un consulente finanziario esperto per il mercato italiano.
    Analizza brevemente questo investimento:
    
    - Capitale Iniziale: ${formatCurrency(params.capital)}
    - Rendimento ${rateLabel} Lordo: ${params.rate}%
    - Durata: ${durationText}
    - Tassazione Applicata: ${params.taxRate}%
    
    Risultati:
    - Capitale Finale Netto: ${formatCurrency(results.netTotal)}
    - Guadagno Netto: ${formatCurrency(results.netProfit)}
    - Tasse Pagate: ${formatCurrency(results.totalTax)}
    
    Fornisci un commento conciso (massimo 3-4 frasi) in italiano. 
    1. Valuta il risultato considerando il tipo di rendimento (${rateLabel}).
    2. Commenta l'impatto della tassazione scelta.
    3. Usa un tono professionale ma incoraggiante.
    Non usare markdown, solo testo semplice.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Analisi non disponibile.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Si è verificato un errore durante la generazione dell'analisi.";
  }
};