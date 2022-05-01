/** @format */

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";

import { useQueryParams } from "../util/useQueryParams";

export const LogInPage = () => {
  //
  const [, setToken] = useToken();
  //
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [googleOauthUrl, setGoogleOauthUrl] = useState("");

  const { token: oauthToken } = useQueryParams();
  const history = useHistory();

  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      history.push("/");
    }
  }, [oauthToken, setToken, history]);

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get("/auth/google/url");
        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (err) {
        console.log(err);
      }
    };
    loadOauthUrl();
  }, []);
  const onLogInClicked = async () => {
    try {
      const response = await axios.post("/api/login", {
        email: emailValue,
        password: passwordValue,
      });
      console.log("Response completed");
      const { token } = response.data;
      setToken(token);
      history.push("/");
    } catch (er) {
      console.log("error", er);
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        placeholder="someone@gmail.com"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <hr />
      <button disabled={!emailValue || !passwordValue} onClick={onLogInClicked}>
        Log In
      </button>
      <button onClick={() => history.push("/forgot-password")}>
        Forgor your password?
      </button>
      <button onClick={() => history.push("/signup")}>
        Don't have an account? Sign Up
      </button>
      <button
        disabled={!googleOauthUrl}
        onClick={() => {
          window.location.href = googleOauthUrl;
        }}
      >
        Log in with Google
      </button>
    </div>
  );
};
