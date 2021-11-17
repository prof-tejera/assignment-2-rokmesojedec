import { useContext } from "react";
import Panel from "./../generic/Panel/Panel";
import ProgressCircle from "./../generic/ProgressCircle/ProgressCircle";
import TimeComponent from "../generic/TimeComponent/TimeComponent";
import TabataProvider, { TabataContext } from './context/TabataContext';
import { ButtonsPanel, CongratsPanel } from '../../utils/helpers';
import DisplayTime from "../generic/DisplayTime/DisplayTime";
import "./Tabata.scss";

const Tabata = () => {

  const { paused, start, pause, reset, fastForward, editMode, toggleEditMode,
    currentProgress, currentRound, progressRound, progressTimerB, updateRound,
    progressTimerA, timerA, timerB, isDone, runAgain } = useContext(TabataContext);

  const showComponents = {
    hours: false,
    minutes: true,
    seconds: true,
    milliseconds: false
  }

  return <Panel>
    <ProgressCircle progress={currentProgress} size="xl" thickness="sm" className="timer">
      <div className="tabata">
        <div>
          <ProgressCircle progress={progressRound} size="sm" thickness="sm" className="tiny-timer">
            <TimeComponent label="round"
              prependZero={true}
              value={currentRound}
              readOnly={!editMode}
              onValueChange={e => { updateRound(e); }}></TimeComponent>
          </ProgressCircle>
        </div>
        <div className="tabata-progress-panel">
          <ProgressCircle progress={progressTimerA} size="sm" thickness="sm" className="tiny-timer">
            <div className="tabata-progress-wrapper">
              <span className="tabata-label">work</span>
              <DisplayTime timer={timerA} className="small p-t-0" readOnly={!editMode} showComponents={showComponents}
                triggerOnFinishedOnUnmount={false}
              ></DisplayTime>
            </div>
          </ProgressCircle>
          <ProgressCircle progress={progressTimerB} size="sm" thickness="sm" className="tiny-timer">
            <div className="tabata-progress-wrapper">
              <span className="tabata-label">rest</span>
              <DisplayTime timer={timerB} className="small p-t-0" readOnly={!editMode}
                showComponents={showComponents}
                triggerOnFinishedOnUnmount={false}
              ></DisplayTime>
            </div>
          </ProgressCircle>
        </div>
      </div>
    </ProgressCircle>
    {!isDone && ButtonsPanel(paused, start, pause, reset, fastForward, toggleEditMode, editMode)}

    {CongratsPanel(isDone, runAgain)}
  </Panel>;
}

const TabataTimer = () => {
  return (<TabataProvider>
    <Tabata />
  </TabataProvider>)
};

export default TabataTimer; 