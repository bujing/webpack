import { lazy } from 'react'
import { RouteConfig } from 'react-router-config'
// Router
import advanced from './advanced'

const routes: RouteConfig[] = [
  {
    component: lazy(() => import(/* webpackChunkName: 'home' */ '../views/Home')),
    exact: true,
    path: '/'
  },
  ...advanced
]

export default routes
