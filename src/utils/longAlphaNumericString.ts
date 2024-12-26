export function generateRandomAlphaNumeric(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //|| window.msCrypto
  const crypto = window.crypto;
  const randomValues = new Uint32Array(length);
  //   console.log(crypto);
  crypto.getRandomValues(randomValues);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomValues[i] % characters.length);
  }
  return result;
}
