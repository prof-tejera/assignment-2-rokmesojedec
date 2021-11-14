import { useContext } from "react";
import Panel from "./../generic/Panel/Panel";
import Button from "./../generic/Button/Button";
import DisplayTime from "./../generic/DisplayTime/DisplayTime";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import StopwatchProvider, { StopwatchContext } from './context/StopwatchContext';
import MatIcon from "../generic/MatIcon";
import { PlayPauseButton } from '../../utils/helpers';


const Stopwatch = () => {

  const { paused, progress, start,
    pause, reset, timer } = useContext(StopwatchContext);

  return <Panel>
    <ProgressCircle progress={progress} thickness="xl">
      <div>
        <DisplayTime className="m-t-3" timer={timer}></DisplayTime>
        <div className="ButtonsPanel">
          {PlayPauseButton(paused, start, pause)}
          <Button className="text-warning" onButtonClick={reset}>
            <MatIcon>restart_alt</MatIcon>
          </Button>
        </div>
      </div>
    </ProgressCircle>
  </Panel>;
}

export default () => {
  return (<StopwatchProvider>
    <Stopwatch />
  </StopwatchProvider>)
};
