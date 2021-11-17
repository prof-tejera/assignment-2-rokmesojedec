import { useContext } from "react";
import Panel from "./../generic/Panel/Panel";
import DisplayTime from "./../generic/DisplayTime/DisplayTime";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import StopwatchProvider, { StopwatchContext } from './context/StopwatchContext';
import { ButtonsPanel, CongratsPanel } from '../../utils/helpers';

const Stopwatch = () => {

  const { paused, progress, start, toggleEditMode, editMode, fastForward, runAgain, 
    pause, reset, timer, isDone } = useContext(StopwatchContext);

  return <Panel>
    <ProgressCircle progress={progress} thickness="sm" className="timer">
      <div>
        <DisplayTime timer={timer} readOnly={!editMode} className="panel-morph p-2"></DisplayTime>
      </div>
    </ProgressCircle>
    {!isDone && ButtonsPanel(paused, start, pause, reset, fastForward, toggleEditMode, editMode) }
    { CongratsPanel(isDone && !editMode, runAgain) } 
  </Panel>;
}
const StopwatchTimer = () => {
  return (<StopwatchProvider>
    <Stopwatch />
  </StopwatchProvider>)
};

export default StopwatchTimer;
