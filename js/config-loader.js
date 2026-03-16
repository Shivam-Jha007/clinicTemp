(function loadAppConfig() {
  const CONFIG_ENDPOINT = "/api/public-config";

  async function fetchConfig() {
    try {
      const response = await fetch(CONFIG_ENDPOINT, { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        if (data && data.SUPABASE_URL && data.SUPABASE_ANON_KEY) {
          window.__APP_CONFIG = {
            SUPABASE_URL: data.SUPABASE_URL,
            SUPABASE_ANON_KEY: data.SUPABASE_ANON_KEY
          };
          return window.__APP_CONFIG;
        }
      }
    } catch (error) {
      // Fall back to local config.js when running without serverless config endpoint.
    }

    return window.__APP_CONFIG || {};
  }

  window.__APP_CONFIG_READY__ = fetchConfig();
})();
