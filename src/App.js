import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import LoginPage from "components/pages/login";
import RegisterPage from "components/pages/register";
import ConfirmUserPage from "components/pages/confirmUser";
import HomePage from "components/pages/home";
import { ThemeProvider } from "@material-ui/styles";
import theme from "theme";
import UserContext from "context";

const App = _ => {
  return (
    <UserContext.Wrapper>
      {({ userData }) => {
        return (
          <ThemeProvider theme={theme}>
            <Router>
              <Switch>
                {userData.isLoggedIn
                  ? [
                      <Route key="home" exact path="/" component={HomePage} />,
                      <Route
                        exact
                        key="login"
                        path="/login"
                        component={() => (
                          <>
                            <Redirect to="/" />
                            <Route path="/" exact component={HomePage} />
                          </>
                        )}
                      />,
                    ]
                  : [
                      <Route
                        path="/register"
                        key="register"
                        component={() => (
                          <>
                            <Redirect to="/register" />
                            <Route
                              path="/register"
                              exact
                              component={RegisterPage}
                            />
                          </>
                        )}
                      />,
                      <Route
                        path="/confirm-user"
                        key="confirm"
                        component={() => (
                          <>
                            <Redirect to="/confirm-user" />
                            <Route
                              path="/confirm-user"
                              exact
                              component={ConfirmUserPage}
                            />
                          </>
                        )}
                      />,
                      <Route
                        path="*"
                        key="login"
                        component={() => (
                          <>
                            <Redirect to="/login" />
                            <Route path="/login" exact component={LoginPage} />
                          </>
                        )}
                      />,
                    ]}
              </Switch>
            </Router>
          </ThemeProvider>
        );
      }}
    </UserContext.Wrapper>
  );
};

export default App;
