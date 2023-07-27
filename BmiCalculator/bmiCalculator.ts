interface BmiAssessment {
  weight: number,
  height: number,
  bmiRating: number, 
  bmi: string
}

export const calculateBmi = (height: number, weight: number): BmiAssessment | string => {

  // calculation and assessment categories taken from https://en.wikipedia.org/wiki/Body_mass_index (and later simplified)
  try {
    const bmiRating = weight / ((height / 100)^2);

    let bmi = " ";
    if (bmiRating < 18.5) { bmi = "Underweight"; }
    if (bmiRating >= 18.5 && bmiRating < 25) { bmi =  "Normal range"; }
    if (bmiRating > 25) { bmi = "Overweight"; }

    return ({
      weight,
      height,
      bmiRating,
      bmi
    });

  } catch (error) {
    return(`${error}: malformatted parameters`);
  }
};

export default "default";







