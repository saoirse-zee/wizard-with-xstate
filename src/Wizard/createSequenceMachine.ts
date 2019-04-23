import { Machine } from "xstate";

type Cond = {
  type: string;
};

type Stage = {
  id: string;
  cond?: Cond;
  actions?: string[];
};

export function createStateSequence(stages: Stage[]) {
  const states = {
    done: {
      RESET: {
        target: 'one',
        actions: ['reset'],
      }
    }
  };
  stages.forEach((stage, i) => {
    const nextStage = stages[i + 1];
    states[stage.id] = {
      on: {
        NEXT: {
          target: nextStage ? nextStage.id : "done",
          cond: stage.cond,
          actions: stage.actions,
        }
      }
    };
  });
  return states;
}

export function createSequenceMachine(stages: Stage[], actions={}, guards={}) {
  return Machine(
    {
      id: "sequence",
      initial: stages[0].id,
      states: createStateSequence(stages),
    },
    {
      actions,
      guards,
    }
  );
}
