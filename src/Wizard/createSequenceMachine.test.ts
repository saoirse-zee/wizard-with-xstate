import { createSequenceMachine } from "./createSequenceMachine";

it("creates a one stage machine", function() {
  const stages = [
    { id: "one", cond: { type: "oneIsValid" }, actions: ["setOne", "logStuff"] }
  ];
  const oneStageMachine = createSequenceMachine(stages);
  const expected = {
    one: {
      on: {
        NEXT: {
          target: "done",
          cond: { type: "oneIsValid" },
          actions: ["setOne", "logStuff"]
        }
      }
    },
    done: { type: "final" }
  };
  expect(oneStageMachine.config.states).toEqual(expected);
});

it("creates a two stage machine", function() {
  const stages = [
    { id: "one", cond: { type: "oneIsValid" }, actions: ["setOne", "logStuff"] },
    { id: "two" },
  ];
  const twoStageMachine = createSequenceMachine(stages);
  const expected = {
    one: {
      on: {
        NEXT: {
          target: "two",
          cond: { type: "oneIsValid" },
          actions: ["setOne", "logStuff"]
        }
      }
    },
    two: {
      on: {
        NEXT: {
          target: "done"
        }
      }
    },
    done: { type: "final" }
  };
  expect(twoStageMachine.config.states).toEqual(expected);
});

it("creates a 100 stage machine", function() {
  const stages = Array(100)
    .fill(null)
    .map((_, i) => ({ id: `stage-${i}` }));
  const machine = createSequenceMachine(stages);
  const numberOfStates = Object.keys(machine.config.states).length;
  expect(numberOfStates).toEqual(101);
});
