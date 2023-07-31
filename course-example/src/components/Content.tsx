import { CoursePart } from '../types';
import CourseParts from "../data/courseData";
import Part from "./Part"; 

const Content = () => { 
  
  return <div>  
  <Part courseParts = {CourseParts} /> 
  {/* {console.log(courseData)} */}
  {/* {
    courseData.map((course: CoursePart) => (     
      <p key={course.name}> {course.name} {course.exerciseCount}  </p>
    )) 
  } */}
  </div>
}
 
export default Content;
