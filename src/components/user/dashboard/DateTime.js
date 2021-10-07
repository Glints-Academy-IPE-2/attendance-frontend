import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [clockState, setClockState] = useState("");
  const [dateState, setDateState] = useState("");

  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const interval = setInterval(() => {
      const dateTime = new Date();

      // convert dateTime into date string -> day, date month year
      const day = days[dateTime.getDay()];
      const date = dateTime.getDate();
      const month = months[dateTime.getMonth()];
      const year = dateTime.getFullYear();
      const dateFormat = `${day}, ${date} ${month} ${year}`;
      setDateState(dateFormat);

      // convert dateTime into time string -> hours:minutes am/pm
      const time = dateTime.toLocaleTimeString();
      const hours = ("0" + time.slice(0, -9)).slice(-2);
      const minutes = time.slice(-8, -6);
      const period = time.slice(-2).toLocaleLowerCase();
      const timeFormat = `${hours}:${minutes} ${period}`;
      setClockState(timeFormat);
    }, 1000);

    // clear the timer when the component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <h5 className="mt-3 mb-4">{dateState}</h5>
      <h4 className="display-3" style={{ fontWeight: "600" }}>
        {clockState}
      </h4>
    </>
  );
};

export default DateTime;
