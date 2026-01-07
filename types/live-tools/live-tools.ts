/**
 * @author ColdByDefault
 * @copyright  2026 ColdByDefault. All Rights Reserved.
*/

export interface CalculatorInputs {
  hoursPerWeek: number;
  hourlyRate: number; // Internal cost of the employee doing the task
  automationCost: number; // Your estimated fee
}

export interface ROIMetrics {
  weeklyCost: number;
  annualCost: number;
  breakEvenWeeks: number;
  firstYearSavings: number;
  isProfitable: boolean;
}
