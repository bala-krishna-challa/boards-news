import { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import useUserState from "./hooks/useUserState";

import "./App.css";
import Loader from "./UI/Loader";
import AppProvider from "./providers/app-context/AppProvider";
import ErrorHandler from "./app-error/ErrorHanlder";

const LazyBoards = lazy(() => import("./pages/Boards"));

function App() {
  const { isAuthenticated } = useUserState();

  return (
    <AppProvider>
      <Suspense fallback={<Loader />}>
        <div className="App">
          <ErrorHandler>
            <Switch>
              <Route path="/login" component={Login} />
              <ProtectedRoute
                path="/boards"
                redirectPath="/login"
                isAuthenticated={isAuthenticated}
                component={LazyBoards}
              />
              <Route path="*">
                <Redirect to="/boards" />
              </Route>
            </Switch>
          </ErrorHandler>
        </div>
        <Loader />
      </Suspense>
    </AppProvider>
  );
}

export default App;
