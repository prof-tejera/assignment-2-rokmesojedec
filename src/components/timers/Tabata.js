import { useEffect, useState } from "react";
import Panel from "./../generic/Panel/Panel";
import Button from "./../generic/Button/Button";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import { Timer } from '../../classes/Timer';
import { Interval } from '../../classes/Interval';
import TimeComponent from "../generic/TimeComponent/TimeComponent";
import MatIcon from "../generic/MatIcon";
import "./Tabata.scss";

const IntervalXY = new Interval({ timers: [
                                  new Timer({seconds: 5}), 
                                  new Timer({seconds: 5})], 
                                  rounds: 3 
                                });                   
const [timerA, timerB] = IntervalXY.timers;

const Tabata = (props) => {

  const [secondsTimerA, setSecondsTimerA] = useState(0);
  const [secondsTimerB, setSecondsTimerB] = useState(0);
  const [progressTimerA, setProgressTimerA] = useState(0);
  const [progressTimerB, setProgressTimerB] = useState(0);
  const [progressRound, setRoundProgress] = useState(0);
  const [currentRound, setRound] = useState(0);
  const [currentProgress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateInterval = () => {
    setRoundProgress(IntervalXY.roundPercentage);
    setRound(IntervalXY.currentRound);
    setProgress(IntervalXY.percentComplete);
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

    IntervalXY.onFinished = () => { setPaused(false); setRound(IntervalXY.currentRound); };
    updateInterval();

    setProgressTimerA(timerA.percentComplete);
    setSecondsTimerA(timerA.currentSeconds);
    setProgressTimerB(timerB.percentComplete);
    setSecondsTimerB(timerB.currentSeconds);
    return () => {
      IntervalXY.pause();  
    }
  }, []);

  const start = () => { IntervalXY.start(false); setPaused(true) }
  const pause = () => { IntervalXY.pause(); setPaused(false) }
  const reset = () => { }
  const fastForward = () => { }
  const { title } = props;

  return <Panel>
    <ProgressCircle progress={currentProgress}>
      <div className="tabata">
        <div className="text-center m-0">
          <h5 className="text-center weight-100 gradient-code-secondary-clip ">{title}</h5>
        </div>
        <div className="tabata-progress-panel m-t-3">
          <ProgressCircle progress={progressRound} size="xs" thickness="xs" className="embedded">
            <TimeComponent label="round" prependZero={true} value={currentRound} readOnly={true} ></TimeComponent>
          </ProgressCircle>
          <ProgressCircle progress={progressTimerA} size="xs" thickness="xs" className="embedded">
            <TimeComponent label="work (s)" prependZero={true} value={secondsTimerA} readOnly={true}></TimeComponent>
          </ProgressCircle>
          <ProgressCircle progress={progressTimerB} size="xs" thickness="xs" className="embedded">
            <TimeComponent label="rest (s)" prependZero={true} value={secondsTimerB} readOnly={true} ></TimeComponent>
          </ProgressCircle>
        </div>
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

export default Tabata;
