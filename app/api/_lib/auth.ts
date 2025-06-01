import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";
import { JWTPayload } from "jose";
import { HOTP, Secret, TOTP } from "otpauth";
import { hash, verify } from "@node-rs/argon2";

type AuthReq = {
  firstname: string;
  email: string;
};

const privateKeyBuffer = Buffer.from(process.env.PRIVATE_KEY!, "base64");
const publicKeyBuffer = Buffer.from(process.env.PUBLIC_KEY!, "base64");

/** One Time OTP */
export const hotp = new HOTP({
  algorithm: "SHA256",
  secret: new Secret(),
  issuer: "ReclaimMe",
  digits: 8,
});

/** Recurring OTP 30s */
export const totp = new TOTP({
  label: "ReclaimMe OTP",
  algorithm: "SHA256",
  issuer: "ReclaimMe",
  digits: 6,
  period: 30,
  secret: new Secret(),
});

/** Liable to throw */
export async function verifyToken(token: string) {
  const isValid = await jwtVerify<AuthReq>(token, publicKeyBuffer);
  return isValid.payload;
}

export async function createToken(authData: AuthReq) {
  const expirationTime = new Date().getTime() + 1000 * 60 * 60 * 24 * 7; // Expire after 7 days
  const issuedAt = new Date().getTime();
  const token = await new SignJWT({
    exp: expirationTime,
    iat: issuedAt,
    ...authData,
  }).sign(privateKeyBuffer);

  return token;
}

// /** @param exp The current expiry date  */
// export async function refreshToken(exp: number) {
   
// }

export async function hashPassword(password: string) {
  return hash(password, {
    secret: privateKeyBuffer,
  });
}

export async function verifyPassword(hash: string, password: string) {
  return verify(hash, password, { secret: privateKeyBuffer });
}