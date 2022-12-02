const crypto = require("crypto");
const fs = require("fs");

const key = crypto.randomBytes(16).toString("hex"); // if not use hex, we get something like that "�ydf\f4���\u0000G\r��\u001az"
const ALGORITHM = "aes256";

fs.writeFileSync(
  `${__dirname}/key.json`,
  JSON.stringify({ key, algorithm: ALGORITHM })
);
