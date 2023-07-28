type Rating = 1 | 2 | 3 ; // -- somehow is not accepted below. Fix later. 

interface ExerciseAssessment {
  periodLength: number;
  trainingDays: number;
  success: boolean; 
  rating: Rating; // changed to number for now. 
  ratingDescription: string; 
  target: number;
  average: number;
}

export const calculateExercises = (daily_exercises: number[], target: number): ExerciseAssessment => {

  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter(t => t != 0).length;
  const totalHours = daily_exercises.reduce((partialSum, a) => partialSum + a, 0);
  const average = totalHours / periodLength;
  let assessment = {
    success: false, rating: 2, ratingDescription: "Almost there." 
    };
  if (target <= average) { assessment = {
    success: true, rating: 1, ratingDescription: "Good. Well done!" 
    };
  }
  if ((target - average) > 1 ) { assessment = {
    success: false, rating: 3, ratingDescription: "Bad" 
    };
  }

  return ({
    periodLength,
    trainingDays,
    success: assessment.success,
    rating: assessment.rating as Rating,
    ratingDescription: assessment.ratingDescription, 
    target: target,
    average
  });
};
