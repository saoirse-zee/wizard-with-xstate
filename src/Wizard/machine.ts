import { Machine, assign } from "xstate";
import { createStateSequence } from './createSequenceMachine'

interface Context {
  name: string;
  age: number;
  likesIceCream: boolean;
}

interface StateSchema {
  states: {
    one: {};
    two: {};
    three: {};
    done: {};
  };
}

type Event =
  | { type: "NEXT"; response: string }
  | { type: "GOTO_ONE" }
  | { type: "RESET" };

// Guard implementations
const isValidName = ((_, event) => event.response && event.response.length > 3) as any;
const isValidAge = ((_, event) => event.response && event.response > 0) as any;

// Action implementations
const setName = assign({ name: (_, value) => value.response });
const setAge = assign({ age: (_, value) => value.response });
const setLikesIceCream = assign({ likesIceCream: (_, value) => value.response });
const reset = assign(() => stageMachine.context);

export const stageMachine = Machine<Context, StateSchema, Event>(
  {
    id: "stages",
    initial: "one",
    context: {
      name: undefined,
      age: undefined,
      likesIceCream: undefined
    },
    states: {
      one: {
        on: {
          NEXT: {
            target: "two",
            actions: ["setName"],
            cond: 'isValidName',
          }
        }
      },
      two: {
        on: {
          NEXT: {
            target: "three",
            actions: ["setAge"],
            cond: 'isValidAge',
          }
        }
      },
      three: {
        on: {
          NEXT: {
            target: "done",
            actions: ["setLikesIceCream"]
          }
        }
      },
      done: {
        on: {
          RESET: {
            target: "one",
            actions: ["reset"]
          }
        }
      }
    }
  },
  {
    actions: {
      setName,
      setAge,
      setLikesIceCream,
      reset
    },
    guards: {
      isValidAge,
      isValidName,
    }
  }
);

// Todo: Move this to a JSON file
const stages = [
  {
    id: 'one',
    actions: ['setName'],
    cond: {type: 'isValidName'}, 
  },
  {
    id: 'two',
    actions: ['setAge'],
    cond: {type: 'isValidAge'}, 
  },
  {
    id: 'three',
    actions: ['setLikesIceCream']
  },
]
// Attempts to recreate the above Sequence Machine. 
// TODO: Handle the reset action on "Done" state.
export const stageMachine2 = Machine<Context, StateSchema, Event>(
  {
    id: "stages",
    initial: "one",
    states: createStateSequence(stages),
  },
  {
    actions: {
      setName,
      setAge,
      setLikesIceCream,
      reset
    },
    guards: {
      isValidAge,
      isValidName,
    }
  }
)
// QUESTION: Should this go elsewhere?
.withContext({
  name: undefined,
  age: undefined,
  likesIceCream: undefined
})
