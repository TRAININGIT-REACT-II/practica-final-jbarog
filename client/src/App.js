import { useEffect, useState, useReducer } from "react";
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";

import CssBaseline from '@material-ui/core/CssBaseline';

import Auth from "contexts/auth";
import reducer,{initialState} from "reducers/notes";
import Status from "components/Status";
import Login from "components/Pages/Auth/Login";
import ListNotes from "components/Pages/Notes/ListNotes";
import PrivateRoute from "components/routers/PrivateRoute";
import Route404 from "components/routers/Route404";
import store from "./store";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(false);

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok"))
      .finally(() => setLoading(false));
  }, []);

  // Mostramos la aplicación
  return (
    <>
      <CssBaseline />
      <Auth.Provider value={{ currentUser, updateAuth: setCurrentUser }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <main>
              <h1>Curso de React de TrainingIT</h1>
              <p>
              Estado del servidor:
              {loading ? " Cargando..." : <Status status={status} />}
              </p>
              </main>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <PrivateRoute path="/notes">
              <ListNotes state={state} dispatch={dispatch}/>
            </PrivateRoute>
            <Route404>
              Not Found
            </Route404>
          </Switch>
          <NavLink exact activeClassName="active" to="/notes">notes</NavLink>
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
        </Router>
      </Auth.Provider>
    </>
  );
};

export default App;
