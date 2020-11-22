import { lazy } from 'react'
import { RouteConfig } from 'react-router-config'

const basename = '/advanced'

const Advanced = lazy(() => import(/* webpackChunkName: 'advanced' */ '../views/advanced/Index'))
const Profiler = lazy(() => import(/* webpackChunkName: 'advanced' */ '../views/advanced/Profiler'))

const routes: RouteConfig[] = [
  {
    component: Advanced,
    path: basename,
    routes: [
      {
        component: Profiler,
        path: '/advanced/profiler'
      }
    ]
  }
]

export default routes
