import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavigationBar from "./components/NavigationBar/NavigationBar";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainComponent from "./components/MainComponent"


function App() {

  return (
    <BrowserRouter>
      <NavigationBar />
      <Switch>
        <Route path="/loginPlayerOne" exact={true}>
          <LoginForm playertype={"Player One"}/>
        </Route>
        <Route path="/loginPlayerTwo" exact={true}>
          <LoginForm playertype={"Player Two"}/>
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/" exact={true}>
          <MainComponent/>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
