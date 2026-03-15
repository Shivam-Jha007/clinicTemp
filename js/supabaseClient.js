const SUPABASE_URL = "https://fuuzkooifjhlxvysoynq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1dXprb29pZmpobHh2eXNveW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NTMwNDksImV4cCI6MjA4OTEyOTA0OX0.trIYTnb8-xSXXJm_5io9Z_i_QSF6FOMlAFv_OyCoo0U";

let client;

function getSupabaseClient() {
  if (client) {
    return client;
  }

  if (!window.supabase || !window.supabase.createClient) {
    throw new Error("Supabase library is not loaded.");
  }

  if (SUPABASE_URL.includes("YOUR_PROJECT_ID") || SUPABASE_ANON_KEY.includes("YOUR_SUPABASE_ANON_KEY")) {
    throw new Error("Set SUPABASE_URL and SUPABASE_ANON_KEY in js/supabaseClient.js.");
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
