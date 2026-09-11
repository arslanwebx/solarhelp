(() => {
  const input = document.getElementById('lenderProgram');
  if (!input) return;

  const listId = input.getAttribute('list');
  const datalist = listId ? document.getElementById(listId) : null;
  const programs = Array.from(datalist?.querySelectorAll('option') || [])
    .map((option) => option.value.trim())
    .filter(Boolean);

  if (!programs.length) return;

  input.removeAttribute('list');
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', 'lender-program-menu');

  const wrapper = document.createElement('div');
  wrapper.className = 'lender-combobox';
  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'lender-combobox-toggle';
  toggle.setAttribute('aria-label', 'Show lender programs');
  toggle.innerHTML = '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="m5.5 7.5 4.5 4.5 4.5-4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  wrapper.appendChild(toggle);

  const menu = document.createElement('div');
  menu.id = 'lender-program-menu';
  menu.className = 'lender-program-menu';
  menu.setAttribute('role', 'listbox');
  menu.hidden = true;
  wrapper.appendChild(menu);

  let visiblePrograms = [...programs];
  let activeIndex = -1;

  const renderOptions = () => {
    menu.innerHTML = '';
    activeIndex = -1;

    if (!visiblePrograms.length) {
      const empty = document.createElement('div');
      empty.className = 'lender-program-empty';
      empty.textContent = 'No matching lender programs';
      menu.appendChild(empty);
      return;
    }

    visiblePrograms.forEach((program, index) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'lender-program-option';
      option.setAttribute('role', 'option');
      option.dataset.index = String(index);
      option.textContent = program;
      option.addEventListener('mousedown', (event) => event.preventDefault());
      option.addEventListener('click', () => selectProgram(program));
      menu.appendChild(option);
    });
  };

  const openMenu = () => {
    if (!menu.hidden) return;
    menu.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    wrapper.classList.add('is-open');
  };

  const closeMenu = () => {
    if (menu.hidden) return;
    menu.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    wrapper.classList.remove('is-open');
    activeIndex = -1;
  };

  const selectProgram = (program) => {
    input.value = program;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    closeMenu();
    input.focus();
  };

  const updateActiveOption = () => {
    const options = menu.querySelectorAll('.lender-program-option');
    options.forEach((option, index) => {
      const active = index === activeIndex;
      option.classList.toggle('is-active', active);
      option.setAttribute('aria-selected', active ? 'true' : 'false');
      if (active) option.scrollIntoView({ block: 'nearest' });
    });
  };

  const filterPrograms = () => {
    const query = input.value.trim().toLowerCase();
    visiblePrograms = query
      ? programs.filter((program) => program.toLowerCase().includes(query))
      : [...programs];
    renderOptions();
  };

  input.addEventListener('focus', () => {
    filterPrograms();
    openMenu();
  });

  input.addEventListener('input', () => {
    filterPrograms();
    openMenu();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (menu.hidden) {
        filterPrograms();
        openMenu();
      }
      if (!visiblePrograms.length) return;
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      activeIndex = activeIndex < 0
        ? (direction > 0 ? 0 : visiblePrograms.length - 1)
        : (activeIndex + direction + visiblePrograms.length) % visiblePrograms.length;
      updateActiveOption();
      return;
    }

    if (event.key === 'Enter' && !menu.hidden && activeIndex >= 0) {
      event.preventDefault();
      selectProgram(visiblePrograms[activeIndex]);
      return;
    }

    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (menu.hidden) {
      visiblePrograms = [...programs];
      renderOptions();
      openMenu();
      input.focus();
    } else {
      closeMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (!wrapper.contains(event.target)) closeMenu();
  });

  wrapper.addEventListener('click', (event) => event.stopPropagation());

  renderOptions();

  const style = document.createElement('style');
  style.textContent = `
    .lender-combobox{position:relative;width:100%;min-width:0}
    .lender-combobox #lenderProgram{padding-right:46px;background:#fff;border-color:#cfd5da;box-shadow:none;transition:border-color .16s ease,box-shadow .16s ease}
    .lender-combobox #lenderProgram:hover{border-color:#adb5bc}
    .lender-combobox #lenderProgram:focus{border-color:#8d949b;box-shadow:0 0 0 3px rgba(40,46,52,.07)}
    .lender-combobox-toggle{position:absolute;top:1px;right:1px;z-index:2;width:43px;height:44px;display:grid;place-items:center;padding:0;border:0;border-left:1px solid #edf0f2;border-radius:0 7px 7px 0;background:#fff;color:#555e66;cursor:pointer;transition:color .16s ease,background .16s ease}
    .lender-combobox-toggle:hover{background:#fafbfb;color:#111418}
    .lender-combobox-toggle svg{transition:transform .18s ease}
    .lender-combobox.is-open .lender-combobox-toggle svg{transform:rotate(180deg)}
    .lender-program-menu{position:absolute;top:calc(100% + 7px);left:0;right:0;z-index:120;max-height:290px;overflow-y:auto;padding:6px;background:#fff;border:1px solid #dfe3e6;border-radius:10px;box-shadow:0 14px 34px rgba(15,18,22,.11);animation:lenderMenuIn .14s ease-out}
    .lender-program-menu[hidden]{display:none}
    .lender-program-option{width:100%;min-height:42px;display:flex;align-items:center;padding:9px 11px;border:0;border-radius:7px;background:#fff;color:#242a2f;text-align:left;font-size:14px;font-weight:600;line-height:1.35;cursor:pointer;transition:background .12s ease,color .12s ease}
    .lender-program-option:hover,.lender-program-option.is-active{background:#f4f6f7;color:#0e1114}
    .lender-program-empty{padding:11px;color:#7a8289;font-size:13px}
    @keyframes lenderMenuIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
    @media(max-width:640px){
      .lender-program-menu{max-height:250px;border-radius:9px}
      .lender-program-option{min-height:44px;padding:10px 11px}
    }
  `;
  document.head.appendChild(style);
})();
