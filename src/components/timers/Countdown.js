import { useContext } from 'react';
import Panel from "./../generic/Panel/Panel";
import Button from "./../generic/Button/Button";
import DisplayTime from "./../generic/DisplayTime/DisplayTime";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import MatIcon from '../generic/MatIcon';
import CountdownProvider, { CountdownContext } from './context/CountdownContext';
import { PlayPauseButton } from '../../utils/helpers';

const Countdown = () => {

  const { paused, progress, start, editMode, toggleEditMode,
    pause, reset, fastForward, timer } = useContext(CountdownContext);

  return <Panel>
    <ProgressCircle progress={progress} thickness="sm" size="lg" className="timer">
      <div>
        <DisplayTime timer={timer} readOnly={!editMode}></DisplayTime>
      </div>
    </ProgressCircle>
    <div className="buttons-panel">
      {PlayPauseButton(paused, start, pause)}
      <Button className="text-dark" onButtonClick={reset}>
        <MatIcon>restart_alt</MatIcon>
      </Button>
      <Button className="text-dark" onButtonClick={fastForward}>
        <MatIcon>fast_forward</MatIcon>
      </Button>
      <Button className="text-dark" onButtonClick={toggleEditMode}>
        <MatIcon>{editMode ? "check" : "timer"}</MatIcon>
      </Button>
    </div>
  </Panel>;
}

export default () => {
  return (<CountdownProvider>
    <Countdown />
  </CountdownProvider>)
};
