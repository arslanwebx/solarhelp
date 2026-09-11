// SolarHelp State and Installer Redlines Database
// Extracted from official Redlines master rate sheet

const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' }
];

// Raw installer rules and state mappings
const INSTALLERS_CONFIG = [
  {
    name: 'UNIVERSAL',
    type: 'all_states',
    defaultRedline: 2.20,
    rates: {}
  },
  {
    name: 'LUNEX',
    type: 'all_states',
    defaultRedline: 2.30,
    rates: {}
  },
  {
    name: 'TRON',
    type: 'all_states',
    defaultRedline: 2.45,
    rates: {}
  },
  {
    name: 'ACTION',
    type: 'conditional_all_states',
    defaultRedline: 2.20, // All states except FL, CO, TX
    notes: 'Default $2.20 for all states except FL, CO, TX ($2.45)',
    rates: {
      FL: { redline: 2.45, notes: 'Regional pricing for FL / CO / TX' },
      CO: { redline: 2.45, notes: 'Regional pricing for FL / CO / TX' },
      TX: { redline: 2.45, notes: 'Regional pricing for FL / CO / TX' }
    }
  },
  {
    name: 'OWE',
    type: 'state_specific',
    rates: {
      AZ: { redline: 2.00 },
      CO: { redline: 2.20 },
      TX: { redline: 2.05 },
      IL: { redline: 2.40 },
      MA: { redline: 2.50 },
      CA: { redline: 2.35 },
      ME: { redline: 2.50 },
      NM: { redline: 2.15 },
      CT: { redline: 2.50 },
      MD: { redline: 2.50 },
      NJ: { redline: 2.45 },
      RI: { redline: 2.50 },
      FL: { redline: 2.20 },
      NH: { redline: 2.50 },
      VA: { redline: 2.40 },
      VT: { redline: null, notes: 'Not Available (N/A)' }
    }
  },
  {
    name: 'ZEO / SUNDER / SUNERGY',
    type: 'state_specific',
    rates: {
      FL: { redline: 2.24 },
      OH: { redline: 2.24 },
      TX: { redline: 2.19 },
      VA: { redline: 2.24 },
      PA: { redline: 2.39 },
      CA: { redline: 2.53, notes: 'This is for LA county only.' }
    }
  },
  {
    name: 'SUNVENA',
    type: 'state_specific',
    rates: {
      FL: { redline: 2.15 },
      GA: { redline: 2.15 }
    }
  },
  {
    name: 'SUNPOWER',
    type: 'state_specific',
    rates: {
      CA: { redline: 2.45 },
      CO: { redline: 2.25 },
      CT: { redline: 2.55 },
      ID: { redline: 2.50 },
      IL: { redline: 2.35 },
      IN: { redline: 2.35 },
      MA: { redline: 2.55 },
      MI: { redline: 2.30 },
      MN: { redline: 2.30 },
      NV: { redline: 2.20, notes: 'Sunpower (Reno)' },
      NH: { redline: 2.55 },
      NC: { redline: 2.35 },
      OH: { redline: 2.30 },
      OR: { redline: 2.40 },
      SC: { redline: 2.31 },
      VA: { redline: 2.30 },
      WA: { redline: 2.40 },
      WI: { redline: 2.35 }
    }
  },
  {
    name: 'EMPOWER',
    type: 'state_specific',
    rates: {
      AR: { redline: 2.20 },
      AZ: { redline: 2.00 },
      CA: { redline: 2.25 },
      CO: { redline: 2.25 },
      CT: { redline: 2.45 },
      FL: { redline: 2.05 },
      GA: { redline: 2.10 },
      IA: { redline: 2.25 },
      IL: { redline: 2.45 },
      IN: { redline: 2.30 },
      KS: { redline: 2.25 },
      KY: { redline: 2.30 },
      LA: { redline: 2.20 },
      MA: { redline: 2.45 },
      MD: { redline: 2.35 },
      ME: { redline: 2.45 },
      MI: { redline: 2.30 },
      MO: { redline: 2.25 },
      NC: { redline: 2.15 },
      NH: { redline: 2.45 },
      NJ: { redline: 2.30 },
      NY: { redline: 2.55 },
      OH: { redline: 2.35 },
      OK: { redline: 2.20 },
      PA: { redline: 2.35 },
      RI: { redline: 2.45 },
      SC: { redline: 2.15 },
      TX: { redline: 2.05 },
      VA: { redline: 2.35 },
      VT: { redline: 2.45 },
      WA: { redline: 2.60 }
    }
  }
];

// Warehouse information for OWE & Sunvena
const WAREHOUSES_DATA = {
  OWE: {
    name: 'OWE (One World Energy)',
    badge: 'Multi-Regional Hub',
    description: 'Premier national distribution network supporting 16+ key solar states with optimized procurement and rapid fulfillment.',
    coverageStates: ['AZ', 'CA', 'CO', 'CT', 'FL', 'IL', 'MA', 'MD', 'ME', 'NH', 'NJ', 'NM', 'RI', 'TX', 'VA'],
    hubLocations: [
      { city: 'Phoenix', state: 'AZ', type: 'Primary Southwest Distribution Hub' },
      { city: 'Dallas / Fort Worth', state: 'TX', type: 'Central Regional Center' },
      { city: 'Orlando', state: 'FL', type: 'Southeast Operations Hub' },
      { city: 'Denver', state: 'CO', type: 'Mountain West Warehouse' },
      { city: 'Boston Metro', state: 'MA', type: 'Northeast Logistics Center' }
    ],
    features: [
      'Tier 1 Bloomberg PV Module Stock (Boviet, Meyer Burger, QCells)',
      'Enphase & SolarEdge Inverter inventory staged for fast turnaround',
      'Direct staging for residential & light commercial solar contractors'
    ]
  },
  SUNVENA: {
    name: 'Sunvena Solar Logistics',
    badge: 'Southeast Regional Specialist',
    description: 'Specialized southeast solar logistics and fulfillment operator delivering top-tier solar equipment across Florida and Georgia.',
    coverageStates: ['FL', 'GA'],
    hubLocations: [
      { city: 'Sanford / Orlando', state: 'FL', type: 'Corporate Headquarters & Main Hub' },
      { city: 'Tampa Bay', state: 'FL', type: 'West Coast Florida Facility' },
      { city: 'Atlanta Metro', state: 'GA', type: 'Georgia Regional Distribution Hub' }
    ],
    features: [
      'Optimized hurricane-rated racking & mounting solutions',
      'Exclusive southeast distributor partnerships for rapid crew dispatch',
      'Dedicated staging with same-day will-call capability'
    ]
  }
};

/**
 * Returns list of all installers available for a given state code (e.g. 'TX', 'FL', 'CA')
 */
function getInstallersForState(stateCode) {
  const code = stateCode.toUpperCase();
  const results = [];

  INSTALLERS_CONFIG.forEach(installer => {
    if (installer.type === 'all_states') {
      results.push({
        installer: installer.name,
        redline: installer.defaultRedline,
        formattedRedline: installer.defaultRedline !== null ? `$${installer.defaultRedline.toFixed(2)}` : 'N/A',
        isAvailable: installer.defaultRedline !== null,
        coverageType: 'All States (Nationwide)',
        notes: ''
      });
    } else if (installer.type === 'conditional_all_states') {
      const stateOverride = installer.rates[code];
      const redline = stateOverride ? stateOverride.redline : installer.defaultRedline;
      const notes = stateOverride ? stateOverride.notes : (installer.notes || '');
      results.push({
        installer: installer.name,
        redline: redline,
        formattedRedline: redline !== null ? `$${redline.toFixed(2)}` : 'N/A',
        isAvailable: redline !== null,
        coverageType: stateOverride ? 'Regional Special Tier' : 'Standard Coverage',
        notes: notes
      });
    } else if (installer.type === 'state_specific') {
      if (installer.rates && Object.prototype.hasOwnProperty.call(installer.rates, code)) {
        const entry = installer.rates[code];
        results.push({
          installer: installer.name,
          redline: entry.redline,
          formattedRedline: entry.redline !== null ? `$${entry.redline.toFixed(2)}` : 'N/A',
          isAvailable: entry.redline !== null,
          coverageType: 'State-Specific Rate',
          notes: entry.notes || ''
        });
      }
    }
  });

  return results;
}

/**
 * Returns stats for a state: lowest rate, average rate, count
 */
function getStateStats(installers) {
  const available = installers.filter(i => i.isAvailable && typeof i.redline === 'number');
  if (!available.length) {
    return { lowest: null, lowestInstaller: 'None', average: null, count: 0 };
  }
  const minRedline = Math.min(...available.map(i => i.redline));
  const lowestInstallers = available.filter(i => i.redline === minRedline).map(i => i.installer);
  const sum = available.reduce((acc, curr) => acc + curr.redline, 0);
  const average = sum / available.length;

  return {
    lowest: minRedline,
    lowestInstallers,
    average: average.toFixed(2),
    count: available.length
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { US_STATES, INSTALLERS_CONFIG, WAREHOUSES_DATA, getInstallersForState, getStateStats };
}
