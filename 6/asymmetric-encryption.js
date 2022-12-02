import { privateDecrypt, publicEncrypt } from "crypto";
import { privateKey, publicKey } from "./key-pair";

const encryptedData = publicEncrypt(publicKey, Buffer.from(secretMessage));

console.log(encryptedData.toString("hex"));

const decryptedData = privateDecrypt(privateKey, encryptedData);

console.log(decryptedData.toString("utf8"));
