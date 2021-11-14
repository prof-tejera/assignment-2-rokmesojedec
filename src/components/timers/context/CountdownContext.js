import React, { useEffect, useState } from 'react';
import { Timer } from '../../../classes/Timer';

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

    useEffect(() => {
        timer.pushIntervalFunction((timer) => { setProgress(timer.percentComplete); })
        timer.onFinished = () => { setPaused(false); };
        setProgress(timer.percentComplete);
        return () => {
            timer.clear();
            timer.clean();
        }
    }, []);

    const title = "Countdown";
    const start = () => { timer.start(false); setPaused(true); setEditMode(false); }
    const pause = () => { timer.clear(); setPaused(false); }
    const reset = () => { timer.reset(); setProgress(timer.percentComplete); }
    const toggleEditMode = () => { pause(); reset(); setEditMode(!editMode); }

    const fastForward = () => { timer.finishRound(); setProgress(timer.percentComplete); }

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
            timer,
            title
        }}>
        {children}
    </CountdownContext.Provider>
}

export default CountdownProvider;