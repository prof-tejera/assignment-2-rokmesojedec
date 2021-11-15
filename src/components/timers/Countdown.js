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
        <DisplayTime timer={timer} readOnly={!editMode} className="panel-morph p-2"></DisplayTime>
      </div>
    </ProgressCircle>
    <div className="buttons-panel">
      {PlayPauseButton(paused, start, pause)}
      <Button onButtonClick={reset}>
        <MatIcon>restart_alt</MatIcon>
      </Button>
      <Button onButtonClick={fastForward}>
        <MatIcon>fast_forward</MatIcon>
      </Button>
      <Button onButtonClick={toggleEditMode}>
        <MatIcon>{editMode ? "edit_off" : "edit"}</MatIcon>
      </Button>
    </div>
  </Panel>;
}

const CountdownTimer = () => {
  return (<CountdownProvider>
    <Countdown />
  </CountdownProvider>)
};

export default CountdownTimer;
