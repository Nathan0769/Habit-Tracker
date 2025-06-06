const API_CONFIG = {
  // En production, remplacez par l'URL de votre backend Render
  BASE_URL: import.meta.env.PROD
    ? "https://habit-tracker-orc7.onrender.com"
    : "http://localhost:3000",
};

export default API_CONFIG;
