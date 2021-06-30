export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// before it, we first add an environment variable for when we deploy the site. If its not found, it will load the localhost
