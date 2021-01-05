import React from "react";

//{ id, name, number, deletePers }
const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}
      <button onClick={(e) => props.onClick(e, props.id)}>Delete</button>
    </div>
  );
};

export default Person;
