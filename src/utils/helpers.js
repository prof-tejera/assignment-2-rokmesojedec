// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

import MatIcon from "./../components/generic/MatIcon";
import Button from "./../components/generic/Button/Button";
import { useEffect, useRef, useState } from 'react';

export const PlayPauseButton = (paused, start, pause) => {
    if (!paused) {
        return <Button onButtonClick={start} tooltip="Play">
            <MatIcon>play_arrow</MatIcon>
        </Button>;
    }
    return <Button onButtonClick={pause} tooltip="Pause">
        <MatIcon>pause</MatIcon>
    </Button>
}


export const usePrevious = value => {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

export const usePersistedState = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Read initial value from local storage or fallback to the given initial value
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
};