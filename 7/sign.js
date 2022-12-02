import { createSign, createVerify } from "crypto";
import { privateKey, publicKey } from "../5/key-pair";

const ALGORITHM = "rsa-sha256";

const data = "this data must be signed";

/// SIGN

const signer = createSign(ALGORITHM);

signer.update(data);

const signature = signer.sign(privateKey, "hex");

console.log(signature);

/// VERIFY

const verifier = createVerify(ALGORITHM);

verifier.update(data);

const isVerified = verifier.verify(publicKey, signature, "hex");

console.log(isVerified);
