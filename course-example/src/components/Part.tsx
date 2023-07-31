// import courseParts from "../data/courseData";
import { CoursePart } from '../types';

const assertNever = (value: never): never => {

  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({courseParts}: {courseParts: CoursePart[]}): JSX.Element => {

return <div> {
courseParts.map(part => {
    switch (part.kind) {
      case "basic":
        console.log("Basic: ", part.name); 
        return <p> 
          <b key = {part.name}> {part.name} {part.exerciseCount} </b> 
          <div> <i> { part.description } </i> </div>
          {/* <br/>   */}
          </p> 
      case "background":
        console.log("Background: ", part.name); 
        return <p> 
        <b key = {part.name}> {part.name} {part.exerciseCount}</b> 
        <div> <i> { part.description } </i> </div> 
        <div> {part.backgroundMaterial} </div>
        </p>  
      case "group":
        console.log("Group: ", part.name); 
        return <p> 
        <b key = {part.name}> {part.name} {part.exerciseCount} </b> 
        <div>  Group Project Count: {part.groupProjectCount} </div>
        </p> 
      case "special":
        return <p> 
          <b key = {part.name}> {part.name} {part.exerciseCount} </b> 
          <div> <i> { part.description } </i> </div>
          <div> Required skills: { part.requirements.map(req => ( <text key = {req} > {req} </text> )) } </div> 
          <br/>
          </p>
      default:
        return assertNever (part); 
    }
  })
}
</div> }

export default Part