// utils/cookies.js
export const cookies = {
  // Default security options for cookies
  getOptions: () => ({
    httpOnly: true,        // Prevents client-side JS access (important for security)
    secure: process.env.NODE_ENV === "production", // Use HTTPS only in production
    sameSite: "strict",    // Helps prevent CSRF attacks
    path: "/",             // Cookie is valid for the entire site
  }),

  // 🍪 Set a cookie
  set: (res, name, value, options = {}) => {
    res.cookie(name, value, { 
      ...cookies.getOptions(), 
      ...options 
    });
  },

  // ❌ Clear a cookie
  clear: (res, name, options = {}) => {
    res.clearCookie(name, { 
      ...cookies.getOptions(), 
      ...options 
    });
  },

  // 🔎 Retrieve a cookie
  get: (req, name) => {
    return req.cookies[name];
  },
};
