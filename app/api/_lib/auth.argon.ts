import { hash, verify } from "@node-rs/argon2";
import { privateKeyBuffer } from "./auth";

export async function hashPassword(password: string) {
  return hash(password, {
    secret: privateKeyBuffer,
  });
}

export async function verifyPassword(hash: string, password: string) {
  return verify(hash, password, { secret: new Uint8Array(privateKeyBuffer) });
}
