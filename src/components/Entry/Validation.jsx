// src/components/Entry/Validation.jsx
export const required = (v) => (v && String(v).trim().length > 0);
export const isPostal = (v) => /^\d{7}$/.test(v || "");
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
export const isPhone = (v) => /^\d{9,11}$/.test(v || "");
