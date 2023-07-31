// import courseParts from "../data/courseData";
import { CoursePart } from '../types';

const assertNever = (value: never): never => {

  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({courseParts}: {courseParts: CoursePart[]}): JSX.Element => {

return <> {
courseParts.map(part => {
    switch (part.kind) {
      case "basic":
        console.log("Basic: ", part.name); 
        return <> 
          <b key = {part.name}> {part.name} {part.exerciseCount} </b> 
          <div> {part.description  } </div>
          <br/>  
          </> 
      case "background":
        console.log("Background: ", part.name); 
        return <> 
        <b key = {part.name}> {part.name} {part.exerciseCount}</b> 
        <div>  {part.description} {part.backgroundMaterial} </div>
        <br/>
        </>  
      case "group":
        console.log("Group: ", part.name); 
        return <> 
        <b key = {part.name}> {part.name} {part.exerciseCount} </b> 
        <div>  Group Project Count: {part.groupProjectCount} </div>
        <br/>
        </> 
      default: 
        return assertNever (part); 
    }
  })
}
</> }

export default Part