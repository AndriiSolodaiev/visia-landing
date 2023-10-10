document.addEventListener('click', evt => {
  const target = evt.target.closest('[data-lang-select]');
  const list = evt.target.closest('[data-lang-list]');

  if (target) {
    return target.classList.add('expanded');
  }

  if (!list) {
    document.querySelectorAll('[data-lang-select]').forEach(el => el.classList.remove('expanded'));
  }
});
