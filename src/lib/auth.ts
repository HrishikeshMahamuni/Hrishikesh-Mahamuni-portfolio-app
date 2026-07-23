import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-portfolio-key-12345";
const FALLBACK_EMAIL = process.env.ADMIN_EMAIL || "admin@portfolio.com";
// We default to hashed 'admin' password if process.env.ADMIN_PASSWORD is not provided
const FALLBACK_PASSWORD_HASH = process.env.ADMIN_PASSWORD 
  ? bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10)
  : bcrypt.hashSync("admin", 10);

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function signToken(payload: { email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string): { email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string };
  } catch (error) {
    return null;
  }
}

// Get the authenticated user from the cookies
export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

// Get standard credentials (useful for seeding or default login checks)
export function getAdminCredentials() {
  return {
    email: FALLBACK_EMAIL,
    passwordHash: FALLBACK_PASSWORD_HASH,
  };
}
