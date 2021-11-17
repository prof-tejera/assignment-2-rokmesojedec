import { useContext } from 'react';
import Panel from "./../generic/Panel/Panel";
import DisplayTime from "./../generic/DisplayTime/DisplayTime";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import CountdownProvider, { CountdownContext } from './context/CountdownContext';
import { CongratsPanel, ButtonsPanel } from '../../utils/helpers';

const Countdown = () => {

  const { paused, progress, start, editMode, toggleEditMode, isDone, runAgain,
    pause, reset, fastForward, timer } = useContext(CountdownContext);

  return <Panel>
    <ProgressCircle progress={progress} thickness="sm" size="lg" className="timer" >
      <div><DisplayTime timer={timer}
        readOnly={!editMode} className="panel-morph p-2"></DisplayTime></div>
    </ProgressCircle>
    {!isDone && ButtonsPanel(paused, start, pause, reset, fastForward, toggleEditMode, editMode)}
    {CongratsPanel(isDone, runAgain)}
  </Panel>;
}

const CountdownTimer = () => {
  return (<CountdownProvider>
    <Countdown />
  </CountdownProvider>)
};

export default CountdownTimer;
