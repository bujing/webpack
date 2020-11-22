import creator from '../creator'
import reducers from './reducers'
import store from './store'

export * from './actions'
export const { Context, Provider, useContext } = creator(reducers, store)
