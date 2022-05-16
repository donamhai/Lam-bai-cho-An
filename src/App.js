import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import AuthFeatures from "./features/Auth";
import FireBase from "./config/firebase";
import TodoList from "./features/Todolist";
import Layout from "./components/layout";

function App() {
  //check user is logging or not when app is started
  useEffect(() => {
    const unregisterAuthObserver = FireBase.auth().onAuthStateChanged(
      async (user) => {
        if (!user) {
          console.log("user is not logged in");
          return;
        }

        await user.getIdToken();
      }
    );

    return () => unregisterAuthObserver();
  }, []);

  return (
    <div className="App">
      <Switch>
        <Redirect from="/" to="/signin" exact />

        <Route path="/signin" component={AuthFeatures} />
        <Route path="/admin" component={Layout} />
      </Switch>
    </div>
  );
}

export default App;
