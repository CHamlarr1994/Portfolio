const data = window.CV_DATA;
const $ = (s) => document.querySelector(s);
const el = (tag, cls, html = "") => { const node = document.createElement(tag); if (cls) node.className = cls; node.innerHTML = html; return node; };

function renderIdentity() {
  const names = data.identity.name.trim().split(/\s+/);
  $("#first-name").textContent = names.slice(0, -1).join(" ") || names[0];
  $("#last-name").textContent = names.length > 1 ? names.at(-1) : "";
  $("#brand-initials").textContent = data.identity.initials;
  $("#portrait-initials").textContent = data.identity.initials;
  $("#availability").textContent = data.identity.availability;
  $("#role").textContent = data.identity.role;
  $("#tagline").textContent = data.identity.tagline;
  $("#location").textContent = data.identity.location;
  $("#about").textContent = data.about;
  $("#email").textContent = data.identity.email;
  $("#email-link").href = `mailto:${data.identity.email}`;
  $("#phone").textContent = data.identity.phone;
  $("#footer-name").textContent = data.identity.name;
  document.title = `${data.identity.name} — ${data.identity.role}`;
  if (data.identity.photo) { $("#portrait").classList.add("has-photo"); $("#portrait").style.backgroundImage = `url('${data.identity.photo}')`; }
}

function renderAll() {
  $("#goals").innerHTML = data.goals.map((goal, i) => `<article class="goal-card"><div class="goal-number">0${i + 1}</div><p class="goal-horizon">${goal.horizon}</p><h3>${goal.title}</h3><p>${goal.text}</p></article>`).join("");
  $("#experiences").innerHTML = data.experiences.map(x => `<article class="timeline-item"><div class="period">${x.period}</div><div class="job"><h3>${x.role}</h3><p>${x.company} · ${x.location}</p></div><div class="job-detail"><p>${x.summary}</p><div class="tag-list">${x.highlights.map(t => `<span class="tag">${t}</span>`).join("")}</div></div></article>`).join("");
  renderProjects("Tous");
  const categories = ["Tous", ...new Set(data.projects.map(p => p.category))];
  $("#filters").innerHTML = categories.map((c, i) => `<button class="filter ${i === 0 ? "active" : ""}" data-filter="${c}">${c}</button>`).join("");
  $("#skills").innerHTML = data.skills.map((s, i) => `<article class="skill-group"><span class="num">0${i + 1}</span><h3>${s.group}</h3><ul>${s.items.map(x => `<li>${x}</li>`).join("")}</ul></article>`).join("");
  $("#additional-tools").innerHTML = data.additionalSkills.map(x => `<div class="tool-chip"><strong>${x.name}</strong><span>${x.level}</span></div>`).join("");
  $("#education").innerHTML = data.education.map(x => `<div class="edu-item"><span>${x.year}</span><div><strong>${x.degree}</strong><small>${x.school}</small></div></div>`).join("");
  $("#self-learning").innerHTML = data.selfLearning.map(x => `<div class="edu-item"><span>${x.year}</span><div><strong>${x.degree}</strong><small>${x.school}</small></div></div>`).join("");
  $("#languages").innerHTML = data.languages.map(x => `<li>${x}</li>`).join("");
  $("#interests").innerHTML = data.interests.map((x, i) => `<article class="interest-card"><span>0${i + 1}</span><h3>${x.title}</h3><p>${x.text}</p></article>`).join("");
  $("#social-links").innerHTML = data.links.map(x => `<a href="${x.url}" target="_blank" rel="noreferrer">${x.label} ↗</a>`).join("");
  $("#year").textContent = new Date().getFullYear();
}

function renderProjects(filter) {
  const list = filter === "Tous" ? data.projects : data.projects.filter(p => p.category === filter);
  $("#projects").innerHTML = list.map(p => `<a class="project-card" data-color="${p.color}" href="${p.url}" ${p.url !== "#" ? 'target="_blank" rel="noreferrer"' : ""}><div class="project-top"><span>${p.category}</span><span>${p.year}</span></div><div class="project-mark">${p.title.charAt(0)}</div><h3>${p.title}</h3><p>${p.description}</p><div class="tag-list">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div></a>`).join("");
}

renderIdentity(); renderAll();
$("#filters").addEventListener("click", e => { if (!e.target.matches(".filter")) return; document.querySelectorAll(".filter").forEach(x => x.classList.remove("active")); e.target.classList.add("active"); renderProjects(e.target.dataset.filter); });
$("#theme-toggle").addEventListener("click", () => { document.body.classList.toggle("dark"); localStorage.setItem("cv-theme", document.body.classList.contains("dark") ? "dark" : "light"); });
if (localStorage.getItem("cv-theme") === "dark" || (!localStorage.getItem("cv-theme") && matchMedia("(prefers-color-scheme:dark)").matches)) document.body.classList.add("dark");
const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(x => observer.observe(x));
const cursor = $(".cursor-dot"); document.addEventListener("pointermove", e => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });
document.addEventListener("pointerover", e => { if (e.target.closest("a,button")) { cursor.style.width = "28px"; cursor.style.height = "28px"; } });
document.addEventListener("pointerout", e => { if (e.target.closest("a,button")) { cursor.style.width = "10px"; cursor.style.height = "10px"; } });
