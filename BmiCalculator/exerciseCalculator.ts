import {isNotNumber, Readline} from './utils';

// type Rating = 1 | 2 | 3 ; -- somehow is not accepted below. Fix later. 

interface ExerciseAssessment {
  periodLength: number;
  trainingDays: number;
  success: boolean; 
  rating: number; // changed to number for now. 
  ratingDescription: string; 
  target: number;
  average: number;
}

const calculateExercises = (targetAverage: number, trainingData: number[]): ExerciseAssessment => {

  console.log("Input data: ", trainingData, "target average:", targetAverage);

  const periodLength = trainingData.length;
  const trainingDays = trainingData.filter(t => t != 0).length;
  const totalHours = trainingData.reduce((partialSum, a) => partialSum + a, 0);
  const average = totalHours / periodLength;
  let assessment = {
    success: false, rating: 2, ratingDescription: "Almost there! Keep trying" 
    };
  if (targetAverage <= average) { assessment = {
    success: true, rating: 1, ratingDescription: "Well done!" 
    };
  }
  if ((targetAverage - average) > 1 ) { assessment = {
    success: false, rating: 3, ratingDescription: "Hate to tell you... But you have quite some work still to do! Get on with it!" 
    };
  }

  return ({
    periodLength,
    trainingDays,
    success: assessment.success,
    rating: assessment.rating,
    ratingDescription: assessment.ratingDescription, 
    target: targetAverage,
    average
  });
}; 

Readline.question("Enter your target average training duration (in hours), followed by hours trained per day (in hours, for any number of days). Numbers should be separated by a space.\n",
  (answer: string) => {
    const userInput = answer.split(" ");
    const checkInput = userInput.map(input => isNotNumber(input));
    const cleanedInput = userInput.map((input: string) => parseInt(input) );

    if (checkInput.includes(true)) {
      console.log('Error: non-numbers were inserted. Please insert a list of numbers separated by spaces. Do not add a space at end of sentence.'); 
      
    } else {
      const [TargetTraining, ...TrainingData] = cleanedInput;
      console.log(calculateExercises(TargetTraining, TrainingData));
    
    } 
    Readline.close();   
  } 
); 
