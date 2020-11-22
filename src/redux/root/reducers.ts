import { FETCH_THEME_REQUEST, FETCH_THEME_FAILURE, FETCH_THEME_SUCCESS, CHANGE_THEME } from './actions'

const reducers: Reducer = (state, action) => {
  switch (action.type) {
    case FETCH_THEME_REQUEST:
      return { ...state, status: 'request' }
    case FETCH_THEME_FAILURE:
      return { ...state, status: 'failure' }
    case FETCH_THEME_SUCCESS:
      return { ...state, status: 'success', themes: action.payload }
    case CHANGE_THEME:
      return { ...state, theme: action.payload }
    default:
      return state
  }
}

export default reducers
