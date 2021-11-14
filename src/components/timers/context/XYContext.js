import React, { useEffect, useState } from 'react';
import { Timer } from '../../../classes/Timer';

export const XYContext = React.createContext({});

const timer = new Timer({
    seconds: 20,
});

const XYProvider = ({ children }) => {

    const [editMode, setEditMode] = useState(false);
    const [progress, setProgress] = useState(0);
    const [roundProgress, setRoundProgress] = useState(0);
    const [round, setRound] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        const setTimerState = (timer) => {
            setProgress(timer.percentComplete);
            setRoundProgress(timer.roundPercentComplete);
            setRound(timer.currentRound);
        };
        timer.pushIntervalFunction(setTimerState);
        timer.onFinished = () => { setPaused(false); };
        setTimerState(timer);
        return () => {
            timer.clear();
            timer.clean();
        }
    }, []);

    const start = () => { timer.start(false); setPaused(true); setEditMode(false); }
    const pause = () => { timer.clear(); setPaused(false); }
    const reset = () => { timer.reset(); setProgress(timer.percentComplete); }
    const toggleEditMode = () => { pause(); reset(); setEditMode(!editMode); }
    const fastForward = () => { timer.finishRound(); setProgress(timer.percentComplete); timer.start(false); }
    const updateRound = (value) => { timer.rounds = value; setRound(timer.currentRound); }
    const title = "XY";

    return <XYContext.Provider
        value={{
            paused,
            progress,
            toggleEditMode,
            editMode,
            start,
            pause,
            reset,
            fastForward,
            timer,
            title,
            round,
            updateRound,
            roundProgress
        }}>
        {children}
    </XYContext.Provider>
}

export default XYProvider;