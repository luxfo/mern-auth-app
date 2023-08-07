import bcrypt from "bcryptjs";
import crypto from "crypto";
import { encode } from "hi-base32";

export const Crypt = {
  encrypt: async (p_data) => {
    const _salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(p_data, _salt);
  },
  compare: async (p_data, p_hash) => {
    return await bcrypt.compare(p_data, p_hash);
  },
  verificationCode: async () => {
    return crypto.randomInt(100000, 999999).toString(); //Math.floor(100000 + Math.random() * 900000).toString("hex");
  },
  resetCode: async () => {
    return crypto.randomBytes(32).toString("hex");
  },
  encode: async (p_data) => {
    return crypto.createHash("sha256").update(p_data).digest("hex");
  },
  generateRandomBase32: () => {
    const buffer = crypto.randomBytes(15);
    const base32 = encode(buffer).replace(/=/g, "").substring(0, 24);
    return base32;
  },
};
