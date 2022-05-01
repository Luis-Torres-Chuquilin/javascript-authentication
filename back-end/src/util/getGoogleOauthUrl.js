/** @format */

import { oauthClient } from "./oauthClient";

export const getGoogleOauthUrl = () => {
  const scopes = [
    "https://wwww.googleapis.com/auth/userinfo.email",
    "https://wwww.googleapis.com/auth/userinfo.profile",
  ];

  return oauthClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: "email profile",
  });
};

// default_scope: "email profile"

// scope: "email profile",
