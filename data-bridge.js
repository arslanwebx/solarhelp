(function () {
  'use strict';

  const stateNameByCode = Object.fromEntries(US_STATES.map((state) => [state.code, state.name]));

  window.SOLARHELP_DATA = {
    US_STATES,
    STATE_NAME_BY_CODE: stateNameByCode,
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
