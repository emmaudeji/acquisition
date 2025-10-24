import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-please-change-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d"; // Token expiry duration

/**
 * Utility object for handling JWT operations:
 * - sign: generate tokens
 * - verify: check token validity
 * - decode: read token payload without verifying
 */
export const jwttoken = {
  // 🔐 Create a new token
  sign(payload, expiresIn = JWT_EXPIRES_IN) {
    /**
     * payload: Object to encode in the token (e.g., { id, email })
     * expiresIn: Optional expiry override (default = 1 day)
     */
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  },

  // ✅ Verify a token’s validity
  verify(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  },

  // 🔎 Decode a token without verifying
  decode(token) {
    return jwt.decode(token);
  },
};
