// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const icon = this.querySelector('.faq-icon');
    const isOpen = answer.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-a.open').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-q.open').forEach(q => q.classList.remove('open'));
    document.querySelectorAll('.faq-icon.open').forEach(i => i.classList.remove('open'));
    // Open clicked if was closed
    if (!isOpen) {
      answer.classList.add('open');
      this.classList.add('open');
      icon.classList.add('open');
    }
  });
});

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ── FORM SUBMIT ──
const PIPEDREAM_URL = 'https://eox3nkr4zmbm2cg.m.pipedream.net';

document.querySelectorAll('.car-form').forEach(form => {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = 'Отправляем...';
    btn.disabled = true;

    const data = Object.fromEntries(new FormData(this));
    const pageTitle = document.title;

    const lines = [
      '<b>📋 Новая заявка на выкуп авто</b>',
      '',
      `<b>Страница:</b> ${pageTitle}`,
      `<b>Имя:</b> ${data.name || 'Не указано'}`,
      `<b>Телефон:</b> ${data.phone}`,
      `<b>Марка авто:</b> ${data.carBrand || 'Не указано'}`,
      `<b>Год выпуска:</b> ${data.year || 'Не указано'}`,
      `<b>Состояние:</b> ${data.condition || 'Не указано'}`,
    ];
    if (data.comment) lines.push(`<b>Комментарий:</b> ${data.comment}`);
    lines.push('', `<i>Время: ${new Date().toLocaleString('ru-RU')}</i>`);
    const message = lines.join('\n');

    try {
      const res = await fetch(PIPEDREAM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (res.ok) {
        this.reset();
        const successEl = this.closest('.form-box, .sidebar-form')?.querySelector('.form-success');
        if (successEl) {
          this.style.display = 'none';
          successEl.classList.add('show');
        } else {
          btn.textContent = '✓ Заявка отправлена!';
          btn.style.background = 'linear-gradient(135deg,#4CAF50,#388E3C)';
          setTimeout(() => { btn.textContent = origText; btn.style.background = ''; btn.disabled = false; }, 4000);
          return;
        }
      } else { throw new Error('error'); }
    } catch {
      btn.textContent = 'Ошибка — попробуйте ещё раз';
      btn.style.background = 'linear-gradient(135deg,#e74c3c,#c0392b)';
      setTimeout(() => { btn.textContent = origText; btn.style.background = ''; btn.disabled = false; }, 3000);
      return;
    }
    btn.textContent = origText;
    btn.disabled = false;
  });
});
