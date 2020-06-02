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
import PeriodShow from './components/PeriodShow'
import Nav from './common/Nav'
import 'bulma'
import '../src/styles/main.css'


const App = () => (
  <BrowserRouter>
    <main>
      <Nav />
      <Switch>
        <Route exact path="/"component={Home}/>
        <Route path="/periods/:id/edit" component={PeriodEdit} />
        <Route path="/periods/new" component={PeriodNew}  />
        <Route path="/periods/:id" component={PeriodShow} />
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