import { h, render } from 'preact'
import { Provider } from 'preact-redux'
import store from './store'
import Panel from './components/Panel.jsx'
import css from './index.css'

const App = () => (
  <Provider store={store}>
    <Panel />
  </Provider>
)

render(<App />, document.getElementById('app'))
