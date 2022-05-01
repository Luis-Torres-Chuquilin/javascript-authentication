/** @format */

import { useHistory } from "react-router-dom";

export const PasswordResetSuccess = () => {
  const history = useHistory();

  return (
    <div className="content-container">
      <h1>Success!</h1>
      <p>Ypur password has been reset, now you can log in</p>
      <button onClick={() => history.push("/login")}>Login</button>
    </div>
  );
};
