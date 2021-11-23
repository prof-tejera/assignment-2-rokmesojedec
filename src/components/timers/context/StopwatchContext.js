import React, { useEffect, useState } from 'react';
import { Timer } from '../../../classes/Timer';
import ReactTooltip from 'react-tooltip';

export const StopwatchContext = React.createContext({});

const timer = new Timer({
    countdownMode: false,
    seconds: 30
});

const StopwatchProvider = ({ children }) => {

    const [editMode, setEditMode] = useState(false);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);
    const [isDone, setDone] = useState(false);

    useEffect(() => {
        // Add state tick update and complet events to timer object
        timer.pushIntervalFunction((timer) => { setProgress(timer.percentComplete); })
        timer.onFinished = () => { setPaused(false); if(timer.isTimerComplete) setDone(true); };

        setProgress(timer.percentComplete);

        // Needed to keep tooltips after component mount/unmount
        ReactTooltip.rebuild();

        return () => {
            // stop and remove intervals on unmount
            timer.clear();
            timer.clean();
        }
    }, []);

    useEffect(()=>{
        // Needed to keep tooltips after component mount/unmount
        ReactTooltip.rebuild();
    },[isDone])

    const title = "Stopwatch";
    const start = () => { timer.start(false); setPaused(true); setEditMode(false); setDone(false); }
    const pause = () => { timer.clear(); setPaused(false); }
    const reset = () => { timer.reset(); setProgress(timer.percentComplete); }
    const toggleEditMode = () => { pause(); fastForward();  setDone(false); setEditMode(!editMode);  pause(); if(editMode) {reset();} }
    const fastForward = () => { timer.finishRound(); setProgress(timer.percentComplete); start(); setPaused(false); setDone(true); }
    const runAgain = () => { reset(); setDone(false); }

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
            runAgain,
            timer,
            title,
            isDone
        }}>
        {children}
    </StopwatchContext.Provider>
}

export default StopwatchProvider;