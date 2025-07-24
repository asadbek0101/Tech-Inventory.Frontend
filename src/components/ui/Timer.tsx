import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { AppClock } from "./Clock";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import {
  authDateExpiredSelector,
  authDateSelector,
  resetToken,
  setAuthDateExpired,
  tokenSelector,
} from "../../reducers/authReducer";

import { useAuthContext } from "../../api/auth/AuthContext";

export function AppTimerWrapper() {
  const dispatch = useDispatch();

  const token = useShallowEqualSelector(tokenSelector);
  const authDate = useShallowEqualSelector(authDateSelector);
  const authDateExpired = useShallowEqualSelector(authDateExpiredSelector);

  const { logout } = useAuthContext();

  const showOtp = useMemo(() => token && authDateExpired, [authDateExpired, token]);

  const initialTime = useMemo(() => {
    if (authDate) {
      if ((Date.now() - authDate) / 1000 > 3660) {
        logout();
      } else {
        const passTime = Date.now() - authDate;

        return 3600 - passTime / 1000;
      }
    }

    return 0;
  }, [authDate, logout]);

  return (
    <div className="d-flex  align-items-center">
      {!showOtp ? (
        <AppClock
          initialTime={initialTime}
          token={token}
          onComplete={() => {
            dispatch(setAuthDateExpired({ authExpiredDate: true }));
            dispatch(resetToken());
          }}
        />
      ) : (
        <span className="font-weight-bold">00:00</span>
      )}
    </div>
  );
}
