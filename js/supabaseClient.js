const APP_CONFIG = window.__APP_CONFIG || {};
const SUPABASE_URL = APP_CONFIG.SUPABASE_URL || window.__SUPABASE_URL || "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = APP_CONFIG.SUPABASE_ANON_KEY || window.__SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

let client;

function getSupabaseClient() {
  if (client) {
    return client;
  }

  if (!window.supabase || !window.supabase.createClient) {
    throw new Error("Supabase library is not loaded.");
  }

  if (SUPABASE_URL.includes("YOUR_PROJECT_ID") || SUPABASE_ANON_KEY.includes("YOUR_SUPABASE_ANON_KEY")) {
    throw new Error("Set SUPABASE_URL and SUPABASE_ANON_KEY in js/config.js (copy from js/config.example.js).");
  }

  client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return client;
}

export async function createAppointment(appointment) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("appointments")
    .insert([appointment])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function fetchAppointments() {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("appointments")
    .select("id, name, phone, email, date, time, reason, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
