import { fetchAppointments } from "./supabaseClient.js";

const ADMIN_PASSWORD = "clinic123";
const ADMIN_SESSION_KEY = "clinic-admin-authenticated";

const gateSection = document.getElementById("adminGate");
const dashboardSection = document.getElementById("adminDashboard");
const loginForm = document.getElementById("adminLoginForm");
const passwordInput = document.getElementById("adminPassword");
const gateMessageBox = document.getElementById("adminGateMessage");
const tableBody = document.getElementById("appointmentsBody");
const messageBox = document.getElementById("adminMessage");
const filterBtn = document.getElementById("todayFilterBtn");

let allAppointments = [];
let showTodayOnly = false;

async function ensureConfigReady() {
  if (window.__APP_CONFIG_READY__ && typeof window.__APP_CONFIG_READY__.then === "function") {
    await window.__APP_CONFIG_READY__;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function setMessage(text, statusClass = "") {
  if (!messageBox) {
    return;
  }

  messageBox.textContent = text;
  messageBox.classList.remove("status-success", "status-error");
  if (statusClass) {
    messageBox.classList.add(statusClass);
  }
}

function setGateMessage(text, statusClass = "") {
  if (!gateMessageBox) {
    return;
  }

  gateMessageBox.textContent = text;
  gateMessageBox.classList.remove("status-success", "status-error");
  if (statusClass) {
    gateMessageBox.classList.add(statusClass);
  }
}

function isAuthenticated() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

function showDashboard() {
  if (gateSection) {
    gateSection.hidden = true;
  }

  if (dashboardSection) {
    dashboardSection.hidden = false;
  }
}

function formatCreatedTime(timestamp) {
  if (!timestamp) {
    return "-";
  }

  return new Date(timestamp).toLocaleString();
}

function renderRows(appointments) {
  if (!tableBody) {
    return;
  }

  if (!appointments.length) {
    tableBody.innerHTML = "<tr><td colspan=\"6\">No appointments found.</td></tr>";
    return;
  }

  tableBody.innerHTML = appointments
    .map((item) => `
      <tr>
        <td>${escapeHtml(item.name || "-")}</td>
        <td>${escapeHtml(item.phone || "-")}</td>
        <td>${escapeHtml(item.date || "-")}</td>
        <td>${escapeHtml(item.time || "-")}</td>
        <td>${escapeHtml(item.reason || "-")}</td>
        <td>${escapeHtml(formatCreatedTime(item.created_at))}</td>
      </tr>
    `)
    .join("");
}

function applyFilterAndRender() {
  if (!showTodayOnly) {
    renderRows(allAppointments);
    setMessage(`${allAppointments.length} appointment(s) loaded.`, "status-success");
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const todayRows = allAppointments.filter((item) => item.date === today);
  renderRows(todayRows);
  setMessage(`${todayRows.length} appointment(s) for today.`, "status-success");
}

async function loadAppointments() {
  setMessage("Loading appointments...");

  try {
    allAppointments = await fetchAppointments();
    applyFilterAndRender();
  } catch (error) {
    setMessage(error.message || "Unable to load appointments.", "status-error");
    renderRows([]);
  }
}

function handleLogin(event) {
  event.preventDefault();

  if (!passwordInput) {
    return;
  }

  if (passwordInput.value !== ADMIN_PASSWORD) {
    setGateMessage("Incorrect password.", "status-error");
    passwordInput.focus();
    passwordInput.select();
    return;
  }

  sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  setGateMessage("Access granted.", "status-success");
  showDashboard();
  loadAppointments();
}

if (filterBtn) {
  filterBtn.addEventListener("click", () => {
    showTodayOnly = !showTodayOnly;
    filterBtn.textContent = showTodayOnly ? "Show All" : "Show Today Only";
    applyFilterAndRender();
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", handleLogin);
}

async function initAdminPage() {
  await ensureConfigReady();

  if (isAuthenticated()) {
    showDashboard();
    loadAppointments();
  } else {
    setGateMessage("Enter the admin password to continue.");
  }
}

initAdminPage();
