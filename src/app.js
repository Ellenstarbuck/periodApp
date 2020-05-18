import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import material UI
import Home from './components/Home'
import Register from './auth/Register'
import Login from './auth/Login'
import PeriodIndex from './components/PeriodIndex'
import PeriodEdit from './components/PeriodEdit'
import PeriodNew from './components/PeriodNew'


const App = () => (
  <BrowserRouter>
    <main>
      <Switch>
        <Route exact path="/home"component={Home}/>
        <Route path="/periods/:id/edit" component={PeriodEdit} />
        <Route path="/periods/new" component={PeriodNew} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        
        <Route path="/periods" component={PeriodIndex} />
        
      </Switch>
    </main>
  </BrowserRouter>
)


ReactDOM.render(
  <App />,
  document.getElementById('root')
)