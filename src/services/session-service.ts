import {
  SESSION,
  SESSION_ACTIVE,
  SESSION_ALL,
  SESSION_DETAIL,
  SESSION_INVITE,
} from "../api/session-api";
import { api } from "./service-helper";
import { UserInfo } from "./user-service";

import { toast } from "react-toastify";

export interface RestaurantInfo {
  id: number;
  name: string;
  location: string;
  imageUrl: string;
}

export interface SessionRestaurant {
  sessionId: number;
  restaurant: RestaurantInfo;
  submittedByUserId: number;
}

export interface SessionUsers {
  sessionId: number;
  user: UserInfo;
  status: "invited" | "joined";
}
export interface BiteSession {
  id: number;
  name: string;
  description: string;
  startsAt?: string;
  initiatedByUserId: number;
  initiatedBy: UserInfo;
  active: boolean;
  createdAt: string;
  sessionUsers?: SessionUsers[];
  sessionRestaurant?: SessionRestaurant[];
}

export async function getActiveSessions(
  onSuccess: (res: any) => void,
  onError: (error: any) => void
) {
  api
    .get(SESSION_ACTIVE)
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError(err);
    });
  // onSuccess(ACTIVE_SESSIONS_RES);
}

export async function getAllSessions(
  onSuccess: (res: any) => void,
  onError: (error: any) => void
) {
  api
    .get(SESSION_ALL)
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError(err);
    });
  // onSuccess(ALL_SESSIONS_RES);
}

export async function getSessionDetail(
  id: number,
  onSuccess: (res: any) => void,
  onError: (error: any) => void
) {
  api
    .get(SESSION_DETAIL.replace("{id}", id.toString()))
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError(err);
    });
  // onSuccess(GET_SESSION_DETAIL);
}

export async function createSession(
  data: BiteSession,
  onSuccess: (res: any) => void,
  onError: (error: any) => void
) {
  api
    .post(SESSION, data)
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError ? onError(err) : toast.error("Could not create session");
    });
  // onSuccess(UPDATE_SESSION_RES);
}

export async function updateSession(
  data: BiteSession,
  onSuccess: (res: any) => void,
  onError: (error: any) => void
) {
  api
    .put(SESSION, data)
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError ? onError(err) : toast.error("Could not update session");
    });
  // onSuccess(UPDATE_SESSION_RES);
}

export async function deleteSession(
  id: number,
  onSuccess: (res: any) => void,
  onError: (error: any) => void
) {
  api
    .get(SESSION_DETAIL.replace("{id}", id.toString()))
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError ? onError(err) : toast.error("Could not delete session");
    });
  // onSuccess(true);
}

export async function inviteUser(
  id: number,
  userIds: number[],
  onSuccess: (res: any) => void,
  onError?: (error: any) => void
) {
  api
    .put(SESSION_DETAIL.replace("{id}", id.toString()), userIds)
    .then((res) => {
      onSuccess(res.data);
    })
    .catch((err) => {
      onError ? onError(err) : toast.error("Could not invite users");
    });
  // onSuccess(SESSION_INVITE_RES);
}
