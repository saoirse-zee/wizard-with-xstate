import * as React from "react";
import { useState } from "react";

export const NameInput = ({ handleClick }) => {
  const [name, updateName] = useState("");
  return (
    <div>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={e => updateName(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && handleClick(name)}
      />
      <button onClick={() => handleClick(name)}>Next</button>
    </div>
  );
};

export const AgeInput = ({ handleClick }) => {
  const [age, updateAge] = useState();
  return (
    <div>
      <label>Age</label>
      <input
        type="number"
        value={age}
        onChange={e => updateAge(parseInt(e.target.value))}
        onKeyPress={e => e.key === 'Enter' && handleClick(age)}
      />
      <button onClick={() => handleClick(age)}>Next</button>
    </div>
  );
};

export const IceCreamInput = ({ handleClick }) => {
  const [response, updateResponse] = useState(false);
  return (
    <div>
      <label>Do you like ice cream?</label>
      <input
        type="checkbox"
        value={response}
        onChange={e => updateResponse(!!e.target.checked)}
        onKeyPress={e => e.key === 'Enter' && handleClick(response)}
      />
      <button onClick={() => handleClick(response)}>Next</button>
    </div>
  );
};
