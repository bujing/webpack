export const FETCH_THEME_REQUEST = 'FETCH_THEME_REQUEST'
const fetchThemeRequest = (): FluxStandardAction => {
  return {
    type: FETCH_THEME_REQUEST
  }
}
export const FETCH_THEME_FAILURE = 'FETCH_THEME_FAILURE'
const fetchThemeFailure = (err: string): FluxStandardAction => {
  return {
    type: FETCH_THEME_FAILURE,
    payload: err,
    error: true
  }
}
export const FETCH_THEME_SUCCESS = 'FETCH_THEME_SUCCESS'
const fetchThemeSuccess = (res: string[]): FluxStandardAction => {
  return {
    type: FETCH_THEME_SUCCESS,
    payload: res
  }
}
export const fetchTheme = (dispatch: Dispatch) => {
  dispatch(fetchThemeRequest())

  new Promise<string[]>((resolve, reject) => {
    const delay = Math.random() * 10 * 1000
    const r = Math.random()

    window.setTimeout(() => {
      if (r > 0.5) {
        resolve(['azure', 'violet', 'pink'])
      } else {
        reject('failure')
      }
    }, delay)
  })
    .then(
      (res) => dispatch(fetchThemeSuccess(res)),
      (err) => dispatch(fetchThemeFailure(err))
    )
}

export const CHANGE_THEME = 'CHANGE_THEME'
export const changeTheme = (dispatch: Dispatch, theme: string) => {
  dispatch({
    type: CHANGE_THEME,
    payload: theme
  })
}
