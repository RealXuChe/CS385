"use client";
import { BigNumber } from "bignumber.js";

export class UnitConverter {
  static convertStorageSize(
    size: number,
    fromUnit: string,
    toUnit: string,
  ): string {
    const units: Record<string, string> = {
      B: "1",
      KiB: "1024",
      MiB: "1048576",
      GiB: "1073741824",
      TiB: "1099511627776",
      PiB: "1125899906842624",
      EiB: "1152921504606846976",
      KB: "1000",
      MB: "1000000",
      GB: "1000000000",
      TB: "1000000000000",
      PB: "1000000000000000",
      EB: "1000000000000000000",
    };
    const conversionFactors = units;
    if (
      (fromUnit.length === 2 && toUnit.length === 3) ||
      (fromUnit.length === 3 && toUnit.length === 2)
    ) {
      return "Different bases, No conversion relationship";
    } else {
      const result = new BigNumber(size)
        .times(conversionFactors[fromUnit])
        .dividedBy(conversionFactors[toUnit]);
      return result.toString();
    }
  }

  static convertClockFrequency(
    frequency: number,
    fromUnit: string,
    toUnit: string,
  ): number {
    const units: Record<string, number> = {
      Hz: 1,
      kHz: 1000,
      MHz: 1000 * 1000,
      GHz: 1000 * 1000 * 1000,
      THz: 1000 * 1000 * 1000 * 1000,
      PHz: 1000 * 1000 * 1000 * 1000 * 1000,
      EHz: 1000 * 1000 * 1000 * 1000 * 1000 * 1000,
    };

    return (frequency * units[fromUnit]) / units[toUnit];
  }

  static convertFileSize(
    size: number,
    fromUnit: string,
    toUnit: string,
  ): number {
    const units: Record<string, number> = {
      Sector: 512,
      Cluster: 4096,
      Block: 8192,
      AllocationUnit: 1024 * 1024,
    };

    return (size * units[fromUnit]) / units[toUnit];
  }

  static convertBandwidth(
    speed: number,
    fromUnit: string,
    toUnit: string,
  ): number {
    const units: Record<string, number> = {
      bps: 1,
      Kbps: 1000,
      Mbps: 1000 * 1000,
      Gbps: 1000 * 1000 * 1000,
      Tbps: 1000 * 1000 * 1000 * 1000,
      Pbps: 1000 * 1000 * 1000 * 1000 * 1000,
    };

    return (speed * units[fromUnit]) / units[toUnit];
  }

  static convertCapacitance(
    capacitance: number,
    fromUnit: string,
    toUnit: string,
  ): number {
    const units: Record<string, number> = {
      F: 1,
      daF: 10,
      hF: 100,
      kF: 1000,
      MF: 1000 * 1000,
      GF: 1000 * 1000 * 1000,
      dF: 0.1,
      cF: 0.01,
      mF: 0.001,
      µF: 0.000001,
      nF: 0.000000001,
      pF: 0.000000000001,
      "C/V": 1,
      abF: 1000000000,
      statF: 0.0000000000011,
    };
    return (capacitance * units[fromUnit]) / units[toUnit];
  }

  static convertConductivity(
    conductivity: number,
    fromUnit: string,
    toUnit: string,
  ): number {
    const units: Record<string, number> = {
      "S/m": 1,
      "kS/m": 1000,
      "mS/m": 0.001,
      "µS/cm": 0.0001,
      "Ω·m": 1,
    };
    return (conductivity * units[fromUnit]) / units[toUnit];
  }

  static convertInductance(
    inductance: number,
    fromUnit: string,
    toUnit: string,
  ): number {
    const units: Record<string, number> = {
      nH: 0.000000001,
      µH: 0.000001,
      mH: 0.001,
      H: 1,
      kH: 1000,
      MH: 1000 * 1000,
      GH: 1000 * 1000 * 1000,
      abH: 0.000000001,
      "Wb/A": 1,
    };
    return (inductance * units[fromUnit]) / units[toUnit];
  }

  static convertDensity(
    density: number,
    fromUnit: string,
    toUnit: string,
  ): number {
    const units: Record<string, number> = {
      "kg/cm³": 1000,
      "kg/dm³": 1,
      "kg/m³": 0.001,
      "g/cm³": 1,
      "g/dm³": 0.001,
      "g/m³": 0.000001,
      "oz/gal": 28.3495231 / 3785.41178,
      "lb/ft³": 453.59237 / (30.48 * 30.48 * 30.48),
      "lb/in³": (453.59237 * 12 * 12 * 12) / (30.48 * 30.48 * 30.48),
    };
    return (density * units[fromUnit]) / units[toUnit];
  }

  static convertEnergy(
    energy: number,
    fromUnit: string,
    toUnit: string,
  ): number {
    const units: Record<string, number> = {
      MJ: 1000000,
      kJ: 1000,
      J: 1,
      "kW·h": 3600000,
      Mcal: 4184000,
      kcal: 4184,
      cal: 4.184,
    };
    return (energy * units[fromUnit]) / units[toUnit];
  }

  static convertPower(power: number, fromUnit: string, toUnit: string): number {
    const units: Record<string, number> = {
      MW: 1000000,
      kW: 1000,
      W: 1,
      mW: 0.001,
      hp: 745.699872,
      ps: 735.49875,
      "J/s": 1,
      "ft·lb/s": 1.3558,
      "Btu/s": 1055.05585,
      "cal/h": 0.00116222,
    };
    return (power * units[fromUnit]) / units[toUnit];
  }

  static convertForce(force: number, fromUnit: string, toUnit: string): number {
    const units: Record<string, number> = {
      nN: 0.000000001,
      µN: 0.000001,
      mN: 0.001,
      N: 1,
      kN: 1000,
      MN: 1000000,
      GN: 1000000000,
      dyn: 0.00001,
      pdl: 0.138255,
      "Pa/m²": 1,
      kp: 9.80665,
      sn: 1000,
      kipf: 4448.2216,
      kgf: 9.80665,
      tnf: 9806.65,
      lbf: 4.4482216,
      stnf: 8896.4432,
      ltnf: 9964.0164,
      ozf: 0.278,
      mGf: 0.00980665,
      Gf: 9.80665,
    };
    return (force * units[fromUnit]) / units[toUnit];
  }

  static convertTime(time: number, fromUnit: string, toUnit: string): number {
    const units: Record<string, number> = {
      Years: 365 * 24 * 3600,
      Months: 30 * 24 * 3600,
      Weeks: 7 * 24 * 3600,
      Days: 24 * 3600,
      h: 3600,
      min: 60,
      s: 1,
      ms: 0.001,
      µs: 0.000001,
      ns: 0.000000001,
    };
    return (time * units[fromUnit]) / units[toUnit];
  }
}
