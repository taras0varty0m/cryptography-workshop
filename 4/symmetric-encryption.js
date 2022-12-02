import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes256";

/// Cipher

const message = "i like turtles";
const key = randomBytes(32);
const iv = randomBytes(16);

const cipher = createCipheriv(ALGORITHM, key, iv);

/// Encrypt

const encryptedMessage =
  cipher.update(message, "utf8", "hex") + cipher.final("hex");
console.log(`Encrypted: ${encryptedMessage}`);

/// Decrypt

const decipher = createDecipheriv(ALGORITHM, key, iv);
const decryptedMessage =
  decipher.update(encryptedMessage, "hex", "utf8") + decipher.final("utf8");
console.log(`Deciphered: ${decryptedMessage.toString("utf8")}`);
