let client;

function getRuntimeConfig() {
  const appConfig = window.__APP_CONFIG || {};
  return {
    supabaseUrl: appConfig.SUPABASE_URL || window.__SUPABASE_URL || "https://YOUR_PROJECT_ID.supabase.co",
    supabaseAnonKey: appConfig.SUPABASE_ANON_KEY || window.__SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY"
  };
}

function getSupabaseClient() {
  if (client) {
    return client;
  }

  if (!window.supabase || !window.supabase.createClient) {
    throw new Error("Supabase library is not loaded.");
  }

  const { supabaseUrl, supabaseAnonKey } = getRuntimeConfig();

  if (supabaseUrl.includes("YOUR_PROJECT_ID") || supabaseAnonKey.includes("YOUR_SUPABASE_ANON_KEY")) {
    throw new Error("Set SUPABASE_URL and SUPABASE_ANON_KEY in js/config.js (copy from js/config.example.js).");
  }

  client = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
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
