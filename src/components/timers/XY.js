import { useContext } from "react";
import Panel from "./../generic/Panel/Panel";
import Button from "./../generic/Button/Button";
import DisplayTime from "./../generic/DisplayTime/DisplayTime";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import TimeComponent from "../generic/TimeComponent/TimeComponent";
import MatIcon from "../generic/MatIcon";
import { PlayPauseButton } from '../../utils/helpers';
import XYProvider, { XYContext } from './context/XYContext';

const XY = () => {

  const { paused, progress, start, pause, editMode, toggleEditMode, updateRound,
    reset, fastForward, timer, round, roundProgress } = useContext(XYContext);

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
    <div className="buttons-panel">
          {PlayPauseButton(paused, start, pause)}
          <Button  onButtonClick={reset}>
            <MatIcon>restart_alt</MatIcon>
          </Button>
          <Button  onButtonClick={fastForward}>
            <MatIcon>fast_forward</MatIcon>
          </Button>
          <Button  onButtonClick={toggleEditMode}>
            <MatIcon>{editMode ? "edit_off" : "edit"}</MatIcon>
          </Button>
        </div>
  </Panel>;
}
const XYTimer =() => {
  return (<XYProvider>
    <XY />
  </XYProvider>)
};

export default XYTimer;
