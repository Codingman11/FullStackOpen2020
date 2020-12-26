import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  let total = 0;
  for (var i = 0; i < props.parts.length; i++) {
    total += props.parts[i].exercises;
  }

  return <p>Total of exercises {total} </p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const [counter, setCounter] = useState(0);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>plus</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
