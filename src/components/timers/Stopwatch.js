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
        <DisplayTime timer={timer} readOnly={!editMode} className="panel-morph p-2"></DisplayTime>
      </div>
    </ProgressCircle>
    <div className="buttons-panel">
      {PlayPauseButton(paused, start, pause)}
      <Button className="" onButtonClick={reset}>
        <MatIcon>restart_alt</MatIcon>
      </Button>
      <Button className="" onButtonClick={toggleEditMode}>
        <MatIcon>{editMode ? "edit_off" : "edit"}</MatIcon>
      </Button>
    </div>
  </Panel>;
}
const StopwatchTimer = () => {
  return (<StopwatchProvider>
    <Stopwatch />
  </StopwatchProvider>)
};

export default StopwatchTimer;
