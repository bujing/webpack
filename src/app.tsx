import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
// Redux
import { Provider } from './redux/root'
// Router
import routes from './router'
// Component
import Header from './components/common/Header'
// Style
import './scss/index.scss'

ReactDOM.render(
  <Provider>
    <Router>
      <Header />

      <Suspense fallback={<div>loading</div>}>
        {renderRoutes(routes)}
      </Suspense>
    </Router>
  </Provider>,
  document.querySelector('#root')
)
