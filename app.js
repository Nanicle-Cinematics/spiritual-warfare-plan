const DAYS = [
  ["Week 1: Identity & Authority", "New Identity", ["Ephesians 1:3-23", "2 Corinthians 5:17", "Colossians 2:9-15"], "Lord, help me live from victory instead of fighting for victory.", "What does this reveal about who I am in Christ?"],
  ["Week 1: Identity & Authority", "Authority of Jesus", ["Matthew 28:18-20", "Luke 10:17-20", "Philippians 2:5-11"], "Jesus, teach me to trust Your supreme authority.", "Where do I need to submit fear to Jesus' lordship?"],
  ["Week 1: Identity & Authority", "Authority Given to Believers", ["Luke 10:19", "Mark 16:15-20", "Acts 3:1-10"], "Lord, let my confidence rest in Your name, not my strength.", "How should authority be used with humility?"],
  ["Week 1: Identity & Authority", "The Believer's Position", ["Ephesians 2:1-10", "Romans 8"], "Father, establish my heart in grace and sonship.", "Which promise in Romans 8 strengthens me most?"],
  ["Week 1: Identity & Authority", "Christ's Victory", ["Hebrews 2:14-18", "1 John 3:8"], "Thank You, Jesus, for destroying the works of the devil.", "What part of Christ's victory do I need to remember today?"],
  ["Week 1: Identity & Authority", "Confidence in God", ["Psalm 27", "Psalm 91"], "Lord, be my light, salvation, refuge, and fortress.", "What fear must I answer with God's Word?"],
  ["Week 1: Identity & Authority", "Review & Meditation", ["Romans 8", "Psalm 91"], "Holy Spirit, seal these truths in my heart.", "What identity truth has become clearer this week?"],
  ["Week 2: Understanding the Battle", "The Armor of God", ["Ephesians 6:10-20"], "Lord, clothe me with truth, righteousness, peace, faith, salvation, and Your Word.", "Which piece of armor do I need to strengthen?"],
  ["Week 2: Understanding the Battle", "Strongholds of the Mind", ["2 Corinthians 10:3-6"], "Father, expose every false thought and bring it under Christ.", "What thought pattern needs to be renewed?"],
  ["Week 2: Understanding the Battle", "Submit, Resist, Stand", ["James 4", "1 Peter 5"], "Lord, give me humility to submit and courage to resist.", "Where do I need spiritual sobriety and watchfulness?"],
  ["Week 2: Understanding the Battle", "The Pattern of Deception", ["Genesis 3"], "Lord, make me alert to distortion, doubt, and disobedience.", "How did the serpent twist God's word?"],
  ["Week 2: Understanding the Battle", "Jesus and Temptation", ["Matthew 4"], "Jesus, teach me to answer temptation with Scripture.", "What 'It is written' verse do I need ready?"],
  ["Week 2: Understanding the Battle", "God's Sovereignty", ["Job 1-2"], "God, help me trust You even when I do not understand.", "What does Job teach about God's limits over Satan?"],
  ["Week 2: Understanding the Battle", "Invisible Conflict", ["Daniel 10"], "Lord, strengthen me to persist in prayer.", "What does this passage teach about delayed answers?"],
  ["Week 3: Prayer & Spiritual Weapons", "The Lord's Pattern of Prayer", ["Matthew 6", "Luke 11"], "Father, teach me to pray with reverence, dependence, and forgiveness.", "Which part of the Lord's Prayer do I neglect?"],
  ["Week 3: Prayer & Spiritual Weapons", "Bold Corporate Prayer", ["Acts 4"], "Lord, make me bold to speak and obey Your Word.", "How did the early church pray under pressure?"],
  ["Week 3: Prayer & Spiritual Weapons", "Worship in Chains", ["Acts 16"], "Lord, make worship my weapon in hard places.", "What prison situation needs praise today?"],
  ["Week 3: Prayer & Spiritual Weapons", "Victory Through Worship", ["2 Chronicles 20"], "Lord, help me stand still and see Your salvation.", "What battle must I surrender to God?"],
  ["Week 3: Prayer & Spiritual Weapons", "No Weapon Formed", ["Isaiah 54", "Psalm 18"], "God, be my rock, shield, fortress, and deliverer.", "What protection promise strengthens me?"],
  ["Week 3: Prayer & Spiritual Weapons", "Overcoming by Testimony", ["Revelation 12"], "Jesus, let Your blood and my testimony overcome accusation.", "What testimony of God's faithfulness can I speak?"],
  ["Week 3: Prayer & Spiritual Weapons", "Fasting & True Freedom", ["Isaiah 58", "Matthew 6"], "Lord, purify my motives and make my fasting fruitful.", "What kind of freedom does God desire?"],
  ["Week 4: Walking in Victory", "Abiding in Christ", ["John 15"], "Jesus, keep me connected to You as my true vine.", "What fruit should increase in my life?"],
  ["Week 4: Walking in Victory", "Walk in the Spirit", ["Galatians 5"], "Holy Spirit, lead me away from the flesh and into Your fruit.", "Which fruit of the Spirit do I need most?"],
  ["Week 4: Walking in Victory", "Renewed Mind", ["Romans 12"], "Lord, transform me by renewing my mind.", "What worldly pattern must I reject?"],
  ["Week 4: Walking in Victory", "Put Off, Put On", ["Colossians 3"], "Father, help me put off the old self and put on Christlike character.", "What must I put off today? What must I put on?"],
  ["Week 4: Walking in Victory", "The Shepherd's Protection", ["Psalm 23", "Psalm 121"], "Lord, shepherd me and keep me from all evil.", "How does God's care calm my spirit?"],
  ["Week 4: Walking in Victory", "Build and Watch", ["Nehemiah 4"], "Lord, help me keep building while remaining watchful.", "What assignment must I protect in prayer?"],
  ["Week 4: Walking in Victory", "Faith Over Fear", ["1 Samuel 17"], "God, make me bold like David before Goliath.", "What giant am I facing with God's name?"],
  ["Week 4: Walking in Victory", "Discernment and Victory", ["Romans 16", "1 John 4"], "Lord, sharpen my discernment and keep me grounded in love.", "How do I test the spirits biblically?"],
  ["Week 4: Walking in Victory", "The Final Victory", ["Revelation 19-22"], "Jesus, keep my hope fixed on Your final victory.", "How does the end of the story give courage today?"]
];

const MEMORY = ["Ephesians 6:10-18", "Psalm 91", "Romans 8:31-39", "James 4:7-8", "2 Corinthians 10:3-5", "Isaiah 54:17", "Luke 10:19", "Philippians 4:6-9", "1 John 4:4", "Revelation 12:11", "Psalm 27"];
const KEY = "spiritual_warfare_pwa_v2";
const BIBLE_API = "https://bible-api.com/";
const ALL_SCRIPTURES = [...new Set([...DAYS.flatMap(day => day[2]), ...MEMORY])];
let deferredPrompt;
let refreshing = false;
let state = loadState();

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY)) || {};
    return {
      notes: stored.notes || {},
      done: stored.done || {},
      journal: stored.journal || "",
      scriptureCache: stored.scriptureCache || {}
    };
  } catch {
    return { notes: {}, done: {}, journal: "", scriptureCache: {} };
  }
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
  updateProgress();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function dayCard(day, index) {
  const n = index + 1;
  const isDone = Boolean(state.done[n]);
  return `<article class="day${isDone ? " complete" : ""}" id="day-${n}">
    <p class="week">${escapeHtml(day[0])}</p>
    <h2>Day ${n}: ${escapeHtml(day[1])}</h2>
    <h3>Read</h3>
    <ul>${day[2].map(ref => `<li>${scriptureButton(ref)}</li>`).join("")}</ul>
    <div class="prompt"><strong>Prayer:</strong><br>${escapeHtml(day[3])}</div>
    <h3>Reflection</h3>
    <p>${escapeHtml(day[4])}</p>
    <label for="note-${n}" class="muted">Notes for Day ${n}</label>
    <textarea id="note-${n}" data-note="${n}" placeholder="Write your notes for Day ${n}...">${escapeHtml(state.notes[n] || "")}</textarea>
    <label class="done"><input type="checkbox" data-done="${n}" ${isDone ? "checked" : ""}> Mark complete</label>
  </article>`;
}

function scriptureButton(ref) {
  const cached = Boolean(state.scriptureCache?.[ref]);
  return `<button class="scripture-link${cached ? " cached" : ""}" type="button" data-scripture="${escapeHtml(ref)}" title="${cached ? "Available from your local scripture cache" : "Open full scripture text"}">${escapeHtml(ref)}</button>`;
}

function nextDayIndex() {
  const next = DAYS.findIndex((_, index) => !state.done[index + 1]);
  return next === -1 ? DAYS.length - 1 : next;
}

function render() {
  const todayIndex = nextDayIndex();
  document.getElementById("today").innerHTML = dayCard(DAYS[todayIndex], todayIndex) +
    `<div class="card"><h2>Daily Mode</h2><p class="footer-note">This page opens to your next unfinished day. Your progress stays on this device.</p></div>`;

  document.getElementById("plan").innerHTML = `
    <div class="tools filter-row">
      <input class="search" id="planSearch" type="search" placeholder="Search by topic or passage" aria-label="Search the plan">
      <button class="primary" id="openNext" type="button">Next unfinished</button>
      <button class="secondary" id="showIncomplete" type="button" aria-pressed="false">Incomplete only</button>
    </div>
    <div id="planList">${DAYS.map(dayCard).join("")}</div>`;

  document.getElementById("memory").innerHTML = `
    <div class="card">
      <h2>Memory Scriptures</h2>
      <p class="footer-note">Use these as your core warfare verses. Read, speak, memorize, and pray them.</p>
    </div>
    <div class="memory">${MEMORY.map(v => `<div class="verse">${scriptureButton(v)}<br><small>Read, speak, memorize, and pray it.</small></div>`).join("")}</div>`;

  document.getElementById("journal").innerHTML = `
    <div class="card">
      <h2>Prayer Journal</h2>
      <p>Use this as your running prayer record through the 30 days.</p>
      <textarea id="journalBox" placeholder="Write prayers, dreams, testimonies, or answered prayers...">${escapeHtml(state.journal || "")}</textarea>
      <div class="tools">
        <button class="primary" id="exportData" type="button">Export Notes</button>
        <label class="secondary import-label">
          Import Notes
          <input id="importData" type="file" accept="application/json" hidden>
        </label>
        <button class="danger" id="reset" type="button">Reset All</button>
      </div>
    </div>`;

  bind();
  updateProgress();
}

function bind() {
  document.querySelectorAll("[data-note]").forEach(textarea => {
    textarea.addEventListener("input", event => {
      state.notes[event.target.dataset.note] = event.target.value;
      save();
    });
  });

  document.querySelectorAll("[data-done]").forEach(checkbox => {
    checkbox.addEventListener("change", event => {
      state.done[event.target.dataset.done] = event.target.checked;
      save();
      render();
    });
  });

  const journalBox = document.getElementById("journalBox");
  if (journalBox) {
    journalBox.addEventListener("input", event => {
      state.journal = event.target.value;
      save();
    });
  }

  document.getElementById("openNext")?.addEventListener("click", () => {
    switchTab("today");
    scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("showIncomplete")?.addEventListener("click", event => {
    const pressed = event.currentTarget.getAttribute("aria-pressed") === "true";
    event.currentTarget.setAttribute("aria-pressed", String(!pressed));
    filterPlan();
  });

  document.getElementById("planSearch")?.addEventListener("input", filterPlan);
  document.getElementById("reset")?.addEventListener("click", resetAll);
  document.getElementById("exportData")?.addEventListener("click", exportData);
  document.getElementById("importData")?.addEventListener("change", importData);

  document.querySelectorAll("[data-scripture]").forEach(button => {
    button.addEventListener("click", () => openScripture(button.dataset.scripture));
  });
}

function filterPlan() {
  const query = document.getElementById("planSearch")?.value.trim().toLowerCase() || "";
  const incompleteOnly = document.getElementById("showIncomplete")?.getAttribute("aria-pressed") === "true";
  document.querySelectorAll("#planList .day").forEach((card, index) => {
    const n = index + 1;
    const matchesSearch = !query || card.textContent.toLowerCase().includes(query);
    const matchesDone = !incompleteOnly || !state.done[n];
    card.hidden = !(matchesSearch && matchesDone);
  });
}

function updateProgress() {
  const count = Object.values(state.done).filter(Boolean).length;
  document.getElementById("doneCount").textContent = count;
  document.getElementById("bar").style.width = `${count / DAYS.length * 100}%`;
}

function switchTab(id) {
  document.querySelectorAll("[role='tab']").forEach(button => {
    const active = button.dataset.tab === id;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });

  document.querySelectorAll("[role='tabpanel']").forEach(panel => {
    const active = panel.id === id;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
}

function resetAll() {
  if (!confirm("Reset all progress, notes, and journal entries on this device?")) return;
  localStorage.removeItem(KEY);
  state = { notes: {}, done: {}, journal: "", scriptureCache: {} };
  render();
  switchTab("today");
}

function exportData() {
  const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), state }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "spiritual-warfare-plan-notes.json";
  link.click();
  URL.revokeObjectURL(url);
}

async function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const imported = data.state || data;
    state = {
      notes: imported.notes || {},
      done: imported.done || {},
      journal: imported.journal || "",
      scriptureCache: imported.scriptureCache || {}
    };
    save();
    render();
    switchTab("journal");
  } catch {
    alert("That file could not be imported. Please choose a valid JSON export.");
  } finally {
    event.target.value = "";
  }
}

function ensureReader() {
  let reader = document.getElementById("scriptureReader");
  if (reader) return reader;

  document.body.insertAdjacentHTML("beforeend", `
    <div class="reader-backdrop" id="scriptureReader" hidden>
      <section class="reader" role="dialog" aria-modal="true" aria-labelledby="readerTitle">
        <div class="reader-head">
          <div>
            <p class="section-label">Scripture Reader</p>
            <h2 id="readerTitle">Loading...</h2>
          </div>
          <button class="reader-close" id="readerClose" type="button" aria-label="Close scripture reader">Close</button>
        </div>
        <div class="reader-tools">
          <button class="secondary" id="readerPrev" type="button">Previous</button>
          <p class="reader-meta" id="readerMeta" aria-live="polite"></p>
          <button class="secondary" id="readerNext" type="button">Next</button>
        </div>
        <div class="reader-body" id="readerBody" tabindex="0"></div>
      </section>
    </div>`);

  reader = document.getElementById("scriptureReader");
  document.getElementById("readerClose").addEventListener("click", closeScripture);
  document.getElementById("readerPrev").addEventListener("click", () => openAdjacentScripture(-1));
  document.getElementById("readerNext").addEventListener("click", () => openAdjacentScripture(1));
  reader.addEventListener("click", event => {
    if (event.target === reader) closeScripture();
  });
  document.addEventListener("keydown", event => {
    if (reader.hidden) return;
    if (event.key === "Escape") closeScripture();
    if (event.key === "ArrowLeft" && event.metaKey) openAdjacentScripture(-1);
    if (event.key === "ArrowRight" && event.metaKey) openAdjacentScripture(1);
  });

  return reader;
}

async function openScripture(ref) {
  const reader = ensureReader();
  const title = document.getElementById("readerTitle");
  const body = document.getElementById("readerBody");
  const meta = document.getElementById("readerMeta");
  const previousFocus = document.activeElement;
  if (!reader.contains(previousFocus)) {
    reader.previousFocus = previousFocus;
  }
  reader.dataset.currentRef = ref;
  title.textContent = ref;
  meta.textContent = "";
  renderReaderNav(ref);
  reader.hidden = false;
  document.body.classList.add("reader-open");

  try {
    if (state.scriptureCache?.[ref]) {
      renderScriptureText(ref, state.scriptureCache[ref], "Loaded from your saved scripture cache.");
      return;
    }

    body.innerHTML = `<p class="reader-status">Loading ${escapeHtml(ref)}...</p>`;
    body.focus();
    const response = await fetch(`${BIBLE_API}${encodeURIComponent(ref)}?translation=kjv`);
    if (!response.ok) throw new Error("Scripture could not be loaded.");
    const data = await response.json();
    state.scriptureCache[ref] = normalizeScripturePayload(data);
    save();
    renderScriptureText(ref, state.scriptureCache[ref], "Saved for offline reading on this device.");
  } catch {
    const searchUrl = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=KJV`;
    meta.textContent = "Unable to load from the scripture API.";
    body.innerHTML = `
      <p class="reader-status">I could not load the full text right now. You can still open this passage online.</p>
      <a class="external-scripture" href="${searchUrl}" target="_blank" rel="noopener">Open ${escapeHtml(ref)} on Bible Gateway</a>`;
    body.focus();
  }
}

function normalizeScripturePayload(data) {
  return {
    fetchedAt: new Date().toISOString(),
    reference: data.reference || "",
    text: data.text || "",
    verses: Array.isArray(data.verses) ? data.verses.map(verse => ({
      verse: verse.verse,
      text: verse.text || ""
    })) : []
  };
}

function renderScriptureText(ref, payload, message) {
  const body = document.getElementById("readerBody");
  const meta = document.getElementById("readerMeta");
  const verses = Array.isArray(payload.verses) ? payload.verses : [];
  meta.textContent = message;
  body.innerHTML = verses.length
    ? `<div class="scripture-text">${verses.map(verse => `<p><sup>${escapeHtml(verse.verse)}</sup> ${escapeHtml(String(verse.text || "").trim())}</p>`).join("")}</div>`
    : `<p class="scripture-text">${escapeHtml(payload.text || "No scripture text was returned for this passage.")}</p>`;
  body.focus();
  document.querySelectorAll("[data-scripture]").forEach(button => {
    if (button.dataset.scripture !== ref) return;
    button.classList.add("cached");
    button.title = "Available from your local scripture cache";
  });
}

function renderReaderNav(ref) {
  const index = ALL_SCRIPTURES.indexOf(ref);
  const prev = document.getElementById("readerPrev");
  const next = document.getElementById("readerNext");
  prev.disabled = index <= 0;
  next.disabled = index === -1 || index >= ALL_SCRIPTURES.length - 1;
}

function openAdjacentScripture(direction) {
  const reader = document.getElementById("scriptureReader");
  const current = reader?.dataset.currentRef;
  const index = ALL_SCRIPTURES.indexOf(current);
  const nextRef = ALL_SCRIPTURES[index + direction];
  if (!nextRef) return;
  openScripture(nextRef);
}

function closeScripture() {
  const reader = document.getElementById("scriptureReader");
  if (!reader) return;
  reader.hidden = true;
  document.body.classList.remove("reader-open");
  reader.previousFocus?.focus?.();
}

document.querySelectorAll("[role='tab']").forEach(button => {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
  button.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const tabs = [...document.querySelectorAll("[role='tab']")];
    const current = tabs.indexOf(event.currentTarget);
    const next = event.key === "Home" ? 0 :
      event.key === "End" ? tabs.length - 1 :
      event.key === "ArrowRight" ? (current + 1) % tabs.length :
      (current - 1 + tabs.length) % tabs.length;
    tabs[next].focus();
    switchTab(tabs[next].dataset.tab);
  });
});

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredPrompt = event;
  document.getElementById("installBtn").hidden = false;
});

document.getElementById("installBtn").addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById("installBtn").hidden = true;
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then(registration => {
    registration.addEventListener("updatefound", () => {
      const worker = registration.installing;
      if (!worker) return;
      worker.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          showUpdatePrompt(worker);
        }
      });
    });
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    location.reload();
  });
}

render();

function showUpdatePrompt(worker) {
  if (document.getElementById("updatePrompt")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="update-prompt" id="updatePrompt" role="status">
      <span>A fresh version is ready.</span>
      <button class="primary" id="refreshApp" type="button">Update</button>
    </div>`);
  document.getElementById("refreshApp").addEventListener("click", () => {
    worker.postMessage({ type: "SKIP_WAITING" });
  });
}
