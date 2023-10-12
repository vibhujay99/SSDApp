const crypto = require("crypto");

export default function hashData(data) {
  if (typeof data !== "string") {
    throw new Error("Input data must be a string");
  }

  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}
