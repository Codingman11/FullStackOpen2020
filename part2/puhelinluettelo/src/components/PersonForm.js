import React from "react";

const PersonForm = ({ onSubmit, name, number, onChange1, onChange2 }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onChange1} />
        number: <input value={number} onChange={onChange2} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
