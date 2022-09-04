const Header = (props) => (
  <h1>{props.courseName}</h1>
);

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
);

const Content = (props) => (
   <div>
    {props.parts.map((part) => <Part name={part.name} exercises={part.exercises}/>)}
  </div>
);

const Total = (props) => {
  const exercices = props.parts.reduce((totalNumber, currentValue) => totalNumber + currentValue.exercises, 0);
  return <p>Number of exercises {exercices}</p>
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default App