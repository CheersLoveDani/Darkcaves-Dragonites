import logo from './logo.svg';
import './App.css';
import { HashRouter, Link, Route, Switch, useHistory } from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/button';

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

const App = (props) => {
  let history = useHistory()
  return (
    <HashRouter>
      <div className="App">
        <div className="menu">
          <ButtonGroup isAttached>
            <Button>
              <h2>Home</h2>
            </Button>
            <Button>
              <Link to="/one"><h2>Stand</h2></Link>
            </Button>
            <Button>
              <Link to="/two"><h2>Sit</h2></Link>
            </Button>
          </ButtonGroup>

        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/one" component={Stand} />
          <Route exact path="/two" component={Sit} />
        </Switch>
      </div>
    </HashRouter>
  );
}


export default App;
