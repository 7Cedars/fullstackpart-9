import Header from "./components/Header"; 
import Content from "./components/Content"; 
import Total from "./components/Total"; 

const App = () => {

  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name = {courseName} /> 
      <Content /> 
      <Total /> 
    </div>
  );
};

export default App;