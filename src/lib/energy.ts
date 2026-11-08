import type { Property } from "./types";

// Energy data for the property page (REDESIGN-PLAN.md §4).
export const ENERGY_CLASSES = ["A", "B", "C", "D", "E", "F", "G"] as const;
export type EnergyClass = (typeof ENERGY_CLASSES)[number];

// Official French DPE (2021) upper bounds per class.
// Energy: kWh of primary energy / m² / year. GES: kg CO₂ / m² / year.
const ENERGY_BOUNDS = [70, 110, 180, 250, 330, 420];
const GHG_BOUNDS = [6, 11, 30, 50, 70, 100];

function classFrom(value: number, bounds: number[]): EnergyClass {
  const i = bounds.findIndex((b) => value <= b);
  return ENERGY_CLASSES[i === -1 ? 6 : i];
}

export function energyClassFromValue(kwh: number): EnergyClass {
  return classFrom(kwh, ENERGY_BOUNDS);
}

export function ghgClassFromValue(kg: number): EnergyClass {
  return classFrom(kg, GHG_BOUNDS);
}

export type EnergyInfo = {
  energyClass?: EnergyClass;
  ghgClass?: EnergyClass;
  energyValue?: number;
  ghgValue?: number;
  costMin?: number;
  costMax?: number;
  costYear?: number;
  /** false → "Diagnosis in progress" */
  hasData: boolean;
};

/** The property's energy data, with classes computed from the values when only the numbers are known. */
export function energyInfo(p: Property): EnergyInfo {
  const energyClass = p.energyClass ?? (p.energyValue != null ? energyClassFromValue(p.energyValue) : undefined);
  const ghgClass = p.ghgClass ?? (p.ghgValue != null ? ghgClassFromValue(p.ghgValue) : undefined);
  return {
    energyClass,
    ghgClass,
    energyValue: p.energyValue,
    ghgValue: p.ghgValue,
    costMin: p.energyCostMin,
    costMax: p.energyCostMax,
    costYear: p.energyCostYear,
    hasData: Boolean(energyClass || ghgClass),
  };
}
