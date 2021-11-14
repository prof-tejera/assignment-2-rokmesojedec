import { useContext } from "react";
import Panel from "./../generic/Panel/Panel";
import Button from "./../generic/Button/Button";
import DisplayTime from "./../generic/DisplayTime/DisplayTime";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import { Timer } from '../../classes/Timer';
import TimeComponent from "../generic/TimeComponent/TimeComponent";
import MatIcon from "../generic/MatIcon";
import { PlayPauseButton } from '../../utils/helpers';
import XYProvider, { XYContext } from './context/XYContext';

const timer = new Timer({
  seconds: 20,
});

const XY = () => {

  const { paused, progress, start, pause,
    reset, fastForward, timer, round, roundProgress } = useContext(XYContext);

  return <Panel>
    <ProgressCircle progress={progress} >
      <div>
        <ProgressCircle progress={roundProgress} className="embedded" size="sm" thickness="sm">
          <TimeComponent value={round} label="round" readOnly={true} ></TimeComponent>
        </ProgressCircle>
        <DisplayTime className="m-t-1" timer={timer}></DisplayTime>
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
  return (<XYProvider>
    <XY />
  </XYProvider>)
};
