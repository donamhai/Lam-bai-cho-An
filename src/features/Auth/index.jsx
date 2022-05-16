import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, makeStyles } from "@material-ui/core";
import Register from "./components/Register";
import Login from "./components/Login";
import SocialLogin from "./components/SocialLogin";

AuthFeatures.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
    width: "500px",
    margin: "0 auto",
  },
}));

function AuthFeatures(props) {
  const classes = useStyles();
  const MODE = {
    LOGIN: "login",
    REGISTER: "register",
  };
  const [mode, setMode] = useState(MODE.LOGIN);
  return (
    <Box className={classes.root}>
      {mode === MODE.REGISTER && (
        <>
          <Register />
          <Box textAlign="center">
            <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
              Nếu bạn đã có tài khoản thì ấn vào đây để đi đến màn hình đăng
              nhập
            </Button>
          </Box>
        </>
      )}

      {mode === MODE.LOGIN && (
        <>
          <Login />
          <Box textAlign="center">
            <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
              Nếu bạn chưa có tài khoản thì hãy vào đây để đăng kí
            </Button>
          </Box>
        </>
      )}

      <SocialLogin />
    </Box>
  );
}

export default AuthFeatures;
