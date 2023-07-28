import { CourseEntries, CourseEntry } from '../types';

const Content = (courses: CourseEntries) => { 
  return <> 
  {console.log(courses)}
  {
    Object.values(courses)[0].map((course: CourseEntry) => ( // ugly. But works.      
      <p key={course.name}> {course.name} {course.exerciseCount}  </p>
    )) 
  }
  </>
}
 
export default Content;
