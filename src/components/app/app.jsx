import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from '../../pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
