/** @format */
import { logInRoute } from "./logInRoute";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute";
import { testRoute } from "./testRoute";
import { signUpRoute } from "./signUpRoute";
import { updateUserInfoRoute } from "./updateUserInfoRoute";
import { testEmailRoute } from "./testEmailRoute";
import { verifyEmailRoute } from "./verifyEmailRoute";
import { ForgotPassworRoute } from "./forgotPasswordRoute";
import { resetPasswordRoute } from "./resetPasswordRoute";

import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute";

export const routes = [
  testRoute,
  signUpRoute,
  logInRoute,
  updateUserInfoRoute,
  testEmailRoute,
  verifyEmailRoute,
  ForgotPassworRoute,
  resetPasswordRoute,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute,
];
