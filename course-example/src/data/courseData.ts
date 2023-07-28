import { CourseEntry } from '../types';

const data = [
  {
    name: "Fundamentals",
    exerciseCount: 10
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14
  }
];

const CourseData: CourseEntry[] = data.map(obj => {
  return obj as CourseEntry;
});

export default CourseData;