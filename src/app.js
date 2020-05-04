import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import material UI
import Home from './components/Home'




const App = () => (
  <BrowserRouter>
    <main>
      <Switch>
        <Route exact path="/home"component={Home}/>
      </Switch>
    </main>
  </BrowserRouter>
)


ReactDOM.render(
  <App />,
  document.getElementById('root')
)