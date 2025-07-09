// scripts/env.js

const IS_DEV = location.hostname === "localhost" || location.hostname === "127.0.0.2";

const CONFIG = {
  IS_DEV: IS_DEV,
  BASE_PATH: IS_DEV ? "/frontend/" : "/", // configures the base path for links
  FILE_EXT: IS_DEV ? ".html" : "", // configures the base path for extensions

  // Optional: API base URL
  API_BASE: IS_DEV
    ? "http://localhost:5000"
    : "https://simple-crud-application-0w9e.onrender.com/"
};
/** This is the environment detection center and it checks to see whether we are in development or in production */