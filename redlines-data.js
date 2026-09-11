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

// Complete 39 Branch Locations for OWE (Our World Energy)
// Captured from official OWE Branch Locations data sheet
const OWE_BRANCH_LOCATIONS = [
  {
    id: "owe-az-kingman",
    state: "Arizona",
    stateCode: "AZ",
    branch: "Kingman",
    completeAddress: "2365 Northern Ave, Kingman, AZ 86409",
    streetAddress: "2365 Northern Ave",
    city: "Kingman",
    addressState: "AZ",
    zip: "86409",
    coverageRadius: "50 mi",
    maxTravel: "Not listed",
    teamType: "In House",
    phone: "Not listed",
    mapQuery: "2365 Northern Ave, Kingman, AZ 86409"
  },
  {
    id: "owe-az-phoenix",
    state: "Arizona",
    stateCode: "AZ",
    branch: "Phoenix",
    completeAddress: "2501 W Phelps Road, Phoenix, AZ 85023",
    streetAddress: "2501 W Phelps Road",
    city: "Phoenix",
    addressState: "AZ",
    zip: "85023",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "In House",
    phone: "Not listed",
    mapQuery: "2501 W Phelps Road, Phoenix, AZ 85023"
  },
  {
    id: "owe-az-tucson",
    state: "Arizona",
    stateCode: "AZ",
    branch: "Tucson",
    completeAddress: "811 S Santa Rita Ave, Tucson, AZ 85719",
    streetAddress: "811 S Santa Rita Ave",
    city: "Tucson",
    addressState: "AZ",
    zip: "85719",
    coverageRadius: "60 mi",
    maxTravel: "Not listed",
    teamType: "In House",
    phone: "Not listed",
    mapQuery: "811 S Santa Rita Ave, Tucson, AZ 85719"
  },
  {
    id: "owe-ca-fresno",
    state: "California",
    stateCode: "CA",
    branch: "Fresno",
    completeAddress: "426 W South Ave, Fresno, CA 93706, USA",
    streetAddress: "426 W South Ave",
    city: "Fresno",
    addressState: "CA",
    zip: "93706",
    coverageRadius: "60 mi",
    maxTravel: "60 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "426 W South Ave, Fresno, CA 93706"
  },
  {
    id: "owe-ca-riverside",
    state: "California",
    stateCode: "CA",
    branch: "Riverside",
    completeAddress: "1601 Iowa Ave, Riverside, CA 92507, USA",
    streetAddress: "1601 Iowa Ave",
    city: "Riverside",
    addressState: "CA",
    zip: "92507",
    coverageRadius: "670 mi",
    maxTravel: "670 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "1601 Iowa Ave, Riverside, CA 92507"
  },
  {
    id: "owe-ca-sanjacinto",
    state: "California",
    stateCode: "CA",
    branch: "San Jacinto",
    completeAddress: "1140 Poppy St, San Jacinto, CA 92583",
    streetAddress: "1140 Poppy St",
    city: "San Jacinto",
    addressState: "CA",
    zip: "92583",
    coverageRadius: "300 mi",
    maxTravel: "300 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "1140 Poppy St, San Jacinto, CA 92583"
  },
  {
    id: "owe-ca-turlock",
    state: "California",
    stateCode: "CA",
    branch: "Turlock",
    completeAddress: "2200 Maryann Dr, Turlock, CA 95380",
    streetAddress: "2200 Maryann Dr",
    city: "Turlock",
    addressState: "CA",
    zip: "95380",
    coverageRadius: "90 mi",
    maxTravel: "90 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "2200 Maryann Dr, Turlock, CA 95380"
  },
  {
    id: "owe-co-denver",
    state: "Colorado",
    stateCode: "CO",
    branch: "Denver",
    completeAddress: "3250 W 72nd Ave, Westminster, CO 80030",
    streetAddress: "3250 W 72nd Ave",
    city: "Westminster",
    addressState: "CO",
    zip: "80030",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "In House",
    phone: "Not listed",
    mapQuery: "3250 W 72nd Ave, Westminster, CO 80030"
  },
  {
    id: "owe-co-golden",
    state: "Colorado",
    stateCode: "CO",
    branch: "Golden",
    completeAddress: "15000 W 44th Ave #7, Golden, CO 80403",
    streetAddress: "15000 W 44th Ave #7",
    city: "Golden",
    addressState: "CO",
    zip: "80403",
    coverageRadius: "248 mi",
    maxTravel: "248 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "15000 W 44th Ave #7, Golden, CO 80403"
  },
  {
    id: "owe-fl-flaglerbeach",
    state: "Florida",
    stateCode: "FL",
    branch: "Flagler Beach",
    completeAddress: "211 N 5th St, Flagler Beach, FL 32136",
    streetAddress: "211 N 5th St",
    city: "Flagler Beach",
    addressState: "FL",
    zip: "32136",
    coverageRadius: "500 mi",
    maxTravel: "500 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "211 N 5th St, Flagler Beach, FL 32136"
  },
  {
    id: "owe-fl-jacksonville",
    state: "Florida",
    stateCode: "FL",
    branch: "Jacksonville",
    completeAddress: "476 Riverside Ave, Jacksonville, FL 32202",
    streetAddress: "476 Riverside Ave",
    city: "Jacksonville",
    addressState: "FL",
    zip: "32202",
    coverageRadius: "900 mi",
    maxTravel: "900 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "476 Riverside Ave, Jacksonville, FL 32202"
  },
  {
    id: "owe-fl-tallahassee",
    state: "Florida",
    stateCode: "FL",
    branch: "Tallahassee",
    completeAddress: "119-6 Hamilton Park Dr, Tallahassee, FL 32304",
    streetAddress: "119-6 Hamilton Park Dr",
    city: "Tallahassee",
    addressState: "FL",
    zip: "32304",
    coverageRadius: "150 mi",
    maxTravel: "150 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "119-6 Hamilton Park Dr, Tallahassee, FL 32304"
  },
  {
    id: "owe-fl-tampa",
    state: "Florida",
    stateCode: "FL",
    branch: "Tampa",
    completeAddress: "6919 Senoj Dr, Tampa, FL 33610",
    streetAddress: "6919 Senoj Dr",
    city: "Tampa",
    addressState: "FL",
    zip: "33610",
    coverageRadius: "100 mi",
    maxTravel: "100 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "6919 Senoj Dr, Tampa, FL 33610"
  },
  {
    id: "owe-il-columbia",
    state: "Illinois",
    stateCode: "IL",
    branch: "Columbia",
    completeAddress: "1416 Dd Rd, Columbia, IL 62236",
    streetAddress: "1416 Dd Rd",
    city: "Columbia",
    addressState: "IL",
    zip: "62236",
    coverageRadius: "150 mi",
    maxTravel: "150 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "1416 Dd Rd, Columbia, IL 62236"
  },
  {
    id: "owe-il-hillside",
    state: "Illinois",
    stateCode: "IL",
    branch: "Hillside",
    completeAddress: "4933 Butterfield Rd, Hillside, IL 60162",
    streetAddress: "4933 Butterfield Rd",
    city: "Hillside",
    addressState: "IL",
    zip: "60162",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "4933 Butterfield Rd, Hillside, IL 60162"
  },
  {
    id: "owe-il-hoffmanestates",
    state: "Illinois",
    stateCode: "IL",
    branch: "Hoffman Estates",
    completeAddress: "115 Pleasant St, Hoffman Estates, IL 60169",
    streetAddress: "115 Pleasant St",
    city: "Hoffman Estates",
    addressState: "IL",
    zip: "60169",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "115 Pleasant St, Hoffman Estates, IL 60169"
  },
  {
    id: "owe-il-maryville",
    state: "Illinois",
    stateCode: "IL",
    branch: "Maryville",
    completeAddress: "25 Annebriar Dr, Maryville, IL 62062",
    streetAddress: "25 Annebriar Dr",
    city: "Maryville",
    addressState: "IL",
    zip: "62062",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "25 Annebriar Dr, Maryville, IL 62062"
  },
  {
    id: "owe-me-brunswick",
    state: "Maine",
    stateCode: "ME",
    branch: "Brunswick",
    completeAddress: "145 Allagash Dr, Brunswick, ME 04011",
    streetAddress: "145 Allagash Dr",
    city: "Brunswick",
    addressState: "ME",
    zip: "04011",
    coverageRadius: "150 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "145 Allagash Dr, Brunswick, ME 04011"
  },
  {
    id: "owe-me-portland",
    state: "Maine",
    stateCode: "ME",
    branch: "Portland",
    completeAddress: "75 St James St, Portland, ME 04102",
    streetAddress: "75 St James St",
    city: "Portland",
    addressState: "ME",
    zip: "04102",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "75 St James St, Portland, ME 04102"
  },
  {
    id: "owe-md-jessup",
    state: "Maryland",
    stateCode: "MD",
    branch: "Jessup",
    completeAddress: "8325 Patuxent Range Rd, Jessup, MD 20794",
    streetAddress: "8325 Patuxent Range Rd",
    city: "Jessup",
    addressState: "MD",
    zip: "20794",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "8325 Patuxent Range Rd, Jessup, MD 20794"
  },
  {
    id: "owe-ma-auburn",
    state: "Massachusetts",
    stateCode: "MA",
    branch: "Auburn",
    completeAddress: "3 C St, Unit 13, Auburn, MA 01501",
    streetAddress: "3 C St, Unit 13",
    city: "Auburn",
    addressState: "MA",
    zip: "01501",
    coverageRadius: "150 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "3 C St, Unit 13, Auburn, MA 01501"
  },
  {
    id: "owe-ma-hudson",
    state: "Massachusetts",
    stateCode: "MA",
    branch: "Hudson",
    completeAddress: "19 Bonazzoli Ave, Suite 2, Hudson, MA 01749",
    streetAddress: "19 Bonazzoli Ave, Suite 2",
    city: "Hudson",
    addressState: "MA",
    zip: "01749",
    coverageRadius: "250 mi",
    maxTravel: "250 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "19 Bonazzoli Ave, Suite 2, Hudson, MA 01749"
  },
  {
    id: "owe-ma-wallingford",
    state: "Massachusetts",
    stateCode: "MA",
    branch: "Wallingford",
    completeAddress: "19-2 Bonazzoli Ave, Suite 2, Hudson, MA 01749",
    streetAddress: "19-2 Bonazzoli Ave, Suite 2",
    city: "Hudson",
    addressState: "MA",
    zip: "01749",
    coverageRadius: "250 mi",
    maxTravel: "250 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "19-2 Bonazzoli Ave, Suite 2, Hudson, MA 01749"
  },
  {
    id: "owe-nh-londonderry",
    state: "New Hampshire",
    stateCode: "NH",
    branch: "Londonderry",
    completeAddress: "8 Tyler Dr, Londonderry, NH 03053",
    streetAddress: "8 Tyler Dr",
    city: "Londonderry",
    addressState: "NH",
    zip: "03053",
    coverageRadius: "200 mi",
    maxTravel: "200 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "8 Tyler Dr, Londonderry, NH 03053"
  },
  {
    id: "owe-nh-seabrook",
    state: "New Hampshire",
    stateCode: "NH",
    branch: "Seabrook",
    completeAddress: "82 Marshview Cir, Seabrook, NH 03874",
    streetAddress: "82 Marshview Cir",
    city: "Seabrook",
    addressState: "NH",
    zip: "03874",
    coverageRadius: "150 mi",
    maxTravel: "150 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "82 Marshview Cir, Seabrook, NH 03874"
  },
  {
    id: "owe-nj-pennsauken",
    state: "New Jersey",
    stateCode: "NJ",
    branch: "Pennsauken",
    completeAddress: "35 Twinbridge Dr, Pennsauken, NJ (ZIP not listed)",
    streetAddress: "35 Twinbridge Dr",
    city: "Pennsauken",
    addressState: "NJ",
    zip: "Not listed",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "35 Twinbridge Dr, Pennsauken, NJ"
  },
  {
    id: "owe-nm-albuquerque",
    state: "New Mexico",
    stateCode: "NM",
    branch: "Albuquerque",
    completeAddress: "2604 Princeton Dr NE, Albuquerque, NM 87107",
    streetAddress: "2604 Princeton Dr NE",
    city: "Albuquerque",
    addressState: "NM",
    zip: "87107",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "In House",
    phone: "Not listed",
    mapQuery: "2604 Princeton Dr NE, Albuquerque, NM 87107"
  },
  {
    id: "owe-ny-brooklyn",
    state: "New York",
    stateCode: "NY",
    branch: "Brooklyn",
    completeAddress: "1530 Pennsylvania Ave, Brooklyn, NY 11239",
    streetAddress: "1530 Pennsylvania Ave",
    city: "Brooklyn",
    addressState: "NY",
    zip: "11239",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "1530 Pennsylvania Ave, Brooklyn, NY 11239"
  },
  {
    id: "owe-pr-guayanabo",
    state: "Puerto Rico",
    stateCode: "PR",
    branch: "Guayanabo",
    completeAddress: "Guayanabo, PR 00969",
    streetAddress: "",
    city: "Guayanabo",
    addressState: "PR",
    zip: "00969",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "Guayanabo, PR 00969"
  },
  {
    id: "owe-ri-mansfield",
    state: "Rhode Island",
    stateCode: "RI",
    branch: "Mansfield, MA (RI Coverage)",
    completeAddress: "600 West St, Mansfield, MA 02048",
    streetAddress: "600 West St",
    city: "Mansfield",
    addressState: "MA",
    zip: "02048",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "600 West St, Mansfield, MA 02048"
  },
  {
    id: "owe-ri-pascoag",
    state: "Rhode Island",
    stateCode: "RI",
    branch: "Pascoag",
    completeAddress: "271 Lake Shore Dr, Pascoag, RI 02859",
    streetAddress: "271 Lake Shore Dr",
    city: "Pascoag",
    addressState: "RI",
    zip: "02859",
    coverageRadius: "90 mi",
    maxTravel: "90 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "271 Lake Shore Dr, Pascoag, RI 02859"
  },
  {
    id: "owe-tx-grandprairie",
    state: "Texas",
    stateCode: "TX",
    branch: "Grand Prairie",
    completeAddress: "2550 114th St, Grand Prairie, TX 75050",
    streetAddress: "2550 114th St",
    city: "Grand Prairie",
    addressState: "TX",
    zip: "75050",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "In House",
    phone: "Not listed",
    mapQuery: "2550 114th St, Grand Prairie, TX 75050"
  },
  {
    id: "owe-tx-houston",
    state: "Texas",
    stateCode: "TX",
    branch: "Houston",
    completeAddress: "6623 Theall Rd, Houston, TX 77066",
    streetAddress: "6623 Theall Rd",
    city: "Houston",
    addressState: "TX",
    zip: "77066",
    coverageRadius: "200 mi",
    maxTravel: "Not listed",
    teamType: "In House",
    phone: "Not listed",
    mapQuery: "6623 Theall Rd, Houston, TX 77066"
  },
  {
    id: "owe-tx-midland",
    state: "Texas",
    stateCode: "TX",
    branch: "Midland",
    completeAddress: "1020 E. County Rd. 140, Midland, TX 79706",
    streetAddress: "1020 E. County Rd. 140",
    city: "Midland",
    addressState: "TX",
    zip: "79706",
    coverageRadius: "300 mi",
    maxTravel: "300 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "1020 E. County Rd. 140, Midland, TX 79706"
  },
  {
    id: "owe-tx-sanantonio-1",
    state: "Texas",
    stateCode: "TX",
    branch: "San Antonio",
    completeAddress: "4210 I-35, Ste 301, San Antonio, TX 78218",
    streetAddress: "4210 I-35, Ste 301",
    city: "San Antonio",
    addressState: "TX",
    zip: "78218",
    coverageRadius: "560 mi",
    maxTravel: "560 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "4210 I-35, Ste 301, San Antonio, TX 78218"
  },
  {
    id: "owe-tx-sanantonio-2",
    state: "Texas",
    stateCode: "TX",
    branch: "San Antonio",
    completeAddress: "138 Palma Noce, San Antonio, TX 78253",
    streetAddress: "138 Palma Noce",
    city: "San Antonio",
    addressState: "TX",
    zip: "78253",
    coverageRadius: "300 mi",
    maxTravel: "300 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "138 Palma Noce, San Antonio, TX 78253"
  },
  {
    id: "owe-va-manassas",
    state: "Virginia",
    stateCode: "VA",
    branch: "Manassas",
    completeAddress: "8174 Peakwood Ct, Apt 10, Manassas, VA 20111",
    streetAddress: "8174 Peakwood Ct, Apt 10",
    city: "Manassas",
    addressState: "VA",
    zip: "20111",
    coverageRadius: "100 mi",
    maxTravel: "100 mi",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "8174 Peakwood Ct, Apt 10, Manassas, VA 20111"
  },
  {
    id: "owe-va-norfolk",
    state: "Virginia",
    stateCode: "VA",
    branch: "Norfolk",
    completeAddress: "525 McFarland Rd, Norfolk, VA 23505",
    streetAddress: "525 McFarland Rd",
    city: "Norfolk",
    addressState: "VA",
    zip: "23505",
    coverageRadius: "230 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "525 McFarland Rd, Norfolk, VA 23505"
  },
  {
    id: "owe-va-richmond",
    state: "Virginia",
    stateCode: "VA",
    branch: "Richmond",
    completeAddress: "4273 Carolina Ave, Richmond, VA 23222",
    streetAddress: "4273 Carolina Ave",
    city: "Richmond",
    addressState: "VA",
    zip: "23222",
    coverageRadius: "100 mi",
    maxTravel: "Not listed",
    teamType: "Integrated Installer",
    phone: "Not listed",
    mapQuery: "4273 Carolina Ave, Richmond, VA 23222"
  }
];

// Helper: Get branches filtered by state ("ALL" or State Name / State Code)
function getBranchesForState(selectedState) {
  if (!selectedState || selectedState === 'ALL' || selectedState.toLowerCase() === 'all states') {
    return OWE_BRANCH_LOCATIONS;
  }
  const clean = selectedState.trim().toLowerCase();
  return OWE_BRANCH_LOCATIONS.filter(b => 
    b.state.toLowerCase() === clean || 
    b.stateCode.toLowerCase() === clean
  );
}

// Helper: Get unique branch states with counts
function getBranchStatesWithCounts() {
  const counts = {};
  OWE_BRANCH_LOCATIONS.forEach(b => {
    counts[b.state] = (counts[b.state] || 0) + 1;
  });
  return counts;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    US_STATES, 
    INSTALLERS_CONFIG, 
    WAREHOUSES_DATA, 
    OWE_BRANCH_LOCATIONS,
    getInstallersForState, 
    getStateStats,
    getBranchesForState,
    getBranchStatesWithCounts
  };
}

