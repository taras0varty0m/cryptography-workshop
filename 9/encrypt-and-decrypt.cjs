const crypto = require("crypto");
const fs = require("fs");

const DELIMITER = ":";

const cipherData = fs.readFileSync(`${__dirname}/key.json`);
const { algorithm, key } = JSON.parse(cipherData);

function encryptDeprecated(string) {
  const cipher = crypto.createCipher(algorithm, key);

  return cipher.update(string, "utf8", "hex") + cipher.final("hex"); // нельзя работать с экземплярами класса CipherGCM после вызова метода final
}

const stringForEncryption = "Привет. Как дела?";

console.log(
  encryptDeprecated(stringForEncryption) ===
    encryptDeprecated(stringForEncryption)
);

function encrypt(string) {
  const iv = crypto.randomBytes(8).toString("hex"); // для aes256 необходимо 16 байт, которые мы получаем при преобразовании 8 байт в hex

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = cipher.update(string, "utf8", "hex") + cipher.final("hex");

  return encrypted + DELIMITER + iv;
}

console.log(encrypt(stringForEncryption), encrypt(stringForEncryption));

function decrypt(string) {
  const [encrypted, iv] = string.split(DELIMITER);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
}

console.log(decrypt(encrypt(stringForEncryption)) === stringForEncryption);
