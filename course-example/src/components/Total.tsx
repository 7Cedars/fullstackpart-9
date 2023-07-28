import { CourseEntries, CourseEntry } from '../types';

const Total = (courses: CourseEntries) => {
  return (
      <p>
        Number of exercises{" "}
        {Object.values(courses)[0]
          .reduce((carry: number, part: CourseEntry) => 
            carry + part.exerciseCount, 0
          )}
      </p> 
  )
}

export default Total