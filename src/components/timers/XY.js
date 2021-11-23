import { useContext } from "react";
import Panel from "./../generic/Panel/Panel";
import DisplayTime from "./../generic/DisplayTime/DisplayTime";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import TimeComponent from "../generic/TimeComponent/TimeComponent";
import { ButtonsPanel, CongratsPanel } from '../../utils/helpers';
import XYProvider, { XYContext } from './context/XYContext';

const XY = () => {

  const { paused, progress, start, pause, editMode, toggleEditMode, updateRound, runAgain, 
    reset, fastForward, timer, round, roundProgress, isDone } = useContext(XYContext);

  return <Panel>
    <ProgressCircle progress={progress} className="timer" size="xl" thickness="sm">
      <div>
        <ProgressCircle progress={roundProgress} className="tiny-timer" size="sm" thickness="sm">
          <TimeComponent value={round} label="round" readOnly={!editMode}
            onValueChange={(e) => { updateRound(e); }}
          ></TimeComponent>
        </ProgressCircle>
        <DisplayTime className="m-t-1" timer={timer} readOnly={!editMode}></DisplayTime>

      </div>
    </ProgressCircle>
    {!isDone && ButtonsPanel(paused, start, pause, reset, fastForward, toggleEditMode, editMode)}

    { CongratsPanel(isDone, runAgain) }
  </Panel>;
}
const XYTimer = () => {
  return (<XYProvider>
    <XY />
  </XYProvider>)
};

export default XYTimer;
