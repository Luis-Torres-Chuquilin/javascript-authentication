/** @format */

import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const ForgotPasswordPage = () => {
  const [errorMessage, setErroMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const history = useHistory();

  const onSubmitClicked = async () => {
    try {
      await axios.put(`/api/forgot-password/${emailValue}`);
      setSuccess(true);
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (e) {
      setErroMessage(e.message);
    }
  };
  return success ? (
    <div>
      {" "}
      <h1> Success</h1>
    </div>
  ) : (
    <div>
      {" "}
      <h1>Forgot Password</h1>
      <p> Enter your email and we'll send you a reset link</p>
      {errorMessage && <div className="fail">{errorMessage} </div>}
      <input
        value={emailValue}
        onChange={(e) => {
          setEmailValue(e.target.value);
        }}
      />
      <button disabled={!emailValue} onClick={onSubmitClicked}>
        Send reset link
      </button>
    </div>
  );
};
