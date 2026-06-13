const GITHUB_USER = "fozayelibnayaz";
const CONTACT_EMAIL = "ibnayaz789@gmail.com";

const EMBEDDED_GITHUB_SNAPSHOT = {
  profile: {
    login: "fozayelibnayaz",
    name: "Fozayel Ibn Ayaz",
    html_url: "https://github.com/fozayelibnayaz",
    blog: "https://www.linkedin.com/in/fozayel-ibn-ayaz/",
    location: "Bangladesh",
    bio: "Focused on Full-Stack Web Development and Machine Learning, actively building my career around these two fields.",
    public_repos: 29,
    followers: 2,
    updated_at: "2026-05-21T15:32:09Z"
  },
  repos: [
    { name: "eagle3d-kpi-automation", html_url: "https://github.com/fozayelibnayaz/eagle3d-kpi-automation", description: "Automation work around KPI reporting and analytics workflows.", language: "Python", stargazers_count: 0, forks_count: 0, updated_at: "2026-06-13T00:00:00Z", languages_detail: { Python: 977780, Shell: 15349 } },
    { name: "AI-YouTube-Command-Center", html_url: "https://github.com/fozayelibnayaz/AI-YouTube-Command-Center", description: "A TypeScript command center for YouTube workflow management.", language: "TypeScript", stargazers_count: 0, forks_count: 0, updated_at: "2026-05-26T00:00:00Z", languages_detail: { TypeScript: 302282, JavaScript: 8611, CSS: 1537 } },
    { name: "Smart-Health-Consulting-System", html_url: "https://github.com/fozayelibnayaz/Smart-Health-Consulting-System", description: "A health consulting system for preliminary symptom-based guidance.", language: "PHP", stargazers_count: 0, forks_count: 0, updated_at: "2026-05-04T00:00:00Z", languages_detail: { PHP: 90547 } },
    { name: "EuroEdge-Admission-Group", html_url: "https://github.com/fozayelibnayaz/EuroEdge-Admission-Group", description: "Student consultancy website for the UK admission market.", language: "HTML", stargazers_count: 0, forks_count: 0, updated_at: "2026-04-07T00:00:00Z", languages_detail: { HTML: 851544, CSS: 83156, JavaScript: 42794 } },
    { name: "growth-intelligence-engine", html_url: "https://github.com/fozayelibnayaz/growth-intelligence-engine", description: "Growth intelligence and data workflow experiments.", language: "Python", stargazers_count: 0, forks_count: 0, updated_at: "2026-02-25T00:00:00Z", languages_detail: { Python: 109317095, JavaScript: 17367, CSS: 14282 } },
    { name: "Real-Time-Product-Management-Dashboard", html_url: "https://github.com/fozayelibnayaz/Real-Time-Product-Management-Dashboard", description: "Real-time product management dashboard with a modern full-stack build.", language: "TypeScript", stargazers_count: 0, forks_count: 0, updated_at: "2025-10-25T00:00:00Z", languages_detail: { TypeScript: 26154, CSS: 10525, JavaScript: 1125 } }
  ]
};

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

const repoDescriptions = {
  "eagle3d-kpi-automation": "Automation work around KPI reporting and analytics workflows.",
  "AI-YouTube-Command-Center": "A TypeScript command center for YouTube workflow management.",
  "Smart-Health-Consulting-System": "A health consulting system for preliminary symptom-based guidance.",
  "EuroEdge-Admission-Group": "Student consultancy website for the UK admission market.",
  "growth-intelligence-engine": "Growth intelligence and data workflow experiments.",
  "Real-Time-Product-Management-Dashboard": "Real-time product management dashboard with a modern full-stack build.",
  "eagle-products-backend": "Backend service for product data operations.",
  "Time-Series-Forecasting---Stock-Prices": "Stock-price forecasting with ARIMA, Prophet, and LSTM comparisons.",
  "Bus-Ticket-Counter": "Java-based system for ticket-counter workflow and transaction logic.",
  "Autism-Detection-Using-Machine-Learning": "Machine-learning project focused on autism detection workflows.",
  "Leukemia-Detection-Using-Machine-Learning": "A model exploration for leukemia-stage diagnosis support.",
  "Network-Intrusion-Detection-System-Using-Machine-Learning": "Machine-learning approach to network intrusion detection.",
  "Gadget-Blast": "PHP-based web project from an earlier development portfolio.",
  "Explore-Bangladesh": "PHP project exploring Bangladesh-focused web content."
};

const languageColors = ["#32f5c8", "#b76cff", "#d3ff71", "#62d9ff", "#ffd166", "#ff6b8a", "#94a3b8"];

window.addEventListener("DOMContentLoaded", () => {
  setYear();
  initMotionCanvas();
  initScrollProgress();
  initNavigation();
  initReveal();
  initSlider();
  initCardGlow();
  initCapabilityFilters();
  initCvDownload();
  initContact();
  initGithub();
  registerServiceWorker();
});


function initMotionCanvas() {
  const canvas = $('#motion-canvas');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  const context = canvas.getContext('2d');
  if (!context) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  const pointer = { x: 0, y: 0, active: false };

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      radius: 1 + Math.random() * 1.8,
      hue: Math.random() > 0.55 ? '50, 245, 200' : '183, 108, 255'
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const density = window.matchMedia('(max-width: 700px)').matches ? 26000 : 17500;
    const count = Math.min(105, Math.max(44, Math.floor((width * height) / density)));
    particles = Array.from({ length: count }, createParticle);
  }

  function drawConnection(a, b, distance, limit) {
    const alpha = Math.max(0, 1 - distance / limit) * 0.22;
    context.strokeStyle = `rgba(50, 245, 200, ${alpha})`;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.stroke();
  }

  function frame() {
    context.clearRect(0, 0, width, height);

    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index];
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;

      if (pointer.active) {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 170 && distance > 0.1) {
          particle.x -= (dx / distance) * 0.16;
          particle.y -= (dy / distance) * 0.16;
          drawConnection(particle, pointer, distance, 170);
        }
      }

      for (let next = index + 1; next < particles.length; next += 1) {
        const other = particles[next];
        const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
        if (distance < 128) drawConnection(particle, other, distance, 128);
      }

      context.fillStyle = `rgba(${particle.hue}, .72)`;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    }

    window.requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  }, { passive: true });
  window.addEventListener('pointerleave', () => {
    pointer.active = false;
  });

  resize();
  frame();
}

function initCardGlow() {
  document.addEventListener('pointermove', (event) => {
    const card = event.target.closest?.('.capability-card, .repo-card, .skill-card, .impact-card, .hero-info-grid article');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, { passive: true });

  document.addEventListener('pointerout', (event) => {
    const card = event.target.closest?.('.capability-card, .repo-card, .skill-card, .impact-card, .hero-info-grid article');
    if (!card || card.contains(event.relatedTarget)) return;
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '0%');
  });
}

function setYear() {
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
}

function initScrollProgress() {
  const bar = $('#scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    bar.style.transform = `scaleX(${progress})`;
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
}

function initNavigation() {
  const toggle = $(".nav-toggle");
  const menu = $("#site-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    $$("a", menu).forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const sections = $$('main section[id]');
  const links = $$(".nav-links a");
  if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}

function initReveal() {
  const elements = $$(".reveal");
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      instance.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -50px 0px" });

  elements.forEach((element) => observer.observe(element));
}

function initSlider() {
  const root = $("[data-slider]");
  if (!root) return;

  const slides = $$('[data-slide]', root);
  const dotsContainer = $('[data-dots]', root);
  const counter = $('#slide-counter');
  const previous = $('[data-prev]', root);
  const next = $('[data-next]', root);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let interval = null;
  let touchStart = 0;

  slides.forEach((slide, index) => {
    slide.setAttribute('aria-hidden', index === current ? 'false' : 'true');
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Show project ${index + 1}`);
    button.addEventListener('click', () => show(index));
    dotsContainer?.appendChild(button);
  });

  const dots = dotsContainer ? $$('button', dotsContainer) : [];

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === current));
    if (counter) counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }

  function start() {
    if (reducedMotion || interval || slides.length < 2) return;
    interval = window.setInterval(() => show(current + 1), 5600);
  }

  function stop() {
    if (!interval) return;
    window.clearInterval(interval);
    interval = null;
  }

  previous?.addEventListener('click', () => show(current - 1));
  next?.addEventListener('click', () => show(current + 1));
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);
  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
  root.addEventListener('touchstart', (event) => {
    touchStart = event.changedTouches[0].clientX;
  }, { passive: true });
  root.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) show(distance < 0 ? current + 1 : current - 1);
  }, { passive: true });

  show(0);
  start();
}


function initCapabilityFilters() {
  const buttons = $$('[data-service-filter]');
  const cards = $$('.capability-card[data-service-cat]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
    button.addEventListener('click', () => {
      const filter = button.dataset.serviceFilter || 'all';
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      cards.forEach((card) => {
        const categories = card.dataset.serviceCat || '';
        const visible = filter === 'all' || categories.split(/\s+/).includes(filter);
        card.classList.toggle('is-filtered-out', !visible);
        card.setAttribute('aria-hidden', visible ? 'false' : 'true');
      });
    });
  });
}


async function initCvDownload() {
  const links = $$('.cv-download-link');
  if (!links.length) return;

  const endpoint = links[0].dataset.driveCv || '/api/cv';
  const fallback = links[0].dataset.localCv || 'assets/Fozayel-Ibn-Ayaz-CV.pdf';
  let backendReady = false;

  try {
    const response = await fetch(endpoint, { method: 'HEAD', cache: 'no-store' });
    backendReady = response.ok;
  } catch {
    backendReady = false;
  }

  links.forEach((link) => {
    if (backendReady) {
      link.href = endpoint;
      link.removeAttribute('download');
      link.setAttribute('data-source', 'google-drive-backend');
      link.setAttribute('aria-label', 'Download the latest CV');
    } else {
      link.href = link.dataset.localCv || fallback;
      link.setAttribute('download', '');
      link.setAttribute('data-source', 'local-fallback');
    }

    link.addEventListener('click', () => {
      showToast(backendReady ? 'Preparing latest CV' : 'Downloading local CV copy');
    });
  });
}

function initContact() {
  const form = $('#contact-form');
  const copy = $('#copy-email');

  if (form) {
    const submit = $('#contact-submit', form) || $('button[type="submit"]', form);
    const state = document.createElement('div');
    state.className = 'form-state';
    state.setAttribute('role', 'status');
    state.setAttribute('aria-live', 'polite');
    form.appendChild(state);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const service = String(data.get('service') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const message = String(data.get('message') || '').trim();
      const endpoint = form.dataset.ajaxAction || `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
      const subjectField = $('input[name="_subject"]', form);
      if (subjectField) subjectField.value = `Portfolio enquiry — ${service || 'General'} — ${name || 'Visitor'}`;

      if (!name || !email || !message) {
        state.textContent = 'Please complete the required fields.';
        return;
      }

      if (submit) {
        submit.disabled = true;
        submit.textContent = 'Sending message…';
      }
      state.textContent = 'Sending directly to Fozayel’s email…';

      try {
        const payload = Object.fromEntries(data.entries());
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`Form service responded with ${response.status}`);

        form.reset();
        state.textContent = 'Message sent. Fozayel will receive it at ibnayaz789@gmail.com.';
        showToast('Message sent to email');
      } catch (error) {
        const subject = encodeURIComponent(`Portfolio enquiry from ${name || 'a visitor'}`);
        const body = encodeURIComponent(`Hi Fozayel,

Service: ${service || 'Not selected'}
Phone / WhatsApp: ${phone || 'Not provided'}

${message}

From: ${name}
Email: ${email}`);
        state.textContent = 'Direct form service is unavailable here. Opening your email app as a fallback.';
        showToast('Opening email fallback');
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.textContent = 'Send message to email';
        }
      }
    });
  }

  copy?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      showToast('Email copied to clipboard');
    } catch {
      showToast(CONTACT_EMAIL);
    }
  });
}

async function initGithub() {
  try {
    const live = await fetchLiveGithub();
    renderGithub(live, 'Live GitHub API');
  } catch (liveError) {
    try {
      const snapshot = await fetchJson('data/github-snapshot.json', 2500);
      renderGithub(snapshot, 'Local GitHub snapshot');
    } catch (snapshotError) {
      renderGithub(EMBEDDED_GITHUB_SNAPSHOT, 'Embedded GitHub snapshot');
    }
  }
}

async function fetchLiveGithub() {
  const [profile, repos] = await Promise.all([
    fetchJson(`https://api.github.com/users/${GITHUB_USER}`, 7000),
    fetchJson(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, 7000)
  ]);

  const visibleRepos = repos
    .filter((repo) => !repo.fork && !repo.archived)
    .slice(0, 10);

  await Promise.all(visibleRepos.slice(0, 8).map(async (repo) => {
    try {
      repo.languages_detail = await fetchJson(repo.languages_url, 4000);
    } catch {
      repo.languages_detail = repo.language ? { [repo.language]: 1 } : {};
    }
  }));

  return { profile, repos: visibleRepos.concat(repos.filter((repo) => !repo.fork && !repo.archived).slice(10)) };
}

async function fetchJson(url, timeout = 6000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timer);
  }
}

function renderGithub(data, label) {
  const profile = data.profile || {};
  const repos = Array.isArray(data.repos) ? data.repos.filter((repo) => !repo.fork && !repo.archived) : [];
  const syncLabel = $('#github-sync-label');
  const repoCount = $('#repo-count');
  const topLanguages = getLanguageBreakdown(repos);
  const lastUpdated = getMostRecentDate(repos, profile.updated_at);

  if (syncLabel) syncLabel.textContent = `${label} · ${formatDate(lastUpdated)}`;
  if (repoCount) repoCount.textContent = String(profile.public_repos || repos.length || 29);
  if (String(label).startsWith('Live')) updateGithubAvatars(profile);

  renderStats(profile, repos, topLanguages, lastUpdated);
  renderRepos(repos);
  renderLanguages(topLanguages);
}

function updateGithubAvatars(profile) {
  if (!profile?.avatar_url) return;
  $$('[data-github-avatar]').forEach((image) => {
    image.src = profile.avatar_url;
  });
}

function renderStats(profile, repos, languages, lastUpdated) {
  const target = $('#github-stats');
  if (!target) return;

  const topLanguage = languages[0]?.name || 'Mixed stack';
  const newestRepo = repos[0]?.name || 'Portfolio';

  const stats = [
    { label: 'Public repositories', value: profile.public_repos || repos.length || 0, note: 'Synced from profile' },
    { label: 'Followers', value: profile.followers ?? '—', note: 'Public GitHub count' },
    { label: 'Top language', value: topLanguage, note: 'By repository language bytes' },
    { label: 'Latest update', value: formatDate(lastUpdated, true), note: newestRepo }
  ];

  target.innerHTML = stats.map((item) => `
    <article class="github-stat">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(String(item.value))}</strong>
      <small>${escapeHtml(item.note)}</small>
    </article>
  `).join('');
}

function renderRepos(repos) {
  const target = $('#repo-grid');
  if (!target) return;

  const curated = repos.slice(0, 6);
  if (!curated.length) {
    target.innerHTML = '<p class="muted">Repository data is not available right now.</p>';
    return;
  }

  target.innerHTML = curated.map((repo) => {
    const description = repo.description || repoDescriptions[repo.name] || 'Public repository from Fozayel’s GitHub workspace.';
    const language = repo.language || firstLanguage(repo.languages_detail) || 'Code';
    return `
      <article class="repo-card">
        <div class="repo-meta">
          <span class="repo-chip">${escapeHtml(language)}</span>
          <span class="repo-chip">★ ${Number(repo.stargazers_count || 0)}</span>
          <span class="repo-chip">Updated ${escapeHtml(formatDate(repo.updated_at, true))}</span>
        </div>
        <h3>${escapeHtml(cleanRepoName(repo.name))}</h3>
        <p>${escapeHtml(description)}</p>
        <a class="text-link" href="${escapeAttribute(repo.html_url || `https://github.com/${GITHUB_USER}`)}" target="_blank" rel="noreferrer">Repository</a>
      </article>
    `;
  }).join('');
}

function renderLanguages(languages) {
  const target = $('#language-bars');
  if (!target) return;

  if (!languages.length) {
    target.innerHTML = '<p class="muted">Language data will appear after the next repository sync.</p>';
    return;
  }

  target.innerHTML = languages.slice(0, 7).map((language, index) => {
    const color = languageColors[index % languageColors.length];
    return `
      <div class="language-row">
        <header><span>${escapeHtml(language.name)}</span><span>${language.percent}%</span></header>
        <div class="language-track"><span style="--w:${language.percent}%; background:linear-gradient(90deg, ${color}, ${languageColors[(index + 1) % languageColors.length]});"></span></div>
      </div>
    `;
  }).join('');
}

function getLanguageBreakdown(repos) {
  const totals = new Map();

  repos.forEach((repo) => {
    const detail = repo.languages_detail || repo.languages || null;
    if (detail && typeof detail === 'object' && Object.keys(detail).length) {
      Object.entries(detail).forEach(([language, value]) => {
        totals.set(language, (totals.get(language) || 0) + Number(value || 0));
      });
    } else if (repo.language) {
      totals.set(repo.language, (totals.get(repo.language) || 0) + 1);
    }
  });

  const total = Array.from(totals.values()).reduce((sum, value) => sum + value, 0);
  if (!total) return [];

  return Array.from(totals.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value, percent: Math.max(1, Math.round((value / total) * 100)) }));
}

function getMostRecentDate(repos, fallback) {
  const dates = repos.map((repo) => repo.updated_at).filter(Boolean).map((date) => new Date(date).getTime()).filter(Number.isFinite);
  if (dates.length) return new Date(Math.max(...dates)).toISOString();
  return fallback || new Date().toISOString();
}

function firstLanguage(detail) {
  if (!detail || typeof detail !== 'object') return '';
  return Object.keys(detail)[0] || '';
}

function cleanRepoName(name = '') {
  return name
    .replace(/---/g, ': ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(value, short = false) {
  if (!value) return 'Recently';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Recently';
  return new Intl.DateTimeFormat('en', {
    month: short ? 'short' : 'long',
    day: short ? 'numeric' : '2-digit',
    year: 'numeric'
  }).format(date);
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttribute(value = '') {
  return escapeHtml(value).replace(/`/g, '&#096;');
}

function showToast(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.setTimeout(() => toast.classList.remove('is-visible'), 2300);
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (!location.protocol.startsWith('http')) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}
