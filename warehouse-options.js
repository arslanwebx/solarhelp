(function () {
  'use strict';

  const select = document.getElementById('branch-state-select');
  const data = window.SOLARHELP_DATA;

  if (!select || !data || !Array.isArray(data.WAREHOUSE_STATE_OPTIONS)) return;

  select.innerHTML = '';

  const allOption = document.createElement('option');
  allOption.value = 'ALL';
  allOption.textContent = 'All listed states / territories';
  select.appendChild(allOption);

  data.WAREHOUSE_STATE_OPTIONS.forEach((state) => {
    const option = document.createElement('option');
    option.value = state.code;
    option.textContent = `${state.name} (${state.code})${state.hasBranches ? '' : ' - no branch address listed'}`;
    select.appendChild(option);
  });

  select.value = 'ALL';
  select.dispatchEvent(new Event('change'));
})();
