import React from "react";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

function App() {

  const timers = [
    { title: "Stopwatch", C: <Stopwatch title={"Stopwatch"} /> },
    { title: "Countdown", C: <Countdown title={"Countdown"} /> },
    { title: "XY", C: <XY title={"XY"} /> },
    { title: "Tabata", C: <Tabata title={"Tabata"} /> },
  ];

  return (
    <div className="grid typescale-md-major-third grid-col-span-12 children-slide-down">
      {timers.map((timer, index) => (
        <div className="col-lg-span-6 " key={index}>
          <div className="m-t-2 m-x-0 p-0">
            {timer.C}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
