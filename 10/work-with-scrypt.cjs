const crypto = require("crypto");
const util = require("util");

const DELIMITER = ":";

async function scryptHash(string, salt) {
  const hashBuffer = await util.promisify(crypto.scrypt)(string, salt, 32);

  return hashBuffer.toString("hex") + DELIMITER + salt;
}

async function verifyHash(stringToHash, hashWithSalt) {
  const [, salt] = hashWithSalt.split(DELIMITER);

  const hashedString = await scryptHash(stringToHash, salt);

  return hashedString === hashWithSalt;
}

(async () => {
  const salt = crypto.randomBytes(16).toString("hex");

  const stringToHash = "Привет! как дела?";

  const hashWithSalt = await scryptHash(stringToHash, salt);

  const isVerified = await verifyHash(stringToHash, hashWithSalt);

  console.log(isVerified);
})();
