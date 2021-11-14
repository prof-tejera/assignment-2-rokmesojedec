import React, { useEffect, useState } from 'react';
import { Timer } from '../../../classes/Timer';
import { Interval } from '../../../classes/Interval';

export const TabataContext = React.createContext({});

const IntervalTabata = new Interval({
    timers: [
        new Timer({ seconds: 5 }),
        new Timer({ seconds: 5 })],
    rounds: 3
});
const [timerA, timerB] = IntervalTabata.timers;

const TabataProvider = ({ children }) => {

    const [secondsTimerA, setSecondsTimerA] = useState(0);
    const [secondsTimerB, setSecondsTimerB] = useState(0);
    const [progressTimerA, setProgressTimerA] = useState(0);
    const [progressTimerB, setProgressTimerB] = useState(0);
    const [progressRound, setRoundProgress] = useState(0);
    const [currentRound, setRound] = useState(0);
    const [currentProgress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);

    const updateInterval = () => {
        setRoundProgress(IntervalTabata.roundPercentage);
        setRound(IntervalTabata.currentRound);
        setProgress(IntervalTabata.percentComplete);
    }

    useEffect(() => {

        timerA.pushIntervalFunction((timer) => {
            setProgressTimerA(timer.percentComplete);
            setSecondsTimerA(timer.currentSeconds);
            updateInterval();
        })

        timerB.pushIntervalFunction((timer) => {
            setProgressTimerB(timer.percentComplete);
            setSecondsTimerB(timer.currentSeconds);
            updateInterval();
        });

        IntervalTabata.onFinished = () => { setPaused(false); setRound(IntervalTabata.currentRound); };
        updateInterval();

        setProgressTimerA(timerA.percentComplete);
        setSecondsTimerA(timerA.currentSeconds);
        setProgressTimerB(timerB.percentComplete);
        setSecondsTimerB(timerB.currentSeconds);
        return () => {
            IntervalTabata.pause();
        }
    }, []);

    const start = () => { IntervalTabata.start(false); setPaused(true) }
    const pause = () => { IntervalTabata.pause(); setPaused(false) }
    const reset = () => { }
    const fastForward = () => { }

    const title = "Tabata";

    return <TabataContext.Provider
        value={{
            paused,
            start,
            pause,
            reset,
            fastForward,
            IntervalTabata,
            title,
            currentProgress,
            currentRound,
            progressRound,
            progressTimerB,
            progressTimerA,
            secondsTimerB,
            secondsTimerA
        }}>
        {children}
    </TabataContext.Provider>
}

export default TabataProvider;