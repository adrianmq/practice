export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://react-image-upload.production.com"
    : "http://localhost:8080";

export const TOAST_COLOR = {
  background: "#505050",
  text: "#fff"
};

export const GOOGLE_MAP_API_KEY = "invalid-api-key";
// export const GOOGLE_MAP_API_KEY = false;
