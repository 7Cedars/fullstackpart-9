type Rating = 1 | 2 | 3 ;

interface ExerciseAssessment {
  periodLength: number;
  trainingDays: number;
  success: boolean; 
  rating: number; 
  ratingDescription: string; 
  target: number;
  average: number;
}

const calculateExercises = (trainingData: number[], targetAverage: number): ExerciseAssessment => {

  console.log("Input data: ", trainingData, "target average:", targetAverage)

  const periodLength = trainingData.length;
  const trainingDays = trainingData.filter(t => t != 0).length;
  const totalHours = trainingData.reduce((partialSum, a) => partialSum + a, 0);
  const average = totalHours / periodLength;
  let assessment = {
    success: false, rating: 2, ratingDescription: "Almost there! Keep trying" 
    };
  if (targetAverage <= average) { assessment = {
    success: true, rating: 1, ratingDescription: "Well done!" 
    }};
  if ((targetAverage - average) > 1 ) { assessment = {
    success: false, rating: 2, ratingDescription: "Hate to tell you... But you have quite some work still to do! Get on with it!" 
    }};

  return ({
    periodLength,
    trainingDays,
    success: assessment.success,
    rating: assessment.rating,
    ratingDescription: assessment.ratingDescription, 
    target: targetAverage,
    average
  })
}

console.log(calculateExercises([1,1,0,1,2,0,0,0], 1.25))