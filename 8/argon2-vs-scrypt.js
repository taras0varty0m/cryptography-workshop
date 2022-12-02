import { hash as _hash, verify } from "argon2";
import { createHash } from "crypto";

const ROUNDS = 1000;

const PASSWORD = "password";

async function* asyncGenerator() {
  let i = 0;

  while (i < ROUNDS) {
    yield i++;
  }
}

async function argon2(str) {
  const hash = await _hash(str);

  return verify(hash, str);
}

async function scrypt(str) {
  const hash1 = createHash("sha256").update(str).digest("hex");
  const hash2 = createHash("sha256").update(str).digest("hex");

  return hash1 === hash2;
}

console.time("argon2");

for await (let num of asyncGenerator()) {
  await argon2(PASSWORD + num);
}

console.timeEnd("argon2");

console.time("scrypt");

for await (let num of asyncGenerator()) {
  await scrypt(PASSWORD + num);
}

console.timeEnd("scrypt");
