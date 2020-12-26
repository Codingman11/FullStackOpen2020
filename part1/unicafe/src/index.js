import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, value }) => {
  return <button onClick={value}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td> {value}</td>
      </tr>
    </tbody>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const totalPositive = (good / total) * 100;
  const ave = (good + -Math.abs(bad)) / total;
  const average = ave < 0 ? 0 + "%" : ave + "%";

  if (total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
      </table>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={totalPositive} />
      </table>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <div className="buttons" style={{ marginBottom: "10px" }}>
        <Button text="Good" value={() => setGood(good + 1)} />
        <Button text="Neutral" value={() => setNeutral(neutral + 1)} />
        <Button text="Bad" value={() => setBad(bad + 1)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
