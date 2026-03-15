import { createAppointment } from "./supabaseClient.js";

const form = document.getElementById("bookingForm");
const messageBox = document.getElementById("bookingMessage");
const submitBtn = document.getElementById("submitBtn");

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

function setError(field, message) {
  const errorNode = document.querySelector(`[data-error-for="${field}"]`);
  if (errorNode) {
    errorNode.textContent = message;
  }
}

function clearErrors() {
  document.querySelectorAll(".error-text").forEach((node) => {
    node.textContent = "";
  });
}

function validateForm(data) {
  let isValid = true;
  clearErrors();

  if (data.name.trim().length < 3) {
    setError("name", "Enter at least 3 characters.");
    isValid = false;
  }

  if (!/^\+?[0-9\s-]{8,15}$/.test(data.phone.trim())) {
    setError("phone", "Enter a valid phone number.");
    isValid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    setError("email", "Enter a valid email address.");
    isValid = false;
  }

  if (!data.date) {
    setError("date", "Choose a preferred date.");
    isValid = false;
  } else {
    const selectedDate = new Date(`${data.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError("date", "Preferred date cannot be in the past.");
      isValid = false;
    }
  }

  if (!data.time) {
    setError("time", "Choose a preferred time.");
    isValid = false;
  }

  if (data.reason.trim().length < 10) {
    setError("reason", "Please provide at least 10 characters.");
    isValid = false;
  }

  return isValid;
}

async function handleSubmit(event) {
  event.preventDefault();
  if (!form || !submitBtn) {
    return;
  }

  const formData = new FormData(form);
  const appointmentData = {
    name: String(formData.get("name") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    date: String(formData.get("date") || ""),
    time: String(formData.get("time") || ""),
    reason: String(formData.get("reason") || "").trim()
  };

  if (!validateForm(appointmentData)) {
    setMessage("Please fix the highlighted errors.", "status-error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
  setMessage("Submitting your appointment...", "");

  try {
    await createAppointment(appointmentData);
    form.reset();
    setMessage("Appointment request submitted successfully. We will contact you soon.", "status-success");
  } catch (error) {
    setMessage(error.message || "Unable to submit appointment. Please try again.", "status-error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Appointment";
  }
}

if (form) {
  form.addEventListener("submit", handleSubmit);
}
