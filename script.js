// ==========================================================================
// SolarHelp — Master Application Logic
// Handles: Redlines State Directory, Warehouses, Navigation Routing, PPW Calculators
// ==========================================================================

const $ = (id) => document.getElementById(id);

// --------------------------------------------------------------------------
// Navigation & View Routing
// --------------------------------------------------------------------------
const views = {
  redlines: $('view-redlines'),
  warehouses: $('view-warehouses'),
  tools: $('view-tools')
};

const navLinks = {
  redlines: $('nav-redlines'),
  warehouses: $('nav-warehouses-btn'),
  tools: $('nav-tools-btn')
};

let currentView = 'redlines';

function switchView(viewName, options = {}) {
  if (!views[viewName]) viewName = 'redlines';
  currentView = viewName;

  // Toggle view containers
  Object.keys(views).forEach(key => {
    if (key === viewName) {
      views[key].classList.remove('hidden');
    } else {
      views[key].classList.add('hidden');
    }
  });

  // Update main nav active indicators
  document.querySelectorAll('.main-nav .nav-link').forEach(link => link.classList.remove('active'));
  if (navLinks[viewName]) {
    navLinks[viewName].classList.add('active');
  }

  // Handle warehouse sub-tabs
  if (viewName === 'warehouses' && options.tab) {
    selectWarehouseTab(options.tab);
  }

  // Handle auto-scroll to element if requested
  if (options.scrollId) {
    const targetEl = $(options.scrollId);
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Close mobile drawer if open
  const mobileDrawer = $('mobile-drawer');
  const mobileToggle = $('mobile-toggle-btn');
  if (mobileDrawer && !mobileDrawer.hidden) {
    mobileDrawer.hidden = true;
    mobileToggle.setAttribute('aria-expanded', 'false');
  }
}

// Handle Hash Routing
function handleHashRoute() {
  const hash = window.location.hash.replace('#', '') || 'redlines';

  if (hash === 'redlines') {
    switchView('redlines');
  } else if (hash === 'warehouses') {
    switchView('warehouses');
  } else if (hash === 'warehouses-owe') {
    switchView('warehouses', { tab: 'owe' });
  } else if (hash === 'warehouses-sunvena') {
    switchView('warehouses', { tab: 'sunvena' });
  } else if (hash === 'tools') {
    switchView('tools', { scrollId: 'calculator-form' });
  } else if (hash === 'tools-quick') {
    switchView('tools', { scrollId: 'quick-ppw-heading' });
  } else {
    switchView('redlines');
  }
}

window.addEventListener('hashchange', handleHashRoute);

// Mobile Drawer Toggle
const mobileToggleBtn = $('mobile-toggle-btn');
const mobileDrawer = $('mobile-drawer');

if (mobileToggleBtn && mobileDrawer) {
  mobileToggleBtn.addEventListener('click', () => {
    const isExpanded = mobileToggleBtn.getAttribute('aria-expanded') === 'true';
    mobileToggleBtn.setAttribute('aria-expanded', !isExpanded);
    mobileDrawer.hidden = isExpanded;
  });
}

// Close mobile drawer when any link clicked
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileDrawer) mobileDrawer.hidden = true;
    if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', 'false');
  });
});


// --------------------------------------------------------------------------
// Warehouse Tabs (OWE & Sunvena)
// --------------------------------------------------------------------------
function selectWarehouseTab(tabName) {
  const oweBtn = $('tab-btn-owe');
  const sunvenaBtn = $('tab-btn-sunvena');
  const owePanel = $('w-panel-owe');
  const sunvenaPanel = $('w-panel-sunvena');

  if (tabName === 'sunvena') {
    sunvenaBtn.classList.add('active');
    oweBtn.classList.remove('active');
    sunvenaPanel.classList.remove('hidden');
    owePanel.classList.add('hidden');
  } else {
    oweBtn.classList.add('active');
    sunvenaBtn.classList.remove('active');
    owePanel.classList.remove('hidden');
    sunvenaPanel.classList.add('hidden');
  }
}

if ($('tab-btn-owe')) {
  $('tab-btn-owe').addEventListener('click', () => selectWarehouseTab('owe'));
}
if ($('tab-btn-sunvena')) {
  $('tab-btn-sunvena').addEventListener('click', () => selectWarehouseTab('sunvena'));
}

// "View Redlines" buttons in warehouse panels
document.querySelectorAll('.view-rates-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const installer = btn.getAttribute('data-filter-installer');
    switchView('redlines');
    window.location.hash = 'redlines';
    if (installer && $('installer-search')) {
      $('installer-search').value = installer;
      renderRedlines();
    }
  });
});

// --------------------------------------------------------------------------
// OWE Branch Locations Table Controller
// --------------------------------------------------------------------------
const branchStateSelect = $('branch-state-select');
const branchCountBadge = $('branch-count-badge');
const branchTableBody = $('branch-table-body');

let currentBranchState = 'ALL';

function initBranchLocationsTable() {
  if (!branchStateSelect || !window.OWE_BRANCH_LOCATIONS) return;

  // Extract unique states from OWE_BRANCH_LOCATIONS
  const statesSet = new Set();
  window.OWE_BRANCH_LOCATIONS.forEach(b => {
    if (b.state) statesSet.add(b.state);
  });
  const sortedStates = Array.from(statesSet).sort();

  branchStateSelect.innerHTML = '<option value="ALL">All States</option>';
  sortedStates.forEach(st => {
    const opt = document.createElement('option');
    opt.value = st;
    opt.textContent = st;
    branchStateSelect.appendChild(opt);
  });

  branchStateSelect.addEventListener('change', (e) => {
    currentBranchState = e.target.value;
    renderBranchLocations(currentBranchState);
  });

  renderBranchLocations(currentBranchState);
}

function renderBranchLocations(selectedState = 'ALL') {
  if (!branchTableBody || !window.OWE_BRANCH_LOCATIONS) return;

  const branches = window.getBranchesForState ? window.getBranchesForState(selectedState) : window.OWE_BRANCH_LOCATIONS;

  // Update Branch Count Badge (e.g., "Texas - 5 warehouses", "All States - 39 warehouses")
  if (branchCountBadge) {
    const count = branches.length;
    const label = selectedState === 'ALL' ? 'All States' : selectedState;
    branchCountBadge.textContent = `${label} - ${count} warehouse${count === 1 ? '' : 's'}`;
  }

  branchTableBody.innerHTML = '';

  if (branches.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="9" class="empty-table-msg" style="text-align:center; padding:30px; color:#64748b;">No warehouse branches found for ${escapeHtml(selectedState)}.</td>`;
    branchTableBody.appendChild(tr);
    return;
  }

  branches.forEach(branch => {
    const tr = document.createElement('tr');
    // Stable unique ID as key attribute & DOM id
    tr.id = branch.id;
    tr.setAttribute('key', branch.id);
    tr.setAttribute('data-id', branch.id);

    // Verified Google Maps URL using verified mapQuery
    const fullAddress = branch.mapQuery || branch.completeAddress;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

    tr.innerHTML = `
      <td class="branch-name-cell">${escapeHtml(branch.branch)}</td>
      <td>
        <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="branch-address-link" title="Open ${escapeHtml(fullAddress)} in Google Maps">
          <svg class="branch-map-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${escapeHtml(branch.completeAddress)}</span>
        </a>
      </td>
      <td>${escapeHtml(branch.city)}</td>
      <td><strong>${escapeHtml(branch.state)}</strong></td>
      <td>${escapeHtml(branch.zip)}</td>
      <td>
        <span class="team-badge ${branch.teamType === 'In House' ? 'in-house' : 'integrated'}">
          ${escapeHtml(branch.teamType)}
        </span>
      </td>
      <td>${escapeHtml(branch.coverageRadius)}</td>
      <td class="${branch.maxTravel === 'Not listed' ? 'branch-cell-muted' : ''}">${escapeHtml(branch.maxTravel)}</td>
      <td class="${branch.phone === 'Not listed' ? 'branch-cell-muted' : ''}">${escapeHtml(branch.phone)}</td>
    `;

    branchTableBody.appendChild(tr);
  });
}



// --------------------------------------------------------------------------
// State Redlines Directory Controller
// --------------------------------------------------------------------------
const stateSelect = $('state-select');
const installerSearch = $('installer-search');
const sortSelect = $('sort-select');
const installersGrid = $('installers-grid');
const installersTableWrap = $('installers-table-wrap');
const installersTableBody = $('installers-table-body');
const btnViewCards = $('btn-view-cards');
const btnViewTable = $('btn-view-table');

let currentState = 'FL'; // Default to Florida as requested, or popular
let currentViewMode = 'cards'; // 'cards' | 'table'

// Initialize State Select Dropdown
function initStateDropdown() {
  if (!stateSelect || !window.US_STATES) return;
  stateSelect.innerHTML = '';

  window.US_STATES.forEach(st => {
    const option = document.createElement('option');
    option.value = st.code;
    option.textContent = `${st.name} (${st.code})`;
    if (st.code === currentState) option.selected = true;
    stateSelect.appendChild(option);
  });

  stateSelect.addEventListener('change', (e) => {
    currentState = e.target.value;
    updateActiveStateChip(currentState);
    renderRedlines();
  });
}

// Quick State Chips Handlers
function initQuickChips() {
  document.querySelectorAll('.state-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const stateCode = chip.getAttribute('data-state');
      if (stateCode) {
        currentState = stateCode;
        if (stateSelect) stateSelect.value = stateCode;
        updateActiveStateChip(currentState);
        renderRedlines();
      }
    });
  });
  updateActiveStateChip(currentState);
}

function updateActiveStateChip(code) {
  document.querySelectorAll('.state-chip').forEach(chip => {
    if (chip.getAttribute('data-state') === code) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
}

// View Toggle (Cards vs Table)
if (btnViewCards && btnViewTable) {
  btnViewCards.addEventListener('click', () => {
    currentViewMode = 'cards';
    btnViewCards.classList.add('active');
    btnViewCards.setAttribute('aria-pressed', 'true');
    btnViewTable.classList.remove('active');
    btnViewTable.setAttribute('aria-pressed', 'false');
    installersGrid.classList.remove('hidden');
    installersTableWrap.classList.add('hidden');
  });

  btnViewTable.addEventListener('click', () => {
    currentViewMode = 'table';
    btnViewTable.classList.add('active');
    btnViewTable.setAttribute('aria-pressed', 'true');
    btnViewCards.classList.remove('active');
    btnViewCards.setAttribute('aria-pressed', 'false');
    installersGrid.classList.add('hidden');
    installersTableWrap.classList.remove('hidden');
  });
}

// Search & Sort Listeners
if (installerSearch) {
  installerSearch.addEventListener('input', () => renderRedlines());
}
if (sortSelect) {
  sortSelect.addEventListener('change', () => renderRedlines());
}

// Render Redlines UI for Selected State
function renderRedlines() {
  if (!window.getInstallersForState) return;

  const rawInstallers = window.getInstallersForState(currentState);
  const stateObj = window.US_STATES.find(s => s.code === currentState) || { code: currentState, name: currentState };
  const stats = window.getStateStats(rawInstallers);

  // Update Stats Banner
  if ($('stat-state-name')) $('stat-state-name').textContent = `${stateObj.name} (${stateObj.code})`;
  if ($('stat-lowest-rate')) {
    $('stat-lowest-rate').innerHTML = stats.lowest !== null 
      ? `$${stats.lowest.toFixed(2)} <span class="rate-unit">/ W</span>` 
      : 'N/A';
  }
  if ($('stat-lowest-installer')) {
    $('stat-lowest-installer').textContent = stats.lowestInstallers && stats.lowestInstallers.length 
      ? `${stats.lowestInstallers.join(' & ')} (Best Rate)` 
      : 'No active rate';
  }
  if ($('stat-average-rate')) {
    $('stat-average-rate').innerHTML = stats.average !== null 
      ? `$${stats.average} <span class="rate-unit">/ W</span>` 
      : '—';
  }
  if ($('stat-installer-count')) {
    $('stat-installer-count').textContent = `${rawInstallers.length} Installers`;
  }

  // Filter by search query
  const query = (installerSearch ? installerSearch.value : '').trim().toLowerCase();
  let filtered = rawInstallers.filter(item => {
    if (!query) return true;
    return item.installer.toLowerCase().includes(query) ||
           item.coverageType.toLowerCase().includes(query) ||
           (item.notes && item.notes.toLowerCase().includes(query));
  });

  // Sort
  const sortBy = sortSelect ? sortSelect.value : 'lowest';
  filtered.sort((a, b) => {
    if (sortBy === 'lowest') {
      if (a.redline === null) return 1;
      if (b.redline === null) return -1;
      return a.redline - b.redline;
    } else if (sortBy === 'highest') {
      if (a.redline === null) return 1;
      if (b.redline === null) return -1;
      return b.redline - a.redline;
    } else if (sortBy === 'name') {
      return a.installer.localeCompare(b.installer);
    }
    return 0;
  });

  // Render Cards
  installersGrid.innerHTML = '';
  installersTableBody.innerHTML = '';

  const feedbackEl = $('results-feedback');
  if (filtered.length === 0) {
    const emptyHtml = `
      <div class="no-results-card">
        <h3>No installers match "${escapeHtml(query)}" in ${stateObj.name}</h3>
        <p>Try clearing your search query or select another state.</p>
      </div>
    `;
    installersGrid.innerHTML = emptyHtml;
    installersTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px;">No installers found.</td></tr>`;
    if (feedbackEl) feedbackEl.textContent = `Showing 0 installers for ${stateObj.name}.`;
    return;
  }

  if (feedbackEl) {
    feedbackEl.textContent = `Showing ${filtered.length} installer redlines for ${stateObj.name} (${stateObj.code}).`;
  }

  filtered.forEach(item => {
    const isLowest = stats.lowest !== null && item.redline === stats.lowest;
    const isNA = item.redline === null;

    // Scope Badge Class
    let badgeClass = '';
    if (item.coverageType.includes('All States')) badgeClass = 'nationwide';
    else if (item.coverageType.includes('Regional')) badgeClass = 'regional';

    // 1. Build Card Element
    const card = document.createElement('div');
    card.className = `installer-card ${isLowest ? 'is-lowest' : ''}`;

    let bestBadgeHtml = isLowest 
      ? `<span class="rate-badge-best">★ Lowest Rate in ${stateObj.code}</span>` 
      : '';

    let notesHtml = '';
    if (item.notes) {
      const isWarning = item.notes.toLowerCase().includes('n/a') || item.notes.toLowerCase().includes('not available');
      notesHtml = `
        <div class="card-notes ${isWarning ? 'na-warning' : ''}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>${escapeHtml(item.notes)}</span>
        </div>
      `;
    }

    const priceDisplay = isNA ? 'N/A' : `$${item.redline.toFixed(2)}`;
    const unitDisplay = isNA ? '' : '<span class="price-unit">/ Watt</span>';

    card.innerHTML = `
      <div class="card-top">
        <div class="installer-title-wrap">
          <h3 class="installer-name">${escapeHtml(item.installer)}</h3>
          <span class="scope-badge ${badgeClass}">${escapeHtml(item.coverageType)}</span>
        </div>
        ${bestBadgeHtml}
      </div>

      <div class="card-pricing">
        <span class="price-val">${priceDisplay}</span>
        ${unitDisplay}
      </div>

      ${notesHtml}

      <div class="card-footer">
        <button type="button" class="card-action-btn" data-redline="${item.redline ?? ''}" data-installer="${escapeHtml(item.installer)}" ${isNA ? 'disabled' : ''}>
          <span>Use in PPW Calculator</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    `;

    installersGrid.appendChild(card);

    // 2. Build Table Row
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <span class="table-installer-name">${escapeHtml(item.installer)}</span>
        ${isLowest ? ' <span class="rate-badge-best" style="font-size:0.65rem; padding:2px 6px;">Lowest</span>' : ''}
      </td>
      <td><strong>${stateObj.code}</strong></td>
      <td>
        <span class="table-rate-val ${isLowest ? 'best' : ''}">${priceDisplay}</span>
        ${!isNA ? ' <span style="font-size:0.8rem; color:#64748b;">/W</span>' : ''}
      </td>
      <td><span class="scope-badge ${badgeClass}">${escapeHtml(item.coverageType)}</span></td>
      <td><span style="font-size:0.85rem; color:#64748b;">${item.notes ? escapeHtml(item.notes) : '—'}</span></td>
      <td class="text-right">
        <button type="button" class="button button-secondary card-action-btn" style="height:36px; padding:0 12px; font-size:0.78rem;" data-redline="${item.redline ?? ''}" data-installer="${escapeHtml(item.installer)}" ${isNA ? 'disabled' : ''}>
          Use Rate &rarr;
        </button>
      </td>
    `;
    installersTableBody.appendChild(tr);
  });

  // Attach "Use in Calculator" click listeners
  attachRateButtonListeners();
}

function attachRateButtonListeners() {
  document.querySelectorAll('[data-redline]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const redlineVal = btn.getAttribute('data-redline');
      const installerName = btn.getAttribute('data-installer');
      if (!redlineVal || isNaN(Number(redlineVal))) return;

      // Transfer rate to Calculator Base PPW
      if (fields.basePpw) {
        fields.basePpw.value = Number(redlineVal).toFixed(2);
        activePpw = 'base';
      }

      // Switch to Tools view and scroll to calculator
      window.location.hash = 'tools';
      switchView('tools', { scrollId: 'calculator-form' });

      // Run calculation
      update('base');

      // Highlight the Base PPW field with a nice glow
      fields.basePpw.focus();
      if (validation) {
        validation.style.color = '#047857';
        validation.textContent = `Applied ${installerName} redline ($${Number(redlineVal).toFixed(2)}/W) to Base PPW!`;
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}


// --------------------------------------------------------------------------
// Solar PPW Calculator Proposal Breakdown Logic (Preserved & Enhanced)
// --------------------------------------------------------------------------
const fields = ['customerName', 'lenderProgram', 'systemSize', 'grossPpw', 'basePpw', 'customAdder', 'batteryName', 'batteryAmount', 'monthlyPayment'].reduce((acc, id) => ({ ...acc, [id]: $(id) }), {});
const form = $('calculator-form');
const validation = $('validation');
const breakdown = $('breakdown');
const copyButton = $('copyButton');
const copyStatus = $('copyStatus');
let activePpw = null;
let breakdownText = '';

const number = (input) => !input || input.value.trim() === '' ? null : Number(input.value);
const currency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
const ppw = (value) => Number(value).toFixed(2);
const validNumber = (value) => Number.isFinite(value) && value >= 0;

function update(source = activePpw, showErrors = false) {
  const size = number(fields.systemSize);
  const gross = number(fields.grossPpw);
  const base = number(fields.basePpw);
  const custom = number(fields.customAdder) ?? 0;
  const battery = number(fields.batteryAmount) ?? 0;
  const invalid = [size, gross, base, custom, battery].some((value) => value !== null && !validNumber(value));
  validation.textContent = '';
  validation.style.color = '#dc2626';
  copyStatus.textContent = '';

  if (invalid) return clearResults('Use zero or a positive number for all amount fields.');
  if (!size || size <= 0) {
    if (showErrors) validation.textContent = 'Enter a system size greater than zero to calculate PPW and the contract total.';
    return renderProposal({ size, gross, base, custom, battery });
  }

  const adders = custom + battery;
  const adjustment = adders / (size * 1000);
  let finalGross = gross;
  let finalBase = base;
  let derived = null;
  let calculatedLabel = '';

  if (source === 'base' && validNumber(base)) {
    finalGross = base + adjustment;
    derived = finalGross;
    calculatedLabel = 'Calculated Gross PPW';
  } else if (source === 'gross' && validNumber(gross)) {
    finalBase = gross - adjustment;
    derived = finalBase;
    calculatedLabel = 'Calculated Base PPW';
  } else if (validNumber(gross) && !validNumber(base)) {
    finalBase = gross - adjustment;
    derived = finalBase;
    calculatedLabel = 'Calculated Base PPW';
  } else if (validNumber(base) && !validNumber(gross)) {
    finalGross = base + adjustment;
    derived = finalGross;
    calculatedLabel = 'Calculated Gross PPW';
  } else if (!validNumber(gross) && !validNumber(base)) {
    if (showErrors) validation.textContent = 'Enter either Gross PPW or Base PPW to calculate the proposal total.';
    return renderProposal({ size, gross, base, custom, battery });
  }

  if (!validNumber(finalGross) || !validNumber(finalBase) || finalBase < 0) {
    return clearResults('The adders are greater than the selected Gross PPW. Increase Gross PPW or use Base PPW.');
  }

  renderProposal({ size, gross: finalGross, base: finalBase, derived, calculatedLabel, custom, battery });
}

function clearResults(message) {
  validation.textContent = message.includes('Add a') ? '' : message;
  breakdown.innerHTML = `<p class="empty-state">${message}</p>`;
  copyButton.disabled = true;
  breakdownText = '';
}

function renderProposal({ size, gross, base, derived = null, calculatedLabel = '', custom, battery }) {
  const name = fields.customerName.value.trim();
  const program = fields.lenderProgram.value;
  const payment = number(fields.monthlyPayment);
  const hasSize = validNumber(size) && size > 0;
  const hasGross = validNumber(gross);
  const hasBase = validNumber(base);
  const hasPayment = validNumber(payment);
  const hasDetails = Boolean(name) || hasSize || hasGross || hasBase || custom > 0 || battery > 0 || hasPayment;

  if (!hasDetails) {
    breakdown.innerHTML = '<p class="empty-state">Start entering proposal details to build your breakdown.</p>';
    copyButton.disabled = true;
    breakdownText = '';
    return;
  }

  const contract = hasSize && hasGross ? gross * size * 1000 : null;
  const adderLines = [];
  if (custom > 0) adderLines.push(`Custom Adder: ${currency(custom)}`);
  if (battery > 0) adderLines.push(`${fields.batteryName.value.trim() || 'Battery'}: ${currency(battery)}`);

  const identityLines = [
    name,
    hasBase ? `${ppw(base)} PPW (Base)` : hasGross ? `${ppw(gross)} PPW (Gross)` : '',
    hasSize ? `${size} kW System` : ''
  ].filter(Boolean);

  const financeLines = [
    program,
    contract === null ? '' : `Contract Total: ${currency(contract)}`,
    hasPayment ? `Monthly: ${currency(payment)}` : ''
  ].filter(Boolean);

  breakdownText = [
    identityLines.join('\n'),
    financeLines.join('\n'),
    adderLines.length ? `Adders:\n${adderLines.join('\n')}` : ''
  ].filter(Boolean).join('\n\n');

  const calculated = derived === null ? '' : `
    <div class="calculated-ppw">
      <span>${escapeHtml(calculatedLabel)}</span>
      <strong>${ppw(derived)} PPW</strong>
    </div>
  `;

  const identity = `
    ${name ? `<div class="customer">${escapeHtml(name)}</div>` : ''}
    ${hasBase ? `<div class="ppw">${ppw(base)} Base PPW</div>` : hasGross ? `<div class="ppw">${ppw(gross)} Gross PPW</div>` : ''}
    ${hasSize ? `<div>${escapeHtml(String(size))} kW System</div>` : ''}
  `;

  const finance = `
    <div class="finance">
      <div><strong>${escapeHtml(program)}</strong></div>
      ${contract === null ? '' : `<div class="amount">${currency(contract)}</div>`}
      ${hasPayment ? `<div>${currency(payment)} / month</div>` : ''}
    </div>
  `;

  const adders = adderLines.length ? `<div class="adders">Adders:<br>${adderLines.map(escapeHtml).join('<br>')}</div>` : '';

  breakdown.innerHTML = `${calculated}<div class="breakdown-content">${identity}${finance}${adders}</div>`;
  copyButton.disabled = false;
}

// Attach event listeners for Proposal Calculator
['grossPpw', 'basePpw'].forEach((id) => {
  if (fields[id]) {
    fields[id].addEventListener('input', () => {
      activePpw = id === 'grossPpw' ? 'gross' : 'base';
      update(activePpw);
    });
  }
});

['systemSize', 'customAdder', 'batteryAmount', 'batteryName', 'customerName', 'lenderProgram', 'monthlyPayment'].forEach((id) => {
  if (fields[id]) {
    fields[id].addEventListener('input', () => update(activePpw));
  }
});

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    update(activePpw, true);
  });
  form.addEventListener('reset', () => setTimeout(() => {
    activePpw = null;
    copyStatus.textContent = '';
    clearResults('Add a system size and either Gross PPW or Base PPW to see your proposal.');
  }, 0));
}

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(breakdownText);
      copyStatus.textContent = '✓ Breakdown copied to clipboard.';
    } catch {
      copyStatus.textContent = 'Copy failed. Please select and copy manually.';
    }
  });
}


// --------------------------------------------------------------------------
// Quick PPW Calculator Logic (Preserved & Enhanced)
// --------------------------------------------------------------------------
const quickPpwForm = $('quickPpwForm');
const quickLoanAmount = $('quickLoanAmount');
const quickSystemSize = $('quickSystemSize');
const quickSystemUnit = $('quickSystemUnit');
const quickPpwResult = $('quickPpwResult');
const quickPpwMessage = $('quickPpwMessage');

function calculateQuickPpw(showError = false) {
  if (!quickLoanAmount || !quickSystemSize) return;
  const loanAmount = number(quickLoanAmount);
  const systemSize = number(quickSystemSize);

  if (loanAmount === null || systemSize === null) {
    quickPpwResult.textContent = '—';
    quickPpwMessage.textContent = showError ? 'Enter both the loan amount and system size.' : 'Add your loan amount and system size.';
    return;
  }
  if (!validNumber(loanAmount) || !validNumber(systemSize) || systemSize <= 0) {
    quickPpwResult.textContent = '—';
    quickPpwMessage.textContent = 'Use a positive system size and a zero or positive loan amount.';
    return;
  }
  const watts = quickSystemUnit.value === 'kw' ? systemSize * 1000 : systemSize;
  quickPpwResult.textContent = `$${ppw(loanAmount / watts)} / W`;
  quickPpwMessage.textContent = `${currency(loanAmount)} ÷ ${new Intl.NumberFormat('en-US').format(watts)} watts`;
}

if (quickLoanAmount && quickSystemSize && quickSystemUnit) {
  [quickLoanAmount, quickSystemSize, quickSystemUnit].forEach((input) => {
    input.addEventListener('input', () => calculateQuickPpw());
  });
  quickSystemUnit.addEventListener('change', () => calculateQuickPpw());
}

if (quickPpwForm) {
  quickPpwForm.addEventListener('submit', (event) => {
    event.preventDefault();
    calculateQuickPpw(true);
  });
}

if ($('quickPpwReset')) {
  $('quickPpwReset').addEventListener('click', () => {
    quickPpwForm.reset();
    calculateQuickPpw();
    quickLoanAmount.focus();
  });
}


// --------------------------------------------------------------------------
// Initialization on DOM Content Loaded
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initStateDropdown();
  initQuickChips();
  renderRedlines();
  initBranchLocationsTable();
  handleHashRoute();
});
