import { ADD_R,RESET_DATA } from './constant';

// Define the initial state
const initialState = {
  questionResponses: []
};

// Define the reducer function
export const reducera = (state = initialState, action) => {
  switch (action.type) {
    case ADD_R:
      console.log("Data added to store:", action.payload);
      return {
        ...state,
        questionResponses: [...state.questionResponses, action.payload]
      };
      case RESET_DATA:
      return initialState; // Reset to initial state
    default:
      return state;
  }
};


