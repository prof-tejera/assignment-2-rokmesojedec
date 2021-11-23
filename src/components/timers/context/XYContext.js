import React, { useEffect, useState } from 'react';
import { Timer } from '../../../classes/Timer';
import ReactTooltip from 'react-tooltip';

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
    const [isDone, setDone] = useState(false);

    useEffect(() => {
        const setTimerState = (timer) => {
            setProgress(timer.percentComplete);
            setRoundProgress(timer.roundPercentComplete);
            setRound(timer.currentRound);
        };
        timer.pushIntervalFunction(setTimerState);
        timer.onFinished = () => { setPaused(false); if (timer.isTimerComplete) setDone(true); };
        setTimerState(timer);

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

    const start = () => { timer.start(false); setPaused(true); setEditMode(false); setDone(false); }
    const pause = () => { timer.clear(); setPaused(false); }
    const reset = () => { timer.reset(); setProgress(timer.percentComplete); }
    const toggleEditMode = () => { pause(); reset(); setEditMode(!editMode); }
    const fastForward = () => { timer.finishRound(); setProgress(timer.percentComplete); timer.start(false); }
    const updateRound = (value) => { timer.rounds = value; setRound(timer.currentRound); }
    const runAgain = () => { reset(); setDone(false); }

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
            runAgain,
            roundProgress,
            isDone
        }}>
        {children}
    </XYContext.Provider>
}

export default XYProvider;