import React from 'react';
import { Switch, Route } from 'react-router-dom'
import App from './App';
import OnePlayerMenu from './containers/OnePlayerMenu';
import TwoPlayerMenu from './containers/TwoPlayerMenu';
import Room from './containers/Room';
import ModeSelect from './components/ModeSelect';
import MainGameContainer from './containers/MainGameContainer'
import Ready from './components/Ready'

const Routes = () => (
  <main>
      <Route path='/' exact component={App}/>
      <Route path ='/modeselect' component={ModeSelect}/>
      <Route path='/oneplayermenu' component={OnePlayerMenu}/>
      <Route path='/oneplayerready' component={Ready}/>
      <Route path='/oneplayerplay' component={MainGameContainer}/>
      <Route path='/twoplayermenu' component={TwoPlayerMenu}/>
      <Route path='/rooms/:id' component={Room}/>
  </main>
)

export default Routes
