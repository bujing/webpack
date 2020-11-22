/// <reference types="react" />

interface ProviderValueProp {
  state: State
  dispatch: (fn: Function, ...rest: any[]) => void
}

interface State {
  [props: string]: any
}

// https://github.com/redux-utilities/flux-standard-action
interface FluxStandardAction {
  type: string
  payload?: any
  meta?: any
  error?: boolean
}

type Dispatch = React.Dispatch<FluxStandardAction>

type Reducer = (state: State, action: FluxStandardAction) => State
