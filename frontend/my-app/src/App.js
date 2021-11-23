import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Main from "./routes/Main";

function App() {
  return (
	  <Router>
      <Switch>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
