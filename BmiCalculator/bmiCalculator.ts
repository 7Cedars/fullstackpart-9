// import {isNotNumber} from './utils' 

interface BmiAssessment {
  weight: number,
  height: number,
  bmiRating: number, 
  bmi: string
}

export const calculateBmi = (height: number, weight: number): BmiAssessment | string => {

  // calculation and assessment categories taken from https://en.wikipedia.org/wiki/Body_mass_index (and later simplified)
  try {
    const bmiRating = weight / ((height / 100)^2)

    let bmi = " " 
    if (bmiRating < 18.5) { bmi = "Underweight" }
    if (bmiRating >= 18.5 && bmiRating < 25) { bmi =  "Normal range" }
    if (bmiRating > 25) { bmi = "Overweight" }

    return ({
      weight,
      height,
      bmiRating,
      bmi
    })

  } catch (error) {
    return(`${error}: malformatted parameters`)
  }

// export const calculateBmi = (input: string): BmiAssessment | string => {
  
//   const userInput = input.split(" ")

//   try {
//     const height = parseInt(userInput[0])
//     const weight = parseInt(userInput[1])
//     return(bmiCalculator(height, weight))
//   } catch (error) {
//     return(`${error}: malformatted parameters`)
//   }
  // if (userInput.length != 2 ) {
  //   return("incorrect number of inputs. Insert two numbers divided by a space. Do not add a space at end of sentence." ) 
  // }

  // if (isNotNumber(userInput[0]) === true || isNotNumber(userInput[1]) === true) {
  //   return("incorrect type of input. Insert two numbers. Do not add a space at end of sentence." ) 
  // }   

  // if (isNotNumber(userInput[0]) === false && isNotNumber(userInput[1]) === false) {
  //   const height = Number(userInput[0])
  //   const weight = Number(userInput[1])
  //   return(bmiCalculator(height, weight))
  // }

  // return 
}

export default "default"







