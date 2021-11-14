// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

import MatIcon from "./../components/generic/MatIcon";
import Button from "./../components/generic/Button/Button";

export const PlayPauseButton = (paused, start, pause) => {
    if (!paused) {
        return <Button className="text-primary" onButtonClick={start}>
            <MatIcon>play_arrow</MatIcon>
        </Button>;
    }
    return <Button className="text-danger" onButtonClick={pause}>
        <MatIcon>pause</MatIcon>
    </Button>
}