import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect,useHistory } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = ({playertype}) => {
  let player = playertype
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password, player));
    if (data.errors) {
      setErrors(data.errors);
    }
    else{
      history.push("/")
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={updateUsername}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
