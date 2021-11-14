import { useContext } from "react";
import Panel from "./../generic/Panel/Panel";
import Button from "./../generic/Button/Button";
import DisplayTime from "./../generic/DisplayTime/DisplayTime";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import StopwatchProvider, { StopwatchContext } from './context/StopwatchContext';
import MatIcon from "../generic/MatIcon";
import { PlayPauseButton } from '../../utils/helpers';

const Stopwatch = () => {

  const { paused, progress, start, toggleEditMode, editMode,
    pause, reset, timer } = useContext(StopwatchContext);

  return <Panel>
    <ProgressCircle progress={progress} thickness="sm" className="timer">
      <div>
        <DisplayTime timer={timer} readOnly={!editMode}></DisplayTime>
      </div>
    </ProgressCircle>
    <div className="buttons-panel">
      {PlayPauseButton(paused, start, pause)}
      <Button className="text-dark" onButtonClick={reset}>
        <MatIcon>restart_alt</MatIcon>
      </Button>
      <Button className="text-dark" onButtonClick={toggleEditMode}>
        <MatIcon>{editMode ? "check" : "timer"}</MatIcon>
      </Button>
    </div>
  </Panel>;
}

export default () => {
  return (<StopwatchProvider>
    <Stopwatch />
  </StopwatchProvider>)
};
