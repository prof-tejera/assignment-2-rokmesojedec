import React, { useEffect, useState } from 'react';
import { Timer } from '../../../classes/Timer';

export const StopwatchContext = React.createContext({});

const timer = new Timer({
    // tickSize: Timer.TIME_ENUM.MILLISECOND * 52,
    countdownMode: false,
    stopWatchMode: true,
});
let counter = 0;
const StopwatchProvider = ({ children }) => {

    const [editMode, setEditMode] = useState(false);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        let c = counter;
        console.log(counter++);

        console.log("stopwatch on mount");
        timer.pushIntervalFunction((timer) => { 
            console.log(c);
            setProgress(timer.minutePercentComplete); })
        timer.onCompleted = () => { setPaused(false); };
        setProgress(timer.minutePercentComplete);
        return () => {
            timer.clear();
            timer.clean();
        }
    }, [timer]);

    const title = "Stopwatch";
    const start = () => { timer.start(false); setPaused(true); setEditMode(false); }
    const pause = () => { timer.clear(); setPaused(false); }
    const reset = () => { timer.reset(); setProgress(timer.minutePercentComplete); }
    const toggleEditMode = () => { pause();  setEditMode(!editMode); setProgress(timer.minutePercentComplete); }
    const fastForward = () => { timer.finishRound(); setProgress(timer.minutePercentComplete); }

    return <StopwatchContext.Provider
        value={{
            paused,
            progress,
            editMode,
            toggleEditMode,
            start,
            pause,
            reset,
            fastForward,
            timer,
            title
        }}>
        {children}
    </StopwatchContext.Provider>
}

export default StopwatchProvider;