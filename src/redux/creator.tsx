import React, { FC, createContext, useReducer, useContext } from 'react'

function contextCreator (reducers: Reducer, store: State) {
  const Context = createContext({ state: store, dispatch: () => {} } as ProviderValueProp)

  const Provider: FC = (props) => {
    const [state, dispatch] = useReducer(reducers, store)

    return (
      <Context.Provider value={{
        state,
        dispatch: (fn, ...rest) => fn(dispatch, ...rest)
      }} {...props} />
    )
  }

  return {
    Context,
    Provider,
    useContext: () => useContext(Context)
  }
}

export default contextCreator
