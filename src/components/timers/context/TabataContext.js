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
    const [editMode, setEditMode] = useState(false);

    const updateInterval = () => {
        setRoundProgress(IntervalTabata.roundPercentage);
        setRound(IntervalTabata.currentRound);
        setProgress(IntervalTabata.percentComplete);
    }

    useEffect(() => {
        console.log("interval on mount");
        // push interval functions for workout timer
        timerA.pushIntervalFunction((timer) => {
            setProgressTimerA(timer.percentComplete);
            setSecondsTimerA(timer.currentSeconds);
            updateInterval();
        })

        // push interval functions for rest timer
        timerB.pushIntervalFunction((timer) => {
            setProgressTimerB(timer.percentComplete);
            setSecondsTimerB(timer.currentSeconds);
            updateInterval();
        });

        // set Pause state when interval object is done
        IntervalTabata.onFinished = () => { 
            setPaused(false); setRound(IntervalTabata.currentRound); 
        };
        
        updateInterval();
        setProgressTimerA(timerA.percentComplete);
        setSecondsTimerA(timerA.currentSeconds);
        setProgressTimerB(timerB.percentComplete);
        setSecondsTimerB(timerB.currentSeconds);
        return () => {
            IntervalTabata.clear(false);
            IntervalTabata.clean();
        }
    }, []);

    const start = () => { IntervalTabata.start(false); setPaused(true); setEditMode(false); };
    const pause = () => { IntervalTabata.clear(false); setPaused(false); };
    const reset = () => { pause(); IntervalTabata.reset(); updateInterval(); };
    const fastForward = () => { IntervalTabata.finishCurrent(); if(!paused) pause(); }
    const toggleEditMode = () => { pause(); IntervalTabata.reset(); setEditMode(!editMode); };
    const updateRound = (value) => { IntervalTabata.rounds = value; updateInterval(); }

    const title = "Tabata";

    return <TabataContext.Provider
        value={{
            paused,
            start,
            pause,
            reset,
            fastForward,
            toggleEditMode,
            updateRound,
            editMode,
            IntervalTabata,
            title,
            currentProgress,
            currentRound,
            progressRound,
            progressTimerB,
            progressTimerA,
            secondsTimerB,
            secondsTimerA,
            timerA,
            timerB
        }}>
        {children}
    </TabataContext.Provider>
}

export default TabataProvider;