import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/Nav';
import SideDishes from './components/sideDishes/SideDishes';
import BrokenRicePage from './components/brokenRice/brokenRicePage';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/brokenRices" component={BrokenRicePage} exact />
        <Route path="/sideDishes" component={SideDishes} exact />
        <Route path="/" component={Home} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
