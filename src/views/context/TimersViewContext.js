import React, { useEffect, useState } from 'react';
import Stopwatch from "../../components/timers/Stopwatch";
import Countdown from "../../components/timers/Countdown";
import XY from "../../components/timers/XY";
import Tabata from "../../components/timers/Tabata";

export const TimersViewContext = React.createContext({});

const TimersViewProvider = ({ children }) => {

    const timers = [
        { title: "Stopwatch", C: <Stopwatch title={"Stopwatch"} /> },
        { title: "Countdown", C: <Countdown title={"Countdown"} /> },
        { title: "XY", C: <XY title={"XY"} /> },
        { title: "Tabata", C: <Tabata title={"Tabata"} /> },
    ];

    return <TimersViewContext.Provider
        value={{
            timers
        }}>
        {children}
    </TimersViewContext.Provider>
}

export default TimersViewProvider;