import { useState, useEffect } from "react";
import Panel from "./../generic/Panel/Panel";
import Button from "./../generic/Button/Button";
import DisplayTime from "./../generic/DisplayTime/DisplayTime";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import { Timer } from '../../classes/Timer';
import { Interval } from "../../classes/Interval";

import TimeComponent from "../generic/TimeComponent/TimeComponent";
import MatIcon from "../generic/MatIcon";

const timer = new Timer({
  seconds: 20,
});


const XY = (props) => {

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

  const { title } = props;
  return <Panel>
    <ProgressCircle progress={progress} >
      <div>
        {/* <div className="text-center m-x-0 m-t-0 m-b-1">
          <h5 className="text-center weight-100 gradient-code-secondary-clip m-b-2">{title}</h5>
        </div> */}
        <ProgressCircle progress={roundProgress} className="embedded" size="sm" thickness="sm">
          <TimeComponent value={round} label="round" readOnly={true} ></TimeComponent>
        </ProgressCircle>
        <DisplayTime className="m-t-1" timer={timer}></DisplayTime>
        <div className="ButtonsPanel">
          {!paused &&
            <Button className="text-primary" onButtonClick={start}>
              <MatIcon>play_arrow</MatIcon>
            </Button>
          }
          {paused &&
            <Button className="text-danger" onButtonClick={pause}>
              <MatIcon>pause</MatIcon>
            </Button>
          }
          <Button className="text-warning" onButtonClick={reset}>
            <MatIcon>restart_alt</MatIcon>
          </Button>
          <Button className="text-secondary" onButtonClick={fastForward}>
            <MatIcon>fast_forward</MatIcon>
          </Button>
        </div>
      </div>
    </ProgressCircle>
  </Panel>;
}

export default XY;
