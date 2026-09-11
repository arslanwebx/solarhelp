(function () {
  'use strict';

  const stateNameByCode = Object.fromEntries(US_STATES.map((state) => [state.code, state.name]));
  const branchStateCodes = Array.from(new Set(OWE_BRANCH_LOCATIONS.map((branch) => branch.stateCode)));
  const coverageWithoutBranch = ['CT', 'VT'];
  const warehouseStateCodes = Array.from(new Set([...branchStateCodes, ...coverageWithoutBranch]));

  const warehouseStateOptions = warehouseStateCodes
    .map((code) => ({
      code,
      name: code === 'PR' ? 'Puerto Rico' : (stateNameByCode[code] || code),
      hasBranches: branchStateCodes.includes(code)
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  window.SOLARHELP_DATA = {
    US_STATES,
    STATE_NAME_BY_CODE: stateNameByCode,
    WAREHOUSE_STATE_OPTIONS: warehouseStateOptions,
    getInstallersForState,
    getBranchesForState: function (stateCode) {
      const code = String(stateCode || 'ALL').toUpperCase();

      return OWE_BRANCH_LOCATIONS
        .filter((branch) => code === 'ALL' || branch.stateCode === code)
        .map((branch) => ({
          id: branch.id,
          state: branch.state,
          stateCode: branch.stateCode,
          branch: branch.branch,
          address: branch.completeAddress,
          coverageRadius: branch.coverageRadius,
          maxTravel: branch.maxTravel,
          teamType: branch.teamType,
          phone: branch.phone
        }));
    }
  };
})();
