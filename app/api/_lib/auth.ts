import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";
import { JWTPayload } from "jose";
import { HOTP, Secret, TOTP } from "otpauth";
import { hash, verify } from "@node-rs/argon2";

type AuthReq = {
  firstname: string;
  lastname: string;
  email: string;
};

const privateKeyBuffer = Buffer.from(process.env.PRIVATE_KEY!, "base64");
const publicKeyBuffer = Buffer.from(process.env.PUBLIC_KEY!, "base64");

/** Liable to throw */
export async function verifyToken(token: string) {
  const isValid = await jwtVerify(token, publicKeyBuffer);
  return isValid.payload as JWTPayload & AuthReq;
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

export async function hashPassword(password: string) {
  return hash(password, {
    secret: privateKeyBuffer,
  });
}

export async function verifyPassword(hash: string, password: string) {
  return verify(hash, password, { secret: privateKeyBuffer });
}

/** One time OTP */
export async function generateHOTP() {
  const hotp = new HOTP({
    secret: new Secret({ buffer: privateKeyBuffer.buffer }),
  });
}

/** Generate timer OTP for 2FA */
export async function generateTOTP() {}