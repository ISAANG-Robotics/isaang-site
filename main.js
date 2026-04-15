/* ════════════════════════════════════════════════
   ISAANG Robotics — main.js
   데이터는 모두 data/*.json 에서 수정하세요.
   ════════════════════════════════════════════════ */

const DATA_FILES = {
  site:     'data/site.json',
  history:  'data/history.json',
  awards:   'data/awards.json',
  projects: 'data/projects.json',
  members:  'data/members.json',
};

// ── 유틸 ────────────────────────────────────────

async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function $(id) { return document.getElementById(id); }

function setText(id, value) {
  const el = $(id);
  if (el && value != null) el.textContent = value;
}

function pad(n) { return String(n).padStart(2, '0'); }

// ── 마키 ────────────────────────────────────────

function initMarquee() {
  const phrases = [
    'Build', 'Design', 'Learn', 'Innovate', 'Control',
    'Hardware', 'Vision', 'Embedded', 'Robotics',
    'A.I.', '二相', 'From Idea to Reality',
  ];
  // 두 번 복사해서 무한 루프 효과
  const doubled = [...phrases, ...phrases];
  const el = $('marqueeInner');
  if (!el) return;
  el.innerHTML = doubled.map(p => `<span>${p}</span>`).join('');
}

// ── 히어로 ──────────────────────────────────────

function renderHero(site) {
  // 한줄 소개 → 히어로 desc
  const desc = $('heroDesc');
  if (desc) desc.textContent = site.tagline || '';

  // 통계 박스 — site.json에 heroStats 배열 추가 시 표시됨
  // 예: "heroStats": [{"num":"05","label":"Members"}, ...]
  const statsEl = $('heroStats');
  if (statsEl && Array.isArray(site.heroStats) && site.heroStats.length) {
    statsEl.innerHTML = site.heroStats.map(s => `
      <div class="stat-item">
        <div class="stat-num">${s.num}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  }
}

// ── About ────────────────────────────────────────

function renderAbout(site) {
  const el = $('aboutText');
  if (!el) return;
  const paras = site.aboutParagraphs || [];
  if (!paras.length) {
    el.innerHTML = '<p class="empty-state">data/site.json의 aboutParagraphs를 수정해 주세요.</p>';
    return;
  }
  el.innerHTML = paras.map(p => `<p>${p}</p>`).join('');
}

// ── History ──────────────────────────────────────

function renderHistory(items) {
  const el = $('historyList');
  if (!el) return;
  if (!items?.length) {
    el.innerHTML = '<div class="empty-state">data/history.json에 연혁을 추가해 주세요.</div>';
    return;
  }
  el.innerHTML = items.map((item, i) => `
    <div class="timeline-item" data-reveal style="transition-delay:${i * 0.08}s">
      <div class="tl-year">${item.year}</div>
      <div class="tl-dot"></div>
      <div class="tl-content">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </div>
  `).join('');
}

// ── Awards ───────────────────────────────────────

function renderAwards(items) {
  const el = $('awardsList');
  if (!el) return;
  if (!items?.length) {
    el.innerHTML = '<div class="empty-state">data/awards.json에 수상 내역을 추가해 주세요.</div>';
    return;
  }
  el.innerHTML = items.map(item => `
    <div class="award-card" data-reveal>
      <div class="award-cat">${item.category}</div>
      <div class="award-title">${item.title}</div>
      <div class="award-desc">${item.description}</div>
      ${makeLinks(item.links)}
    </div>
  `).join('');
}

// ── Projects ─────────────────────────────────────

function renderProjects(items) {
  const el = $('projectsList');
  if (!el) return;
  if (!items?.length) {
    el.innerHTML = '<div class="empty-state">data/projects.json에 프로젝트를 추가해 주세요.</div>';
    return;
  }
  el.innerHTML = items.map(item => `
    <div class="project-card" data-reveal>
      <div class="project-status">${item.status}</div>
      <div class="project-title">${item.title}</div>
      <div class="project-desc">${item.description}</div>
      <div class="tags">
        ${(item.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      ${makeLinks(item.links)}
    </div>
  `).join('');
}

// ── Members ──────────────────────────────────────

function renderMembers(items) {
  const el = $('membersList');
  if (!el) return;
  if (!items?.length) {
    el.innerHTML = '<div class="empty-state">data/members.json에 인원을 추가해 주세요.</div>';
    return;
  }
  el.innerHTML = items.map((m, i) => `
    <div class="member-card" data-reveal style="transition-delay:${i * 0.07}s">
      <div class="member-index">${pad(i + 1)}</div>
      <div class="member-name">${m.name}</div>
      <div class="member-role-badge">${m.role}</div>
      <div class="member-major">${m.major}</div>
      ${m.description?.length
        ? `<div class="member-desc">${Array.isArray(m.description) ? m.description.join(' ') : m.description}</div>`
        : ''}
      ${m.skills?.length
        ? `<div class="member-skills">${m.skills.map(s => `<span class="member-skill">${s}</span>`).join('')}</div>`
        : ''}
    </div>
  `).join('');
}

// ── Recruit ──────────────────────────────────────

function renderRecruit(site) {
  // 모집 대상
  const targets = $('recruitTargets');
  if (targets) {
    const list = site.recruitTargets || [];
    targets.innerHTML = list.length
      ? list.map(t => `<li>${t}</li>`).join('')
      : '<li class="empty-state">data/site.json의 recruitTargets를 수정해 주세요.</li>';
  }

  // 절차
  const process = $('recruitProcess');
  if (process) {
    const list = site.recruitProcess || [];
    process.innerHTML = list.length
      ? list.map(p => `<li>${p}</li>`).join('')
      : '<li class="empty-state">data/site.json의 recruitProcess를 수정해 주세요.</li>';
  }

  // 연락처
  renderContact(site.contact || {});
}

function renderContact(c) {
  const el = $('contactInfo');
  if (!el) return;
  const rows = [];
  if (c.email)     rows.push(contactRow('Email',     c.email.startsWith('http') ? `<a href="mailto:${c.email}">${c.email}</a>` : c.email));
  if (c.instagram) rows.push(contactRow('Instagram', `<a href="${c.instagram}" target="_blank" rel="noopener">@${c.instagram.split('/').pop()}</a>`));
  if (c.github)    rows.push(contactRow('GitHub',    `<a href="${c.github}" target="_blank" rel="noopener">${c.github.split('/').pop()}</a>`));
  if (c.note)      rows.push(contactRow('Note',      c.note));
  el.innerHTML = rows.join('');
}

function contactRow(label, value) {
  return `
    <div class="contact-item">
      <span class="contact-label">${label}</span>
      <span class="contact-value">${value}</span>
    </div>
  `;
}

// ── Footer ───────────────────────────────────────

function renderFooter(site) {
  setText('footerClubName',    site.clubName        || 'ISAANG Robotics');
  setText('footerDescription', site.footerDescription || '');

  const linksEl = $('footerLinks');
  if (linksEl) {
    linksEl.innerHTML = (site.footerLinks || []).map(l =>
      `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`
    ).join('');
  }

  document.title = site.siteTitle || 'ISAANG Robotics';
}

// ── 공통 링크 렌더 ───────────────────────────────

function makeLinks(links = []) {
  if (!links?.length) return '';
  return `
    <div class="card-links">
      ${links.map(l => `<a class="card-link" href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a>`).join('')}
    </div>
  `;
}

// ── 스크롤 reveal ────────────────────────────────

function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

// ── 모바일 메뉴 ──────────────────────────────────

function initMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('navMenu');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );
}

// ── section 요소에 data-reveal 자동 부여 ─────────

function addRevealToSections() {
  document.querySelectorAll('.section-header, .about-layout, .about-sidebar, .recruit-layout').forEach(el => {
    el.setAttribute('data-reveal', '');
  });
}

// ── 진입점 ───────────────────────────────────────

async function init() {
  initMenu();
  initMarquee();
  addRevealToSections();

  try {
    const [site, history, awards, projects, members] = await Promise.all([
      loadJson(DATA_FILES.site),
      loadJson(DATA_FILES.history),
      loadJson(DATA_FILES.awards),
      loadJson(DATA_FILES.projects),
      loadJson(DATA_FILES.members),
    ]);

    renderHero(site);
    renderAbout(site);
    renderFooter(site);
    renderRecruit(site);

    renderHistory(history);
    renderAwards(awards);
    renderProjects(projects);
    renderMembers(members);

    // DOM 페인팅 후 IntersectionObserver 등록
    requestAnimationFrame(() => requestAnimationFrame(initReveal));

  } catch (err) {
    console.error(err);
    document.body.insertAdjacentHTML('beforeend', `
      <div style="
        position:fixed; bottom:16px; left:16px; right:16px;
        padding:14px 18px; border-radius:4px;
        background:#2a0a08; color:#ffb8b0;
        border:1px solid rgba(255,100,80,0.25);
        font-family:'Space Mono',monospace; font-size:0.75rem;
        letter-spacing:0.06em; z-index:9998;
      ">
        ⚠ 데이터를 불러오지 못했습니다. data/*.json 경로와 JSON 형식을 확인해 주세요.
      </div>
    `);
  }
}

init();
