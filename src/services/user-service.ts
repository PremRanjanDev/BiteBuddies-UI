import { USER_ALL, USER_LOGIN, USER_SIGN_UP } from "../api/user-api";
import {
  ALL_USERS_RES,
  LOGIN_USER_RES,
  SIGNUP_USER_RES,
} from "./mock-user-data";
import { api } from "./service-helper";

export interface UserInfo {
  id: number;
  name: string;
  username: string;
}

export async function userLogin(
  username: string,
  password: string,
  onSuccess: (res: any) => void,
  onError: (error: any) => void
) {
  api
    .post(USER_LOGIN, { username, password: password })
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError(err);
    });
  // onSuccess(LOGIN_USER_RES);
}

export async function userSignUp(
  name: string,
  username: string,
  password: string,
  onSuccess: (res: any) => void,
  onError: (error: any) => void
) {
  api
    .post(USER_SIGN_UP, { name, username, password: password })
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError(err);
    });
  // onSuccess(SIGNUP_USER_RES);
}

export async function getAllUsers(
  onSuccess: (res: any) => void,
  onError: (error: any) => void
) {
  api
    .get(USER_ALL)
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError(err);
    });
  // onSuccess(ALL_USERS_RES);
}
