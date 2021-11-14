import React, { useEffect, useState } from 'react';
import { Timer } from '../../../classes/Timer';

export const XYContext = React.createContext({});

const timer = new Timer({
    seconds: 20,
});

const XYProvider = ({ children }) => {

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

    const start = () => { timer.start(false); setPaused(true); }
    const pause = () => { timer.clear(); setPaused(false); }
    const reset = () => { timer.reset(); setProgress(timer.percentComplete); }
    const fastForward = () => { timer.finishRound(); setProgress(timer.percentComplete); }
    const title = "XY";

    return <XYContext.Provider
        value={{
            paused,
            progress,
            start,
            pause,
            reset,
            fastForward,
            timer,
            title,
            round,
            roundProgress
        }}>
        {children}
    </XYContext.Provider>
}

export default XYProvider;