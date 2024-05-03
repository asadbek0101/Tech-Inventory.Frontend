import { PersistConfig } from "redux-persist";
import { jwtDecode } from "jwt-decode";

import { AppStoreState } from "../store/RootReducer";
import { createReducer, createRootReducer, PerformAction } from "../utils/ReducerUtils";
import { DELETE, update } from "immupdate";
import { Action } from "redux";

export const authReducerPersistConfig: Partial<PersistConfig<AuthReducerState>> = {
  whitelist: ["token", "userId"],
};

export interface Profile {
  readonly userId: string;
  readonly email: string;
  readonly name: string;
  readonly role: string;
  readonly RoleName: string;
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
}

export interface AuthReducerState {
  readonly token?: string;
  readonly userId?: string;
}

function getState(): AuthReducerState {
  return {
    token: "",
    userId: "",
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

  createReducer([ReducerActions.ResetToken], (state) => update(state, { token: DELETE })),
);

// ==================
// Selectors
// ==================

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

export function setToken(meta: SetTokenMeta): PerformAction<SetTokenMeta> {
  return { meta, type: ReducerActions.SetToken };
}

export function setUserId(meta: SetUserIdMeta): PerformAction<SetUserIdMeta> {
  return { meta, type: ReducerActions.SetUserId };
}

export function resetToken(): Action {
  return { type: ReducerActions.ResetToken };
}
