import { PersistConfig } from "redux-persist";
import { jwtDecode } from "jwt-decode";

import { AppStoreState } from "../store/RootReducer";
import { createReducer, createRootReducer, PerformAction } from "../utils/ReducerUtils";
import { DELETE, update } from "immupdate";
import { Action } from "redux";

export const authReducerPersistConfig: Partial<PersistConfig<AuthReducerState>> = {
  whitelist: ["token", "UserId", "authDate", "authExpiredDate"],
};

export interface Profile {
  readonly UserId: string;
  readonly email: string;
  readonly name: string;
  readonly role: string;
  readonly RoleName: string;
}

interface SetAuthDateMeta {
  readonly authDate: number;
}

interface SetAuthExpiredDateMeta {
  readonly authExpiredDate: boolean;
}

interface SetTokenMeta {
  readonly token: string;
}

interface SetUserIdMeta {
  readonly userId: string;
}

enum ReducerActions {
  SetToken = "Auth/SetToken",
  SetUserId = "Auth/SetUserId",
  ResetToken = "Auth/ResetToken",
  SetAuthDate = "Auth/SetAuthDate",
  SetAuthExpiredDate = "Auth/SetAuthExpiredDate",
}

export interface AuthReducerState {
  readonly token?: string;
  readonly userId?: string;
  readonly authDate?: number;
  readonly authExpiredDate?: boolean;
}

function getState(): AuthReducerState {
  return {
    token: "",
    userId: "",
    authDate: 0,
    authExpiredDate: true,
  };
}

export const authReducer = createRootReducer<AuthReducerState>(
  getState(),

  createReducer([ReducerActions.SetToken], (state, { meta }) =>
    update(state, { token: meta.token }),
  ),

  createReducer([ReducerActions.SetUserId], (state, { meta }) =>
    update(state, { userId: meta.userId }),
  ),

  createReducer([ReducerActions.SetAuthDate], (state, { meta }) =>
    update(state, { authDate: meta.authDate }),
  ),

  createReducer([ReducerActions.SetAuthExpiredDate], (state, { meta }) =>
    update(state, { authExpiredDate: meta.authExpiredDate }),
  ),

  createReducer([ReducerActions.ResetToken], (state) => update(state, { token: DELETE })),
);

// ==================
// Selectors
// ==================

export function authDateSelector(state: AppStoreState): undefined | number {
  return state.auth.authDate;
}

export function authDateExpiredSelector(state: AppStoreState): boolean | undefined {
  return state.auth.authExpiredDate;
}

export function tokenSelector(state: AppStoreState): string | undefined {
  return state.auth.token;
}

export function userIdSelector(state: AppStoreState): string | undefined {
  return state.auth.userId;
}

export function profileSelector(state: AppStoreState): Profile | undefined {
  if (state.auth.token) {
    const profile: Profile = jwtDecode(state?.auth?.token);
    return profile;
  }
  return;
}

// ==================
// Actions
// ==================

export function setAuthDate(meta: SetAuthDateMeta): PerformAction<SetAuthDateMeta> {
  return { meta, type: ReducerActions.SetAuthDate };
}

export function setAuthDateExpired(
  meta: SetAuthExpiredDateMeta,
): PerformAction<SetAuthExpiredDateMeta> {
  return { meta, type: ReducerActions.SetAuthExpiredDate };
}

export function setToken(meta: SetTokenMeta): PerformAction<SetTokenMeta> {
  return { meta, type: ReducerActions.SetToken };
}

export function setUserId(meta: SetUserIdMeta): PerformAction<SetUserIdMeta> {
  return { meta, type: ReducerActions.SetUserId };
}

export function resetToken(): Action {
  return { type: ReducerActions.ResetToken };
}
