import { DateTime } from "luxon";
import React, { useEffect, useMemo, useState } from "react";

interface Props {
  readonly token?: string;
  readonly initialTime: number;
  readonly onComplete: () => void;
}

export function AppClock({ token, initialTime, onComplete }: Props) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((x) => {
        if (x >= 1) {
          return x - 1;
        }

        clearInterval(interval);

        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if (time === 0) {
      onComplete();
    }
  }, [time, onComplete]);

  const timeText = useMemo(() => {
    const dateTime = DateTime.fromSeconds(time);

    return dateTime.toFormat("mm:ss");
  }, [time]);
  return <span className="font-weight-bold">{timeText}</span>;
}
