import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import Header from "../Hearder";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import TodoList from "../../features/Todolist";
import Sidebar from "../Sidebar";
import { Dashboard } from "../../features/Dashboard";
import { getAllTask } from "../../features/Todolist/todoSlice";
import { useDispatch } from "react-redux";
import Blockchain from "../../features/Blockchain";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    gridTemplateColumns: "240px 1fr",
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: "100vh",
  },

  header: {
    gridArea: "header",
  },
  sidebar: {
    gridArea: "sidebar",
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: "main",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}));
function Layout(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // init get all task after login
    (() => {
      try {
        const action = getAllTask();
        dispatch(action);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    })();
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>

      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>

      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>

          <Route path="/admin/todolist">
            <TodoList />
          </Route>

          <Route path="/admin/blockchain">
            <Blockchain />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

export default Layout;
