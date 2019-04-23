import * as React from "react";
import { useMachine } from "@xstate/react";
import { stageMachine2 } from './machine';
import { NameInput, AgeInput, IceCreamInput} from './inputs';

const Stage = ({ isActive, handleNextClick, renderInput, label, value }) =>
  isActive ? (
    renderInput({ handleClick: handleNextClick })
  ) : (
    value !== undefined && (
      <p>
        {label}: {typeof value === "boolean" ? value.toString() : value}
      </p>
    )
  );

const CurrentStageIndicator = ({ stage }) => {
  // QUESTION: Is it possible to generate this from the machine config?
  const stages = [
    { id: 'one', label: 'Name' },
    { id: 'two', label: 'Age' },
    { id: 'three', label: 'Ice cream' },
  ];
  return (
    <p className="stage-indicator">
      {
        stages.map(s => (
          <span className={`stage-label ${stage === s.id && 'active'}`}>{s.label}</span>
        ))
      }
    </p>
  )
};

const Summary = ({ data, handleReset }) => (
  <div>
    <p>
      {data.name}, age {data.age},{" "}
      {data.likesIceCream
        ? "enjoys a scoop from time to time."
        : "is a dang fool."}
    </p>
    <button onClick={handleReset}>Reset</button>
  </div>
);

const Wizard = () => {
  const [current, send] = useMachine(stageMachine2);

  if (current.matches('done')) {
    return <Summary data={current.context} handleReset={() => send("RESET")} />;
  }

  return (
    <div>
      <CurrentStageIndicator stage={current.value} />
      <Stage
        label="Name"
        value={current.context.name}
        handleNextClick={response => send({ type: "NEXT", response })}
        isActive={current.matches('one')}
        renderInput={NameInput}
      />
      <Stage
        label="Age"
        value={current.context.age}
        handleNextClick={response => send({ type: "NEXT", response })}
        isActive={current.matches('two')}
        renderInput={AgeInput}
      />
      <Stage
        label="Flavors"
        value={current.context.likesIceCream}
        handleNextClick={response => send({ type: "NEXT", response })}
        isActive={current.matches('three')}
        renderInput={IceCreamInput}
      />
    </div>
  );
};

export default Wizard;
