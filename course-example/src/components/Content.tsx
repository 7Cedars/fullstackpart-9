import { CourseEntry } from '../types';
import courseData from "../data/courseData";

const Content = () => { 
  return <> 
  {console.log(courseData)}
  {
    courseData.map((course: CourseEntry) => ( // ugly. But works.      
      <p key={course.name}> {course.name} {course.exerciseCount}  </p>
    )) 
  }
  </>
}
 
export default Content;
