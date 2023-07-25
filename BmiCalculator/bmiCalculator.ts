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

console.log(calculateBmi(178, 90))
