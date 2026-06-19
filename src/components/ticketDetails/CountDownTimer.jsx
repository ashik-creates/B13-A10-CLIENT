"use client";

import Countdown from "react-countdown";

const CountdownTimer = ({ departureDateTime }) => {
  return (
    <Countdown
      date={new Date(departureDateTime)}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return (
            <div className="rounded-xl border border-danger/20 bg-danger/10 p-4 text-center text-danger">
              Departure Time Passed
            </div>
          );
        }

        return (
          <div className="grid grid-cols-4 gap-3">
            <div className="rounded-xl border p-4 text-center">
              <p className="text-2xl font-bold">{days}</p>
              <p className="text-xs">Days</p>
            </div>

            <div className="rounded-xl border p-4 text-center">
              <p className="text-2xl font-bold">{hours}</p>
              <p className="text-xs">Hours</p>
            </div>

            <div className="rounded-xl border p-4 text-center">
              <p className="text-2xl font-bold">{minutes}</p>
              <p className="text-xs">Minutes</p>
            </div>

            <div className="rounded-xl border p-4 text-center">
              <p className="text-2xl font-bold">{seconds}</p>
              <p className="text-xs">Seconds</p>
            </div>
          </div>
        );
      }}
    />
  );
};

export default CountdownTimer;