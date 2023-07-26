import {isNotNumber, Readline} from './utils' 

const calculateBmi = (height: number, weight: number): string => {

  // calculation and assessment categories taken from https://en.wikipedia.org/wiki/Body_mass_index
  const BMI = weight / ((height / 100)^2)
  console.log("BMI: ", BMI)
  
  if (BMI < 16) { return "Underweight (Severe thinness)" }
  if (BMI >= 16 && BMI < 16.9) { return "Underweight (Moderate thinness)" }
  if (BMI >= 17 && BMI < 18.4) { return "Underweight (Mild thinness)" }
  if (BMI >= 18.5 && BMI < 24.9) { return "Normal range" }
  if (BMI >= 25 && BMI < 29.9) { return "Overweight (Pre-obese)" }
  if (BMI >= 30 && BMI < 34.9) { return "Obese (Class I)" }
  if (BMI >= 35 && BMI < 39.9) { return "Obese (Class II)" }
  if (BMI >= 40) { return "Obese (Class III)" }
  else {
    return "Outside of assessed BMI range."
  }
}

Readline.question("Enter your height (in cm) and weight (in kg), divided by a space.\n", (answer: string) => {
  const userInput = answer.split(" ")
  if (userInput.length != 2 ) {
    console.log("incorrect number of inputs. Insert two numbers divided by a space. Do not add a space at end of sentence." ) 
    Readline.close();
  } 
  if (isNotNumber(userInput[0]) === true || isNotNumber(userInput[1]) === true) {
    console.log("incorrect type of input. Insert two numbers. Do not add a space at end of sentence." ) 
    Readline.close();
  }   
  if (isNotNumber(userInput[0]) === false && isNotNumber(userInput[1]) === false) {
    const height = Number(userInput[0])
    const weight = Number(userInput[1])
    console.log(calculateBmi(height, weight))
    Readline.close();
  } 
  }
)







