import { useState, useEffect } from "react";
import Panel from "./../generic/Panel/Panel";
import Button from "./../generic/Button/Button";
import DisplayTime from "./../generic/DisplayTime/DisplayTime";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import { Timer } from '../../classes/Timer';
import MatIcon
 from "../generic/MatIcon";
const timer = new Timer({
  tickSize: Timer.TIME_ENUM.MILLISECOND * 52,
  countdownMode: false,
  stopWatchMode: true,
});

const Stopwatch = (props) => {

  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    timer.pushIntervalFunction((timer) => { setProgress(timer.minutePercentComplete); })
    timer.onCompleted = () => { setPaused(false); };
    setProgress(timer.minutePercentComplete);
    return () => {
      timer.clear();
      timer.clean();
    }
  }, []);

  const start = () => { timer.start(false); setPaused(true); }
  const pause = () => { timer.clear(); setPaused(false); }
  const reset = () => { timer.reset(); setProgress(timer.minutePercentComplete); }
  const fastForward = () => { timer.finishRound(); setProgress(timer.minutePercentComplete); }

  const { title } = props;

  return <Panel>
    <ProgressCircle progress={progress} >
      <div>
        {/* <div className="text-center m-0">
          <h5 className="text-center weight-100 gradient-code-secondary-clip ">{title}</h5>
        </div> */}
        <DisplayTime className="m-t-3" timer={timer}></DisplayTime>
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
          {/* <Button className="text-secondary" onButtonClick={fastForward}>
            <MatIcon>fast_forward</MatIcon>
          </Button> */}
        </div>
      </div>
    </ProgressCircle>
  </Panel>;
}

export default Stopwatch;
