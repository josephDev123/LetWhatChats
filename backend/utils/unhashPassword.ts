import * as bcrypt from "bcrypt";

export function unhashPassword(myPlaintextPassword: string, hash: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(
      myPlaintextPassword,
      hash,
      function (err: any, result: boolean) {
        if (err) reject(err.message);
        resolve(result);
      }
    );
  });
}
