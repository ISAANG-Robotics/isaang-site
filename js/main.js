const dataFiles = {
  site: 'data/site.json',
  history: 'data/history.json',
  awards: 'data/awards.json',
  projects: 'data/projects.json',
  members: 'data/members.json'
};

async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.textContent = value;
}

function setHtml(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.innerHTML = value;
}

function renderList(el, items, tag = 'ul') {
  if (!el) return;
  if (!items?.length) {
    el.innerHTML = '<div class="empty-state">아직 항목이 없습니다. data 파일에서 추가해 주세요.</div>';
    return;
  }
  const list = document.createElement(tag);
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
  el.innerHTML = '';
  Array.from(list.children).forEach(child => el.appendChild(child));
}

function renderHeroHighlights(items = []) {
  const el = document.getElementById('heroHighlights');
  if (!el) return;
  el.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    el.appendChild(li);
  });
}

function renderHistory(items = []) {
  const container = document.getElementById('historyList');
  if (!container) return;
  if (!items.length) {
    container.innerHTML = '<div class="empty-state">연혁 데이터를 추가해 주세요.</div>';
    return;
  }

  container.innerHTML = items.map(item => `
    <article class="timeline-item">
      <div class="timeline-year">${item.year}</div>
      <div class="timeline-content">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `).join('');
}

function makeLinkButtons(links = []) {
  if (!links.length) return '';
  return `
    <div class="card-links">
      ${links.map(link => `<a class="card-link" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`).join('')}
    </div>
  `;
}

function renderAwards(items = []) {
  const container = document.getElementById('awardsList');
  if (!container) return;
  if (!items.length) {
    container.innerHTML = '<div class="empty-state">수상 및 활동 데이터를 추가해 주세요.</div>';
    return;
  }

  container.innerHTML = items.map(item => `
    <article class="card">
      <span class="meta">${item.category}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      ${makeLinkButtons(item.links || [])}
    </article>
  `).join('');
}

function renderProjects(items = []) {
  const container = document.getElementById('projectsList');
  if (!container) return;
  if (!items.length) {
    container.innerHTML = '<div class="empty-state">프로젝트 데이터를 추가해 주세요.</div>';
    return;
  }

  container.innerHTML = items.map(item => `
    <article class="card">
      <span class="meta">${item.status}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="member-tags">
        ${(item.tags || []).map(tag => `<span>${tag}</span>`).join('')}
      </div>
      ${makeLinkButtons(item.links || [])}
    </article>
  `).join('');
}

function renderMemberSummary(items = []) {
  const container = document.getElementById('memberSummary');
  if (!container) return;

  const total = items.length;
  const projects = new Set(items.flatMap(item => item.projectFocus || [])).size;
  const majors = new Set(items.map(item => item.major).filter(Boolean)).size;
  const leads = items.filter(item => item.role?.includes('장') || item.role?.toLowerCase().includes('lead')).length;

  const summary = [
    { value: total, label: '총 인원' },
    { value: majors, label: '전공 분야' },
    { value: projects, label: '프로젝트 축' },
    { value: leads, label: '운영/리드 인원' }
  ];

  container.innerHTML = summary.map(item => `
    <div class="summary-box">
      <strong>${item.value}</strong>
      <span>${item.label}</span>
    </div>
  `).join('');
}

function renderMembers(items = []) {
  const container = document.getElementById('membersList');
  if (!container) return;
  if (!items.length) {
    container.innerHTML = '<div class="empty-state">인원 데이터를 추가해 주세요.</div>';
    return;
  }

  container.innerHTML = items.map(item => `
    <article class="card">
      <div class="member-role">${item.role}</div>
      <h3>${item.name}</h3>
      <p><strong>전공:</strong> ${item.major}</p>
      <p>${item.description}</p>
      <div class="member-tags">
        ${(item.skills || []).map(skill => `<span>${skill}</span>`).join('')}
      </div>
    </article>
  `).join('');
}

function renderFooterLinks(items = []) {
  const container = document.getElementById('footerLinks');
  if (!container) return;
  container.innerHTML = (items || []).map(link =>
    `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`
  ).join('');
}

function renderContact(contact = {}) {
  const el = document.getElementById('contactInfo');
  if (!el) return;

  const lines = [];
  if (contact.email) lines.push(`<div>Email: <a href="mailto:${contact.email}">${contact.email}</a></div>`);
  if (contact.instagram) lines.push(`<div>Instagram: <a href="${contact.instagram}" target="_blank" rel="noopener noreferrer">${contact.instagram}</a></div>`);
  if (contact.github) lines.push(`<div>GitHub: <a href="${contact.github}" target="_blank" rel="noopener noreferrer">${contact.github}</a></div>`);
  if (contact.note) lines.push(`<div>${contact.note}</div>`);

  el.innerHTML = lines.join('');
}

function setupMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navMenu');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

async function init() {
  setupMenu();

  try {
    const [site, history, awards, projects, members] = await Promise.all([
      loadJson(dataFiles.site),
      loadJson(dataFiles.history),
      loadJson(dataFiles.awards),
      loadJson(dataFiles.projects),
      loadJson(dataFiles.members)
    ]);

    document.title = site.siteTitle || 'ISAANG Robotics';
    setText('siteTagline', site.tagline);
    setText('footerClubName', site.clubName);
    setText('footerDescription', site.footerDescription);
    renderHeroHighlights(site.heroHighlights || []);
    setHtml('aboutContent', (site.aboutParagraphs || []).map(p => `<p>${p}</p>`).join(''));
    renderList(document.getElementById('recruitTargets'), site.recruitTargets || [], 'ul');
    renderList(document.getElementById('recruitProcess'), site.recruitProcess || [], 'ol');
    renderFooterLinks(site.footerLinks || []);
    renderContact(site.contact || {});

    renderHistory(history);
    renderAwards(awards);
    renderProjects(projects);
    renderMemberSummary(members);
    renderMembers(members);
  } catch (error) {
    console.error(error);
    document.body.insertAdjacentHTML('beforeend', `
      <div style="position:fixed;bottom:16px;left:16px;right:16px;padding:14px 16px;border-radius:14px;background:#3b1d1d;color:#ffd4d4;border:1px solid rgba(255,255,255,0.12);z-index:9999;">
        데이터를 불러오지 못했습니다. 파일 경로와 JSON 형식을 확인해 주세요.
      </div>
    `);
  }
}

init();
