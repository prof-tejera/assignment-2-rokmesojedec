import React, { useEffect, useState } from 'react';
import { Timer } from '../../../classes/Timer';
import { Interval } from '../../../classes/Interval';
import ReactTooltip from 'react-tooltip';

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
    const [isDone, setDone] = useState(false);

    const updateInterval = () => {
        setRoundProgress(IntervalTabata.roundPercentage);
        setRound(IntervalTabata.currentRound);
        setProgress(IntervalTabata.percentComplete);
    }

    useEffect(() => {
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
            setDone(true);
        };
        
        updateInterval();
        setProgressTimerA(timerA.percentComplete);
        setSecondsTimerA(timerA.currentSeconds);
        setProgressTimerB(timerB.percentComplete);
        setSecondsTimerB(timerB.currentSeconds);


        // Needed to keep tooltips after component mount/unmount
        ReactTooltip.rebuild();

        return () => {
            // stop and remove intervals on unmount
            IntervalTabata.clear(false);
            IntervalTabata.clean();
        }
    }, []);

    useEffect(()=>{
        // Needed to keep tooltips after component mount/unmount
        ReactTooltip.rebuild();
    },[isDone])

    const start = () => { IntervalTabata.start(false); setPaused(true); setEditMode(false); setDone(false); };
    const pause = () => { IntervalTabata.clear(false); setPaused(false); };
    const reset = () => { pause(); IntervalTabata.reset(); updateInterval(); };
    const fastForward = () => { IntervalTabata.finishCurrent(); if(!paused) pause(); }
    const toggleEditMode = () => { pause(); IntervalTabata.reset(); setEditMode(!editMode); };
    const updateRound = (value) => { IntervalTabata.rounds = value; updateInterval(); }
    const runAgain = () => { reset(); setDone(false); }

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
            runAgain,
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
            timerB,
            isDone
        }}>
        {children}
    </TabataContext.Provider>
}

export default TabataProvider;