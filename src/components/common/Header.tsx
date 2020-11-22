import React, { useState, useEffect, ChangeEvent } from 'react'
// Redux
import { useContext, fetchTheme, changeTheme } from '../../redux/root'

const Header = () => {
  const { state, dispatch } = useContext()
  const { theme, themes, status } = state

  const [current, setCurrent] = useState<string>(theme)
  useEffect(() => {
    if (current !== theme) {
      dispatch(changeTheme, current)
    }
  }, [current])
  function handleChange (event: ChangeEvent) {
    const target = event.target as HTMLSelectElement
    setCurrent(target.value)
  }

  return (
    <div>
      <span>当前皮肤：{theme}</span>

      {status !== 'success' && <button onClick={() => dispatch(fetchTheme)} disabled={status === 'request'}>{status === 'failure' ? 'retry' : 'fetch'}</button>}

      {themes.length > 0 && <select value={current} onChange={handleChange}>
        {themes.map((theme: string) => <option value={theme} key={theme}>{theme}</option>)}
      </select>}
    </div>
  )
}

export default Header
