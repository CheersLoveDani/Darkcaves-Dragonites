// Re-export all services
export { tauriApi } from "./tauri";
export { pokeApi } from "./pokeapi";

// Service configuration
export const serviceConfig = {
  pokeapi: {
    baseUrl:
      import.meta.env.VITE_POKEAPI_BASE_URL || "https://pokeapi.co/api/v2",
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || "Darkcaves & Dragonites",
    version: import.meta.env.VITE_APP_VERSION || "0.1.0",
  },
};
