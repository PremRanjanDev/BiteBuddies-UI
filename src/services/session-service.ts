import {
  SESSION_ACTIVE,
  SESSION_ALL,
  SESSION_DETAIL,
} from "../api/session-api";
import {
  ACTIVE_SESSIONS_RES,
  ALL_SESSIONS_RES,
  GET_SESSION_DETAIL,
  SESSION_INVITE_RES,
  UPDATE_SESSION_RES,
} from "./mock-session-data";
import { api } from "./service-helper";
import { UserInfo } from "./user-service";

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
  startsAt: string;
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

export async function updateSession(
  id: number,
  data: BiteSession,
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
      onError(err);
    });
  // onSuccess(true);
}

export async function inviteSession(
  id: number,
  userIds: [1, 2, 3],
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
  // onSuccess(SESSION_INVITE_RES);
}
