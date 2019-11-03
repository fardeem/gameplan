import { initialState, ClassInfoInterface } from "./store";

interface ActionInterface {
  type: "ADD_CLASS" | "EDIT_CLASS" | "FINISH_EDITING_CLASS" | "REMOVE_CLASS";
  payload: ClassInfoInterface & EditClassPayload;
}

interface EditClassPayload {
  classCode: string;
}

function reducer(state = initialState, action: ActionInterface) {
  switch (action.type) {
    case "ADD_CLASS": {
      const classList = Array.from(state.classList);
      const docIndex = classList.findIndex(
        ({ code }) => code === action.payload.code
      );

      // Find all the classes that don't exist in our list
      // Add them to the list
      action.payload.prereqs
        .filter(code => {
          return !classList.map(({ code }) => code).includes(code);
        })
        .forEach(code => {
          classList.push({
            code,
            name: "",
            quarterPref: [],
            difficulty: 0,
            prereqs: []
          });
        });

      if (docIndex !== -1)
        // This class exists so remove the current defintiion
        // and update it with the new payload
        classList[docIndex] = action.payload;
      else classList.push(action.payload);

      return {
        ...state,
        classList
      };
    }
    case "EDIT_CLASS":
      return {
        ...state,
        editClass: action.payload.classCode
      };
    case "FINISH_EDITING_CLASS":
      return {
        ...state,
        editClass: ""
      };
    case "REMOVE_CLASS": {
      const classList = Array.from(state.classList);
      const index = classList.findIndex(
        ({ code }) => code === action.payload.classCode
      );

      classList.splice(index, 1);
      console.log(classList);
      return {
        ...state,
        classList,
        editClass: ""
      };
    }
    default:
      return state;
  }
}

export default reducer;
