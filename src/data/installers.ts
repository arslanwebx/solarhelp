export const INSTALLERS = [
  {
    name: 'OWE',
    states: ['AZ', 'CA', 'CO', 'FL', 'IL', 'MA', 'MD', 'ME', 'NH', 'NJ', 'NM', 'NY', 'PR', 'RI', 'TX', 'VA'],
    stateNotes: {}
  },
  {
    name: 'UNIVERSAL SOLAR',
    states: ['AZ', 'IL', 'NM', 'OH', 'IN'],
    stateNotes: { IL: 'ON HOLD' }
  },
  {
    name: 'ZEO ENERGY',
    states: ['OH', 'FL', 'VA', 'PA'],
    stateNotes: {}
  },
  {
    name: 'EMPOWER (NEW)',
    states: ['AR', 'AZ', 'CA', 'CO', 'CT', 'FL', 'GA', 'IA', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MO', 'NC', 'NH', 'NJ', 'NY', 'OH', 'OK', 'PA', 'RI', 'SC', 'TX', 'VA', 'VT', 'WA'],
    stateNotes: {}
  },
  {
    name: 'ACTION SOLAR',
    states: ['AZ', 'CA', 'CO', 'FL', 'GA', 'ID', 'MA', 'NV', 'NJ', 'NM', 'TX', 'UT', 'WI', 'WY'],
    stateNotes: {}
  },
  {
    name: 'SUNVENA',
    states: ['FL', 'GA'],
    stateNotes: {}
  },
  {
    name: 'SUNDER (SUNPOWER/AMBIA)',
    states: ['CA', 'CO', 'CT', 'FL', 'ID', 'IL', 'IN', 'MD', 'MA', 'MI', 'NV', 'NC', 'OH', 'OR', 'PA', 'UT', 'VA', 'WA'],
    stateNotes: {}
  },
  {
    name: 'LUNEX SOLAR',
    states: ['CO', 'CT', 'FL', 'MA', 'RI'],
    stateNotes: {}
  },
  {
    name: 'TRON SOLAR',
    states: ['IL', 'IN', 'WI'],
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
