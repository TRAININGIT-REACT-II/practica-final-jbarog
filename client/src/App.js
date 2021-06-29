import { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import ErrorBoundary from "./components/ui/ErrorBoundary";
import Auth from "contexts/auth";
import Join from "components/Pages/Auth/Join";
import Login from "components/Pages/Auth/Login";
import ListNotes from "components/Pages/Notes/ListNotes";
import PrivateRoute from "components/routers/PrivateRoute";
import Route404 from "components/routers/Route404";
import {STORAGE_KEY} from "constants/authForm";
import store from "./store";
import {storeObject,getStoredObject} from "utils/storage.helpers";


const App = () => {
  const currentUserStored = getStoredObject(STORAGE_KEY) || false;
  const [darkMode, setDarkMode] = useState(false)
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(currentUserStored);
  const updateAuth = data => {
    setCurrentUser(data);
    if(data) {
      storeObject(STORAGE_KEY, data);
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const onChangeDarkMode = (e,v)=>{
    setDarkMode(v)
  }

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  const onReset = () => {
    setDarkMode(false);
    setLoading(false);
    setCurrentUser(false);
    localStorage.removeItem(STORAGE_KEY)
  };

  return (
    <ErrorBoundary message="An error ocurred" onReset={onReset}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Auth.Provider value={{ currentUser, updateAuth }}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Redirect
                    to={{
                      pathname: "/notes",
                    }}
                  />
                </Route>
                <Route path="/join">
                  <Join/>
                </Route>
                <Route path="/login">
                  <Login/>
                </Route>
                <PrivateRoute path="/notes">
                  <ListNotes onChangeDarkMode={onChangeDarkMode}/>
                </PrivateRoute>
                <Route404>
                  Not Found
                </Route404>
              </Switch>
            </Router>
          </Auth.Provider>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
