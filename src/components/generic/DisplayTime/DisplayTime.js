import { useState, useEffect } from 'react';
import { Timer } from '../../../classes/Timer';
import './DisplayTime.scss';
import TimeComponent from '../TimeComponent/TimeComponent';
import PropTypes from 'prop-types';

const DisplayTime = (props) => {
  
  const [timeComponents, setTimeComponents] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  const timerTick = (timer) => {
    setTimeComponents({
      hours: timer.currentHours,
      minutes: timer.currentMinutes,
      seconds: timer.currentSeconds,
      milliseconds: timer.currentMilliseconds,
    });
  };

  useEffect(() => {
    if (props.timer) {
      props.timer.pushIntervalFunction(timerTick);
      timerTick(props.timer);
    }
    return () => {
      props.timer.clear();
      props.timer.clean();
    };
  }, [props.timer]);

  const { className, readOnly } = props;

  // Timer class also support Years, Months, Days but these time units aren't appropriate for timer use
  const components = [
    { label: "h", prependZero: true, name: "hours" },
    { label: "m", prependZero: true, name: "minutes" },
    { label: "s", prependZero: true, name: "seconds" },
    { label: "ms", prependZero: false, name: "milliseconds" }
  ]

  return <div className={['time-components', className].join(" ")}>
    {components.map((component, i) =>
      <TimeComponent value={timeComponents[component.name]}
        key={component.label}
        label={component.label}
        prependZero={component.prependZero}
        readOnly={readOnly}
        showColon={i !== 0}></TimeComponent>)}
  </div>;
}

DisplayTime.propTypes = {
  timer: PropTypes.instanceOf(Timer),
  className: PropTypes.string,
  readOnly: PropTypes.bool
}

DisplayTime.defaultProps = {
  timer: new Timer(0),
  className: null,
  readOnly: true
}

export default DisplayTime;