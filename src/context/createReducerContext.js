import React, {createContext, useReducer} from 'react';

const createReducerContext = (reducer, initialState, actions) => {
  const Context = createContext(null);

  const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundedActions = {};
    for(let key in actions)
      boundedActions[key] = actions[key](dispatch)

    return(
      <Context.Provider value={{state, ...boundedActions}}>
        {children}
      </Context.Provider>
    )
  }

  return {Context, Provider}
}

export default createReducerContext;