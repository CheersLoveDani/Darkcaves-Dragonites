import './App.css'
import { MemoryRouter, Link, Route, Switch } from 'react-router-dom'
import Nav from './Components/Nav'

const Stand = () => {


  return (
    <h1>Stand</h1>
  )
}

const Sit = () => {
  return (
    <h1>Sit</h1>
  )
}

const Home = () => {
  return (
    <h1>Home</h1>
  )
}

const Pokedex = () => {
  return (
    <h1>Pokedex</h1>
  )
}

const App = (props) => {
  return (
    <MemoryRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/one" component={Stand} />
        <Route exact path="/two" component={Sit} />
        <Route exact path='/pokedex' component={Pokedex} />
      </Switch>
    </MemoryRouter>
  );
}


export default App