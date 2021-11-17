import React, { useEffect, useState } from 'react';
import { Timer } from '../../../classes/Timer';
import ReactTooltip from 'react-tooltip';

export const CountdownContext = React.createContext({});

const timer = new Timer({
    minutes: 0,
    seconds: 10,
    tickSize: Timer.TIME_ENUM.MILLISECOND * 52,
});

const CountdownProvider = ({ children }) => {

    const [editMode, setEditMode] = useState(false);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(10000);
    const [isDone, setDone] = useState(false);

    useEffect(() => {
        // Add state tick update and complet events to timer object
        timer.pushIntervalFunction((timer) => { setProgress(timer.percentComplete); })
        timer.onFinished = () => { setPaused(false); if (timer.isTimerComplete) setDone(true); };

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

    const title = "Countdown";
    const start = () => { setDone(false); timer.start(false); setPaused(true); setEditMode(false);  }
    const pause = () => { timer.clear(); setPaused(false); }
    const reset = () => { timer.reset(); setProgress(timer.percentComplete); }
    const toggleEditMode = () => { pause(); reset(); setEditMode(!editMode); }
    const fastForward = () => { timer.finishRound(); setProgress(timer.percentComplete); start(); setDone(true) }
    const runAgain = () => { reset(); setDone(false); }

    return <CountdownContext.Provider
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
            setDone,
            isDone
        }}>
        {children}
    </CountdownContext.Provider>
}

export default CountdownProvider;