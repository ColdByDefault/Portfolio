/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

import type {
  CalculatorInputs,
  ROIMetrics,
} from "@/types/live-tools/live-tools";

export const calculateROI = (inputs: CalculatorInputs): ROIMetrics => {
  const { hoursPerWeek, hourlyRate, automationCost } = inputs;

  // Calculate costs of doing it manually
  const weeklyCost = hoursPerWeek * hourlyRate;
  const annualCost = weeklyCost * 52;

  // Calculate break-even point
  // Avoid division by zero
  const breakEvenWeeks =
    weeklyCost > 0 ? Math.ceil(automationCost / weeklyCost) : 0;

  const firstYearSavings = annualCost - automationCost;

  return {
    weeklyCost,
    annualCost,
    breakEvenWeeks,
    firstYearSavings,
    isProfitable: firstYearSavings > 0,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
};
