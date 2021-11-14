import { useContext } from "react";
import Panel from "./../generic/Panel/Panel";
import Button from "./../generic/Button/Button";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import TimeComponent from "../generic/TimeComponent/TimeComponent";
import MatIcon from "../generic/MatIcon";
import "./Tabata.scss";
import TabataProvider, { TabataContext } from './context/TabataContext';
import { PlayPauseButton } from '../../utils/helpers';

const Tabata = () => {

  const { paused, start, pause, reset, fastForward, title,
    currentProgress, currentRound, progressRound, progressTimerB,
    progressTimerA, secondsTimerB, secondsTimerA } = useContext(TabataContext);

  return <Panel>
    <ProgressCircle progress={currentProgress}>
      <div className="tabata">
        <div className="text-center m-0">
          <h5 className="text-center weight-100 gradient-code-secondary-clip ">{title}</h5>
        </div>
        <div className="tabata-progress-panel m-t-3">
          <ProgressCircle progress={progressRound} size="xs" thickness="xs" className="embedded">
            <TimeComponent label="round" prependZero={true} value={currentRound} readOnly={true} ></TimeComponent>
          </ProgressCircle>
          <ProgressCircle progress={progressTimerA} size="xs" thickness="xs" className="embedded">
            <TimeComponent label="work (s)" prependZero={true} value={secondsTimerA} readOnly={true}></TimeComponent>
          </ProgressCircle>
          <ProgressCircle progress={progressTimerB} size="xs" thickness="xs" className="embedded">
            <TimeComponent label="rest (s)" prependZero={true} value={secondsTimerB} readOnly={true} ></TimeComponent>
          </ProgressCircle>
        </div>
        <div className="ButtonsPanel">
        { PlayPauseButton(paused, start, pause) }          
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
  return (<TabataProvider>
    <Tabata />
  </TabataProvider>)
};
