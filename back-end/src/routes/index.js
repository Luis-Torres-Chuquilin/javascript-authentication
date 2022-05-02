/** @format */
// LogIn
import { logInRoute } from "./LogIn/logIn/logInRoute";
// SignUP
import { signUpRoute } from "./LogIn/signUp/signUpRoute";
// Update User Info
import { updateUserInfoRoute } from "./LogIn/updateUserInfo/updateUserInfoRoute";
// Forgot Password

import { ForgotPassworRoute } from "./LogIn/resetPassword/forgotPasswordRoute";
import { resetPasswordRoute } from "./LogIn/resetPassword/resetPasswordRoute";

// GoogleOut
import { getGoogleOauthUrlRoute } from "./LogIn/googleOauth/getGoogleOauthUrlRoute";
import { googleOauthCallbackRoute } from "./LogIn/googleOauth/googleOauthCallbackRoute";
import { testRoute } from "./testRoute";

// Verify Email Route
import { verifyEmailRoute } from "./LogIn/emailVerification/verifyEmailRoute";

import { testEmailRoute } from "./testEmailRoute";

// Post Route
import { allPostRoute } from "./Post/allPostRoute";
import { createPostRoute } from "./Post/createPostRoute";
import { updatePostRoute } from "./Post/updatePostRoute";

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
  //  Posts
  allPostRoute,
  createPostRoute,
  updatePostRoute,
];
