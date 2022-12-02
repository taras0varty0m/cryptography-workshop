import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const DELIMITER = ":";
const KEYLEN = 64;

function signup(email, password) {
  const salt = randomBytes(16).toString("hex");

  const hashedPassword = scryptSync(password, salt, KEYLEN).toString("hex");

  const user = { email, password: salt + DELIMITER + hashedPassword };

  users.push(user);

  return user;
}

function login(email, password) {
  const user = users.find((v) => v.email === email);

  const [salt, key] = user.password.split(DELIMITER);
  const hashedBuffer = scryptSync(password, salt, KEYLEN);

  const keyBuffer = Buffer.from(key, "hex");
  const match = timingSafeEqual(hashedBuffer, keyBuffer);

  return match ? "login success!" : "login fail!";
}

const users = [];

const user = signup("foo@bar.com", "pa$$word");

console.log(user);

const failedResult = login("foo@bar.com", "password");

console.log(failedResult);

const successResult = login("foo@bar.com", "pa$$word");

console.log(successResult);
