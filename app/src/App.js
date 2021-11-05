import './App.css'
import { MemoryRouter, Route, Switch } from 'react-router-dom'

import Nav from './Components/Nav'
import Pokedex from './Components/Pokedex/Pokedex'
import Home from './Components/Home'
import Trainer from './Components/Trainer/Trainer'
import Pokemon from './Components/Pokemon/Pokemon'
import Bag from './Components/Bag/Bag'
import Pc from './Components/Pc/Pc'


const App = (props) => {
  return (
    <MemoryRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path='/pokedex' component={Pokedex} />
        <Route exact path='/trainer' component={Trainer} />
        <Route exact path='/pokemon' component={Pokemon} />
        <Route exact path='/bag' component={Bag} />
        <Route exact path='/pc' component={Pc} />
      </Switch>
    </MemoryRouter>
  );
}


export default App