import { useContext } from 'react';
import Panel from "./../generic/Panel/Panel";
import Button from "./../generic/Button/Button";
import DisplayTime from "./../generic/DisplayTime/DisplayTime";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import MatIcon from '../generic/MatIcon';
import CountdownProvider, { CountdownContext } from './context/CountdownContext';
import { PlayPauseButton } from '../../utils/helpers';

const Countdown = () => {

  const { paused, progress, start,
    pause, reset, fastForward, timer } = useContext(CountdownContext);

  return <Panel>
    <ProgressCircle progress={progress} thickness="xl">
      <div>
        <DisplayTime className="m-t-3" timer={timer}></DisplayTime>
        <div className="ButtonsPanel">
          {PlayPauseButton(paused, start, pause)}
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

export default () => {
  return (<CountdownProvider>
    <Countdown />
  </CountdownProvider>)
};
