import { CoursePart } from '../types';
import courseData from "../data/courseData";

const Total = () => {
  return (
      <p>
        Number of exercises{" "}
        {courseData
          .reduce((carry: number, part: CoursePart) => 
            carry + part.exerciseCount, 0
          )}
      </p> 
  )
}

export default Total