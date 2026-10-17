const STORAGE_KEYS = {
  personal: "resumePersonalData",
  summary: "section_summary",
  education: "section_education",
  experience: "section_experience",
  projects: "section_projects",
  skills: "section_skills",
  certifications: "section_certifications",
  languages: "section_languages",
  achievements: "section_achievements",
  coverLetter: "section_cover_letter"
};

function getJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getArray(key) {
  const value = getJSON(key, []);
  return Array.isArray(value) ? value : [];
}

function saveArray(key, value) {
  setJSON(key, Array.isArray(value) ? value : []);
}

function addEntry(key, entry) {
  const entries = getArray(key);
  entries.push(entry);
  saveArray(key, entries);
  return entries;
}

function updateEntry(key, index, entry) {
  const entries = getArray(key);

  if (index >= 0 && index < entries.length) {
    entries[index] = entry;
  }

  saveArray(key, entries);
  return entries;
}

function deleteEntry(key, index) {
  const entries = getArray(key);

  if (index >= 0 && index < entries.length) {
    entries.splice(index, 1);
  }

  saveArray(key, entries);
  return entries;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function setStatus(id, message) {
  const element = document.getElementById(id);

  if (!element) return;

  element.textContent = message;

  setTimeout(() => {
    element.textContent = "";
  }, 2500);
}
