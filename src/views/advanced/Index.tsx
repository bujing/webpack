import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'

const Advanced: FC<RouteConfigComponentProps> = ({ route = {} }) => {
  return (
    <>
      <Link to="/advanced/profiler">PROFILER</Link>

      {renderRoutes(route.routes)}
    </>
  )
}

export default Advanced
