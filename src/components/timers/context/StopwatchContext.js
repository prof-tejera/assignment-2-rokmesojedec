import React, { useEffect, useState } from 'react';
import { Timer } from '../../../classes/Timer';

export const StopwatchContext = React.createContext({});

const timer = new Timer({
    countdownMode: false,
    stopWatchMode: true,
});

const StopwatchProvider = ({ children }) => {

    const [editMode, setEditMode] = useState(false);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        timer.pushIntervalFunction((timer) => {
            setProgress(timer.minutePercentComplete);
        })
        timer.onCompleted = () => { setPaused(false); };
        setProgress(timer.minutePercentComplete);
        return () => {
            timer.clear();
            timer.clean();
        }
    }, []);

    const title = "Stopwatch";
    const start = () => { timer.start(false); setPaused(true); setEditMode(false); }
    const pause = () => { timer.clear(); setPaused(false); }
    const reset = () => { timer.reset(); setProgress(timer.minutePercentComplete); }
    const toggleEditMode = () => { pause(); setEditMode(!editMode); setProgress(timer.minutePercentComplete); }
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