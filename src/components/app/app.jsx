import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage, NotFound404 } from '../../pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
