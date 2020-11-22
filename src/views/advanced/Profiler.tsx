import React, { FC, memo, useState, useEffect, useCallback } from 'react'
// Redux
import { useContext } from '../../redux/root'
// Component
import Profiler from '../../components/advanced/Profiler'
// Style
import style from '../../scss/module/profiler.module.scss'

interface ComponentProps {
  id: string
  count?: number
  title?: string
  content?: string
  onClick?: () => void
}
const HasProp: FC<ComponentProps> = ({ id, count, title, content, onClick }) => {
  return (
    <Profiler id={id}>
      <div>
        {title}
      </div>
      <div>
        {count !== undefined && <code>count: {count} </code>}
        {onClick && <button onClick={onClick}>click</button>}
      </div>
      <div className={style.remark}>
        {content}
      </div>
      <LastRenderTime />
    </Profiler>
  )
}
const HasState: FC<ComponentProps> = ({ id, title, content }) => {
  const [count, setCount] = useState<number>(0)

  return (
    <Profiler id={id}>
      <div>
        {title}
      </div>
      <div>
        <code>count: {count} </code>
        <button className={style.btn} onClick={() => { setCount(count => count + 1) }}>+</button>
        <button className={style.btn} onClick={() => { setCount(count => count - 1) }}>-</button>
      </div>
      <div className={style.remark}>
        {content}
      </div>
      <LastRenderTime />
    </Profiler>
  )
}
// 记忆组件
const HasPropMemo: FC<ComponentProps> = memo(HasProp)
const HasStateMemo: FC<ComponentProps> = memo(HasState)
// 渲染时间组件
const LastRenderTime = () => {
  return (
    <div className={style.remark}>
      最后一次渲染时间：
      <span className={style.info}>{new Date().toLocaleString()}</span>
    </div>
  )
}

// https://zh-hans.reactjs.org/docs/profiler.html
const ProfilerPage: FC = () => {
  const { state } = useContext()

  const [count, setCount] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  // 建议使用 useCallback 而不是箭头函数传递回调函数
  function handleClick () {
    console.log('Arrow Function')
  }
  const clickCallback = useCallback(() => {
    console.log('useCallback')
  }, [])

  return (
    <Profiler id="container">
      <div className={style.container}>
        <div className={style.panel}>
          <div className={style.body}>
            <LastRenderTime />
            <div>
              <code>count: {count} </code>
              <button className={`${style.btn} ${state.theme}`} onClick={() => { setCount(count => count + 1) }}>+</button>
              <button className={style.btn} onClick={() => { setCount(count => count - 1) }}>-</button>
            </div>
            <div>
              <code>total: {total} </code>
              <button className={style.btn} onClick={() => { setTotal(total => total + 1) }}>+</button>
              <button className={style.btn} onClick={() => { setTotal(total => total - 1) }}>-</button>
            </div>

            <table className={style.table}>
              <thead>
                <tr>
                  <th>非记忆组件</th>
                  <th>记忆组件</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <HasProp id="hasProp" count={count} title="接收 count 入参的非记忆组件" content="父组件渲染，它就渲染" />
                  </td>
                  <td>
                    <HasPropMemo id="hasPropMemo" count={count} title="接收 count 入参的记忆组件" content="Props 入参改变，它才渲染" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <HasState id="hasState" title="使用 State 的非记忆组件" content="父组件渲染，它就渲染" />
                  </td>
                  <td>
                    <HasStateMemo id="hasStateMemo" title="使用 State 的记忆组件" content="内部 State 改变，它才渲染" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <HasProp id="hasArrowFunction" title="使用箭头函数传递回调的非记忆组件" content="父组件渲染，它就渲染" onClick={() => { handleClick() }} />
                  </td>
                  <td>
                    <HasPropMemo id="hasArrowFunctionMemo" title="使用箭头函数传递回调的记忆组件" content="父组件渲染，它就渲染（箭头函数会在每次组件渲染时创建一个新的函数，相当于 Props 入参改变）" onClick={() => { handleClick() }} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <HasProp id="hasUseCallback" title="使用 useCallback 传递回调的非记忆组件" content="父组件渲染，它就渲染" onClick={clickCallback} />
                  </td>
                  <td>
                    <HasPropMemo id="hasUseCallbackMemo" title="使用 useCallback 传递回调的记忆组件" content="任何情况下都不会重新渲染" onClick={clickCallback} />
                  </td>
                </tr>
              </tbody>
            </table>

            <p className={style.primary}>箭头函数和 JSX 会在每次编译时创建一个新的函数或对象，从而导致组件重新渲染。</p>
          </div>
        </div>
      </div>
    </Profiler>
  )
}

export default ProfilerPage
