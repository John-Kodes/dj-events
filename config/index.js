export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export const PER_PAGE = 5;

// before it, we first add an environment variable for when we deploy the site. If its not found, it will load the localhost
