(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const page = document.body.dataset.page || 'home';
  const data = window.SOLARHELP_DATA || null;

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function numberFromInput(input) {
    if (!input || input.value.trim() === '') return null;
    return Number(input.value);
  }

  function isValidNumber(value) {
    return Number.isFinite(value) && value >= 0;
  }

  function currency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value);
  }

  function currencyFixed(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  function formatPpw(value) {
    return Number(value).toFixed(2);
  }

  function compactNumber(value) {
    return String(Number(value));
  }

  function simpleDollar(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return '$0';
    return `$${Number.isInteger(number) ? number : number.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')}`;
  }

  function initLegacyHashRedirects() {
    const hash = window.location.hash;
    if (page !== 'home' || !hash) return;
    if (hash === '#redlines') window.location.replace('/redlines');
    if (hash === '#warehouses-owe' || hash === '#warehouses') window.location.replace('/warehouses-owe');
  }

  function initRedlines() {
    if (!data) return;

    const stateSelect = $('state-select');
    const searchInput = $('installer-search');
    const tableBody = $('redline-table-body');
    const status = $('redline-status');

    if (!stateSelect || !tableBody || !status) return;

    stateSelect.innerHTML = '';
    data.US_STATES.forEach((state) => {
      const option = document.createElement('option');
      option.value = state.code;
      option.textContent = `${state.name} (${state.code})`;
      stateSelect.appendChild(option);
    });

    stateSelect.value = 'FL';

    function render() {
      const stateCode = stateSelect.value;
      const stateName = data.STATE_NAME_BY_CODE[stateCode] || stateCode;
      const query = (searchInput?.value || '').trim().toLowerCase();
      const allRows = data.getInstallersForState(stateCode);
      const rows = allRows.filter((row) => !query || row.installer.toLowerCase().includes(query));
      const numericRates = allRows.filter((row) => typeof row.redline === 'number').map((row) => row.redline);
      const lowest = numericRates.length ? Math.min(...numericRates) : null;

      status.textContent = `${stateName}: ${allRows.length} applicable installer${allRows.length === 1 ? '' : 's'}${query ? `, ${rows.length} shown after filter` : ''}.`;

      tableBody.innerHTML = '';

      if (!rows.length) {
        tableBody.innerHTML = `<tr><td class="empty-row" colspan="3">No installers match this filter.</td></tr>`;
        return;
      }

      rows.forEach((row) => {
        const tr = document.createElement('tr');
        const isLowest = typeof row.redline === 'number' && row.redline === lowest;
        const redlineText = row.redline === null ? 'N/A' : `$${formatPpw(row.redline)} / W`;
        const note = row.notes ? `<span class="row-note">${escapeHtml(row.notes)}</span>` : '';
        const scopeText = row.sourceScope || row.coverageType || '';
        tr.innerHTML = `
          <td><strong>${escapeHtml(row.installer)}</strong></td>
          <td><span class="rate ${isLowest ? 'lowest' : ''} ${row.redline === null ? 'na' : ''}">${redlineText}</span></td>
          <td>
            <span class="source-scope">${escapeHtml(scopeText)}</span>
            ${note}
          </td>
        `;
        tableBody.appendChild(tr);
      });
    }

    stateSelect.addEventListener('change', render);
    searchInput?.addEventListener('input', render);
    render();
  }

  function initWarehouses() {
    if (!data) return;

    const stateSelect = $('branch-state-select');
    const tableBody = $('branch-table-body');
    const status = $('branch-status');

    if (!stateSelect || !tableBody || !status) return;

    const options = [{ code: 'ALL', name: 'All states / territories' }, ...data.US_STATES, { code: 'PR', name: 'Puerto Rico' }];
    stateSelect.innerHTML = '';

    options.forEach((state) => {
      const option = document.createElement('option');
      option.value = state.code;
      option.textContent = state.code === 'ALL' ? state.name : `${state.name} (${state.code})`;
      stateSelect.appendChild(option);
    });

    stateSelect.value = 'ALL';

    function mapsUrl(address) {
      const cleaned = String(address)
        .replace(/\s*\(ZIP not listed\)\s*/i, '')
        .replace(/,\s*USA\s*$/i, '');
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleaned)}`;
    }

    function render() {
      const stateCode = stateSelect.value;
      const rows = data.getBranchesForState(stateCode);
      const label = stateCode === 'ALL'
        ? 'All locations'
        : stateCode === 'PR'
          ? 'Puerto Rico'
          : (data.STATE_NAME_BY_CODE[stateCode] || stateCode);

      status.textContent = `${label}: ${rows.length} branch${rows.length === 1 ? '' : 'es'} listed in the source.`;
      tableBody.innerHTML = '';

      if (!rows.length) {
        tableBody.innerHTML = `<tr><td class="empty-row" colspan="5">No OWE branch address is listed for ${escapeHtml(label)} in the source.</td></tr>`;
        return;
      }

      rows.forEach((branch) => {
        const tr = document.createElement('tr');
        const url = mapsUrl(branch.address);
        tr.innerHTML = `
          <td><strong>${escapeHtml(branch.branch)}</strong></td>
          <td><a class="address-link" href="${url}" target="_blank" rel="noopener noreferrer">${escapeHtml(branch.address)}</a></td>
          <td>${escapeHtml(branch.coverageRadius)}</td>
          <td>${escapeHtml(branch.maxTravel)}</td>
          <td>${escapeHtml(branch.teamType)}</td>
        `;
        tableBody.appendChild(tr);
      });
    }

    stateSelect.addEventListener('change', render);
    render();
  }

  function initProposalCalculator() {
    const form = $('calculator-form');
    if (!form) return;

    const fields = {
      customerName: $('customerName'),
      lenderProgram: $('lenderProgram'),
      systemSize: $('systemSize'),
      basePpw: $('basePpw'),
      grossPpw: $('grossPpw'),
      customAdderName: $('customAdderName'),
      customAdder: $('customAdder'),
      batteryName: $('batteryName'),
      batteryAmount: $('batteryAmount'),
      monthlyPayment: $('monthlyPayment')
    };

    const validation = $('validation');
    const breakdown = $('breakdown');
    const copyButton = $('copyButton');
    const copyStatus = $('copyStatus');

    let activePpw = null;
    let copyText = '';

    function clear(message = 'Enter proposal details to see the calculation.') {
      breakdown.innerHTML = `<p class="muted">${escapeHtml(message)}</p>`;
      copyButton.disabled = true;
      copyText = '';
    }

    function render(showErrors = false) {
      const size = numberFromInput(fields.systemSize);
      const baseInput = numberFromInput(fields.basePpw);
      const grossInput = numberFromInput(fields.grossPpw);
      const custom = numberFromInput(fields.customAdder) ?? 0;
      const battery = numberFromInput(fields.batteryAmount) ?? 0;
      const payment = numberFromInput(fields.monthlyPayment);
      const customer = fields.customerName.value.trim();
      const lender = fields.lenderProgram.value.trim();
      const customAdderName = fields.customAdderName.value.trim();
      const batteryName = fields.batteryName.value.trim() || 'Battery';

      validation.textContent = '';
      copyStatus.textContent = '';

      const values = [size, baseInput, grossInput, custom, battery, payment];
      if (values.some((value) => value !== null && !isValidNumber(value))) {
        validation.textContent = 'Use zero or a positive number in each amount field.';
        clear();
        return;
      }

      const hasMeaningfulInput = Boolean(
        customer ||
        size !== null ||
        baseInput !== null ||
        grossInput !== null ||
        custom > 0 ||
        battery > 0 ||
        payment !== null ||
        customAdderName
      );

      if (!hasMeaningfulInput) {
        clear();
        return;
      }

      const adders = custom + battery;
      const hasSize = size !== null && size > 0;
      const hasBase = baseInput !== null;
      const hasGross = grossInput !== null;
      const useGross = activePpw === 'gross' || (hasGross && !hasBase);
      const displayPpw = useGross ? grossInput : (hasBase ? baseInput : grossInput);

      let contractTotal = null;

      if (hasSize && (hasBase || hasGross)) {
        const watts = size * 1000;

        if (useGross) {
          const derivedBase = grossInput - (adders / watts);
          if (!isValidNumber(derivedBase)) {
            validation.textContent = 'Adders are greater than the Gross PPW. Increase Gross PPW or use Base PPW.';
          } else {
            contractTotal = grossInput * watts;
          }
        } else {
          contractTotal = (baseInput * watts) + adders;
        }
      } else if (showErrors) {
        if (!hasSize) validation.textContent = 'Enter a system size greater than zero.';
        else if (!hasBase && !hasGross) validation.textContent = 'Enter either Base PPW or Gross PPW.';
      }

      const topLines = [];
      if (customer) topLines.push(customer.toUpperCase());
      if (hasSize) topLines.push(`${compactNumber(size)} kW`);
      if (displayPpw !== null) topLines.push(`${compactNumber(displayPpw)} PPW`);

      const financeLines = [];
      if (lender) financeLines.push(lender);
      if (contractTotal !== null) financeLines.push(currencyFixed(contractTotal));
      if (payment !== null) financeLines.push(currencyFixed(payment));

      const adderLines = [];
      if (custom > 0) adderLines.push(`${customAdderName || 'Custom adder'} ${simpleDollar(custom)}`);
      if (battery > 0) adderLines.push(`${batteryName} ${simpleDollar(battery)}`);

      const groups = [];
      if (topLines.length) groups.push(topLines.join('\n'));
      if (financeLines.length) groups.push(financeLines.join('\n'));
      if (adderLines.length) groups.push(`Adders:\n${adderLines.join('\n')}`);

      copyText = groups.join('\n\n');

      if (!copyText) {
        clear();
        return;
      }

      breakdown.innerHTML = `<div class="proposal-preview-text">${escapeHtml(copyText).replace(/\n/g, '<br>')}</div>`;
      copyButton.disabled = false;
    }

    fields.basePpw.addEventListener('input', () => {
      activePpw = 'base';
      render();
    });

    fields.grossPpw.addEventListener('input', () => {
      activePpw = 'gross';
      render();
    });

    ['systemSize', 'customAdderName', 'customAdder', 'batteryName', 'batteryAmount', 'monthlyPayment', 'customerName'].forEach((key) => {
      fields[key].addEventListener('input', () => render());
    });

    fields.lenderProgram.addEventListener('input', () => render());
    fields.lenderProgram.addEventListener('change', () => render());

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      render(true);
    });

    form.addEventListener('reset', () => {
      window.setTimeout(() => {
        activePpw = null;
        validation.textContent = '';
        copyStatus.textContent = '';
        clear();
      }, 0);
    });

    copyButton.addEventListener('click', async () => {
      if (!copyText) return;
      try {
        await navigator.clipboard.writeText(copyText);
        copyStatus.textContent = 'Copied.';
      } catch {
        copyStatus.textContent = 'Copy failed. Select the text and copy it manually.';
      }
    });

    clear();
  }

  function initQuickPpw() {
    const form = $('quickPpwForm');
    const loanInput = $('quickLoanAmount');
    const sizeInput = $('quickSystemSize');
    const unitSelect = $('quickSystemUnit');
    const result = $('quickPpwResult');
    const message = $('quickPpwMessage');
    const reset = $('quickPpwReset');

    if (!form || !loanInput || !sizeInput || !unitSelect || !result || !message) return;

    function calculate(showErrors = false) {
      const loan = numberFromInput(loanInput);
      const size = numberFromInput(sizeInput);

      if (loan === null || size === null) {
        result.textContent = '-';
        message.textContent = showErrors ? 'Enter both the loan amount and system size.' : 'Add the loan amount and system size.';
        return;
      }

      if (!isValidNumber(loan) || !isValidNumber(size) || size <= 0) {
        result.textContent = '-';
        message.textContent = 'Use a positive system size and a zero or positive loan amount.';
        return;
      }

      const watts = unitSelect.value === 'kw' ? size * 1000 : size;
      result.textContent = `$${formatPpw(loan / watts)} / W`;
      message.textContent = `${currency(loan)} / ${new Intl.NumberFormat('en-US').format(watts)} watts`;
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      calculate(true);
    });

    [loanInput, sizeInput].forEach((input) => input.addEventListener('input', () => calculate()));
    unitSelect.addEventListener('change', () => calculate());

    reset?.addEventListener('click', () => {
      form.reset();
      calculate();
      loanInput.focus();
    });
  }

  initLegacyHashRedirects();

  if (page === 'redlines') initRedlines();
  if (page === 'warehouses-owe') initWarehouses();
  if (page === 'home') {
    initProposalCalculator();
    initQuickPpw();
  }
})();
