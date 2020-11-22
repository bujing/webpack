import React, { FC, Profiler, ProfilerProps, ProfilerOnRenderCallback } from 'react'

// 设置 ProfilerProps 中的 onRender 为可选属性
interface YProfilerProps extends Omit<ProfilerProps, 'onRender'> {
  onRender?: ProfilerOnRenderCallback
}

const style: { [props: string]: string } = {
  title: 'color: red',
  info: 'color: blue',
  remark: 'color: gray'
}

const YProfiler: FC<YProfilerProps> = ({ onRender = () => {}, ...rest }) => {
  const callback: ProfilerOnRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
    console.group('Profiler %c%s [%s]', style.title, id, phase)
    console.log('%c%f %c[1]', style.info, actualDuration, style.remark)
    console.log('%c%f %c[2]', style.info, baseDuration, style.remark)
    console.log('%c%f %c[3]', style.info, startTime, style.remark)
    console.log('%c%f %c[4]', style.info, commitTime, style.remark)
    console.log('%c%o %c[5]', style.info, interactions, style.remark)
    // https://zh-hans.reactjs.org/docs/profiler.html
    console.groupCollapsed('%cProps', style.remark)
    console.info('%c[1] [actualDuration] 本次更新在渲染 Profiler 和它的子代上花费的时间。这个数值表明使用 memoization 之后能表现得多好。（例如 React.memo，useMemo，shouldComponentUpdate）。 理想情况下，由于子代只会因特定的 prop 改变而重渲染，因此这个值应该在第一次装载之后显著下降。\n[2] [baseDuration] 在 Profiler 树中最近一次每一个组件 render 的持续时间。 这个值估计了最差的渲染时间。（例如当它是第一次加载或者组件树没有使用 memoization）。\n[3] [startTime] 本次更新中 React 开始渲染的时间戳。\n[4] [commitTime] 本次更新中 React commit 阶段结束的时间戳。 在一次 commit 中这个值在所有的 profiler 之间是共享的，可以将它们按需分组。\n[5] [interactions] interactions 的集合用来追踪已经列出的更新。（例如当 render 或者 setState 被调用时）。', style.remark)
    console.groupEnd()
    console.groupEnd()

    onRender(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions)
  }

  return (
    <Profiler onRender={callback} {...rest} />
  )
}

export default YProfiler
