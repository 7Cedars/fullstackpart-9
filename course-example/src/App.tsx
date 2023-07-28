import CourseData from "./data/courseData";
import Header from "./components/Header"; 
import Content from "./components/Content"; 
import Total from "./components/Total"; 


const App = () => {

  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name = {courseName} /> 
      <Content courses = {CourseData} /> 
      <Total courses = {CourseData} /> 
    </div>
  );
};

export default App;