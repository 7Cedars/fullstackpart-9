import readline from 'readline'; 

export const isNotNumber = (argument: string): boolean =>
  isNaN(parseInt(argument));

export const Readline = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

export default "default";