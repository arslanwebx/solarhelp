// SolarHelp installer coverage overrides.
// Coverage is intentionally explicit: "all states" in the rate sheet does NOT mean nationwide coverage.
// Rates remain sourced from the existing redline sheet. Where coverage is confirmed but no rate
// exists in that sheet, the installer is shown with N/A rather than inventing a rate.

(function () {
  'use strict';

  if (typeof US_STATES !== 'undefined' && !US_STATES.some((state) => state.code === 'PR')) {
    US_STATES.push({ code: 'PR', name: 'Puerto Rico' });
  }

  const COVERAGE = [
    {
      name: 'OWE',
      states: ['AZ', 'CA', 'CO', 'FL', 'IL', 'MA', 'MD', 'ME', 'NH', 'NJ', 'NM', 'NY', 'PR', 'RI', 'TX', 'VA'],
      rates: {
        AZ: 2.00,
        CA: 2.35,
        CO: 2.20,
        FL: 2.20,
        IL: 2.40,
        MA: 2.50,
        MD: 2.50,
        ME: 2.50,
        NH: 2.50,
        NJ: 2.45,
        NM: 2.15,
        NY: null,
        PR: null,
        RI: 2.50,
        TX: 2.05,
        VA: 2.40
      }
    },
    {
      name: 'UNIVERSAL SOLAR',
      states: ['AZ', 'IL', 'NM', 'OH', 'IN'],
      rates: { AZ: 2.20, IL: 2.20, NM: 2.20, OH: 2.20, IN: 2.20 },
      notes: { IL: 'ON HOLD' }
    },
    {
      name: 'ZEO ENERGY',
      states: ['OH', 'FL', 'VA', 'PA'],
      rates: { OH: 2.24, FL: 2.24, VA: 2.24, PA: 2.39 }
    },
    {
      name: 'EMPOWER (NEW)',
      states: ['AR', 'AZ', 'CA', 'CO', 'CT', 'FL', 'GA', 'IA', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MO', 'NC', 'NH', 'NJ', 'NY', 'OH', 'OK', 'PA', 'RI', 'SC', 'TX', 'VA', 'VT', 'WA'],
      rates: {
        AR: 2.20, AZ: 2.00, CA: 2.25, CO: 2.25, CT: 2.45, FL: 2.05, GA: 2.10,
        IA: 2.25, IL: 2.45, IN: 2.30, KS: 2.25, KY: 2.30, LA: 2.20, MA: 2.45,
        MD: 2.35, ME: 2.45, MI: 2.30, MO: 2.25, NC: 2.15, NH: 2.45, NJ: 2.30,
        NY: 2.55, OH: 2.35, OK: 2.20, PA: 2.35, RI: 2.45, SC: 2.15, TX: 2.05,
        VA: 2.35, VT: 2.45, WA: 2.60
      }
    },
    {
      name: 'ACTION SOLAR',
      states: ['AZ', 'CA', 'CO', 'FL', 'GA', 'ID', 'MA', 'NV', 'NJ', 'NM', 'TX', 'UT', 'WI', 'WY'],
      rates: {
        AZ: 2.20, CA: 2.20, CO: 2.45, FL: 2.45, GA: 2.20, ID: 2.20, MA: 2.20,
        NV: 2.20, NJ: 2.20, NM: 2.20, TX: 2.45, UT: 2.20, WI: 2.20, WY: 2.20
      }
    },
    {
      name: 'SUNVENA',
      states: ['FL', 'GA'],
      rates: { FL: 2.15, GA: 2.15 }
    },
    {
      name: 'SUNDER (SUNPOWER/AMBIA)',
      states: ['CA', 'CO', 'CT', 'FL', 'ID', 'IL', 'IN', 'MD', 'MA', 'MI', 'NV', 'NC', 'OH', 'OR', 'PA', 'UT', 'VA', 'WA'],
      rates: {
        CA: 2.45,
        CO: 2.25,
        CT: 2.55,
        FL: null,
        ID: 2.50,
        IL: 2.35,
        IN: 2.35,
        MD: null,
        MA: 2.55,
        MI: 2.30,
        NV: 2.20,
        NC: 2.35,
        OH: 2.30,
        OR: 2.40,
        PA: null,
        UT: null,
        VA: 2.30,
        WA: 2.40
      }
    },
    {
      name: 'LUNEX SOLAR',
      states: ['CO', 'CT', 'FL', 'MA', 'RI'],
      rates: { CO: 2.30, CT: 2.30, FL: 2.30, MA: 2.30, RI: 2.30 }
    },
    {
      name: 'TRON SOLAR',
      states: ['IL', 'IN', 'WI'],
      rates: { IL: 2.45, IN: 2.45, WI: 2.45 }
    }
  ];

  function buildInstallerRow(installer, code) {
    const redline = Object.prototype.hasOwnProperty.call(installer.rates, code)
      ? installer.rates[code]
      : null;
    const explicitNote = installer.notes && installer.notes[code] ? installer.notes[code] : '';
    const missingRateNote = redline === null ? 'Coverage confirmed; redline not provided in the current rate sheet.' : '';
    const notes = [explicitNote, missingRateNote].filter(Boolean).join(' ');

    return {
      installer: installer.name,
      stateCode: code,
      redline,
      formattedRedline: redline === null ? 'N/A' : `$${redline.toFixed(2)}`,
      isAvailable: redline !== null,
      coverageType: 'Confirmed state coverage',
      sourceScope: 'Confirmed state coverage',
      notes
    };
  }

  getInstallersForState = function (stateCode) {
    const code = String(stateCode || '').trim().toUpperCase();
    if (!code) return [];

    return COVERAGE
      .filter((installer) => installer.states.includes(code))
      .map((installer) => buildInstallerRow(installer, code));
  };

  window.SOLARHELP_INSTALLER_COVERAGE = COVERAGE;
  window.getCoverageForInstaller = function (installerName) {
    const installer = COVERAGE.find((item) => item.name === installerName);
    if (!installer) return [];
    return installer.states.map((code) => buildInstallerRow(installer, code));
  };
})();
