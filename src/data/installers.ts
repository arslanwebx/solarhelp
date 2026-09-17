export interface InstallerCoverage {
  name: string;
  states: string[];
  rates: Record<string, number | null>;
  stateNotes?: Record<string, string>;
  notes?: Record<string, string>;
}

export const INSTALLERS: InstallerCoverage[] = [
  {
    name: 'OWE',
    states: ['AZ', 'CA', 'CO', 'FL', 'IL', 'MA', 'MD', 'ME', 'NH', 'NJ', 'NM', 'NY', 'PR', 'RI', 'TX', 'VA'],
    rates: { AZ: 2.00, CA: 2.35, CO: 2.20, FL: 2.20, IL: 2.40, MA: 2.50, MD: 2.50, ME: 2.50, NH: 2.50, NJ: 2.45, NM: 2.15, NY: null, PR: null, RI: 2.50, TX: 2.05, VA: 2.40 },
    stateNotes: {}
  },
  {
    name: 'UNIVERSAL SOLAR',
    states: ['AZ', 'IL', 'NM', 'OH', 'IN'],
    rates: { AZ: 2.20, IL: 2.20, NM: 2.20, OH: 2.20, IN: 2.20 },
    stateNotes: { IL: 'ON HOLD' },
    notes: { IL: 'ON HOLD' }
  },
  {
    name: 'ZEO ENERGY',
    states: ['OH', 'FL', 'VA', 'PA'],
    rates: { OH: 2.24, FL: 2.24, VA: 2.24, PA: 2.39 },
    stateNotes: {}
  },
  {
    name: 'EMPOWER (NEW)',
    states: ['AR', 'AZ', 'CA', 'CO', 'CT', 'FL', 'GA', 'IA', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MO', 'NC', 'NH', 'NJ', 'NY', 'OH', 'OK', 'PA', 'RI', 'SC', 'TX', 'VA', 'VT', 'WA'],
    rates: { AR: 2.20, AZ: 2.00, CA: 2.25, CO: 2.25, CT: 2.45, FL: 2.05, GA: 2.10, IA: 2.25, IL: 2.45, IN: 2.30, KS: 2.25, KY: 2.30, LA: 2.20, MA: 2.45, MD: 2.35, ME: 2.45, MI: 2.30, MO: 2.25, NC: 2.15, NH: 2.45, NJ: 2.30, NY: 2.55, OH: 2.35, OK: 2.20, PA: 2.35, RI: 2.45, SC: 2.15, TX: 2.05, VA: 2.35, VT: 2.45, WA: 2.60 },
    stateNotes: {}
  },
  {
    name: 'ACTION SOLAR',
    states: ['AZ', 'CA', 'CO', 'FL', 'GA', 'ID', 'MA', 'NV', 'NJ', 'NM', 'TX', 'UT', 'WI', 'WY'],
    rates: { AZ: 2.20, CA: 2.20, CO: 2.45, FL: 2.45, GA: 2.20, ID: 2.20, MA: 2.20, NV: 2.20, NJ: 2.20, NM: 2.20, TX: 2.45, UT: 2.20, WI: 2.20, WY: 2.20 },
    stateNotes: {}
  },
  {
    name: 'SUNVENA',
    states: ['FL', 'GA'],
    rates: { FL: 2.15, GA: 2.15 },
    stateNotes: {}
  },
  {
    name: 'SUNDER (SUNPOWER/AMBIA)',
    states: ['CA', 'CO', 'CT', 'FL', 'ID', 'IL', 'IN', 'MD', 'MA', 'MI', 'NV', 'NC', 'OH', 'OR', 'PA', 'UT', 'VA', 'WA'],
    rates: { CA: 2.45, CO: 2.25, CT: 2.55, FL: null, ID: 2.50, IL: 2.35, IN: 2.35, MD: null, MA: 2.55, MI: 2.30, NV: 2.20, NC: 2.35, OH: 2.30, OR: 2.40, PA: null, UT: null, VA: 2.30, WA: 2.40 },
    stateNotes: {}
  },
  {
    name: 'LUNEX SOLAR',
    states: ['CO', 'CT', 'FL', 'MA', 'RI'],
    rates: { CO: 2.30, CT: 2.30, FL: 2.30, MA: 2.30, RI: 2.30 },
    stateNotes: {}
  },
  {
    name: 'TRON SOLAR',
    states: ['IL', 'IN', 'WI'],
    rates: { IL: 2.45, IN: 2.45, WI: 2.45 },
    stateNotes: {}
  }
];

// Lender coverage supplied for OWE. Keeping installer association explicit prevents
// these lender options from being presented as approved for other installers.
export const LENDERS = [
  {
    name: 'LightReach',
    installers: ['OWE'],
    states: ['AZ', 'CA', 'CO', 'CT', 'FL', 'IL', 'MA', 'MD', 'ME', 'NH', 'NJ', 'NM', 'PR', 'RI', 'TX', 'VA', 'VT']
  },
  {
    name: 'Credit Human',
    installers: ['OWE'],
    states: ['AZ', 'CA', 'CO', 'CT', 'FL', 'IL', 'MA', 'MD', 'ME', 'NH', 'NM', 'RI', 'TX', 'VA']
  },
  {
    name: 'Participate',
    installers: ['OWE'],
    states: ['AZ', 'CA', 'CO', 'FL', 'MA', 'TX']
  },
  {
    name: 'EnFin',
    installers: ['OWE'],
    states: ['AZ', 'CA', 'CT', 'FL', 'IL', 'MA', 'NJ', 'PA', 'TX']
  },
  {
    name: 'Concert Propel',
    installers: ['OWE'],
    states: ['AZ', 'CA', 'CO', 'TX']
  },
  {
    name: 'Sungage',
    installers: ['OWE'],
    states: ['AZ', 'CA', 'CO', 'CT', 'IL', 'ME', 'NH', 'NM', 'TX']
  },
  {
    name: 'OneEthos',
    installers: ['OWE'],
    states: ['AZ', 'CO', 'NM', 'TX']
  },
  {
    name: 'SunRun',
    installers: ['OWE'],
    states: ['CA', 'CT', 'IL', 'MA', 'MD', 'ME', 'NH', 'TX']
  },
  {
    name: 'Propel',
    installers: ['OWE'],
    states: ['ME']
  },
  {
    name: 'Solrite',
    installers: ['OWE'],
    states: ['TX']
  }
];
