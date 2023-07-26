export const isNotNumber = (argument: any): boolean =>
  isNaN(parseInt(argument));

export const Readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

export default "default"