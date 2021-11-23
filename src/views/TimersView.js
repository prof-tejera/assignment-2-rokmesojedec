import TimersViewProvider, { TimersViewContext } from './context/TimersViewContext';
import { useContext } from "react";
import Button from '../components/generic/Button/Button';
import "./TimersView.scss";

const App = () => {
  const { timers, timerIndex, setTimerIndex } = useContext(TimersViewContext);
  const currentTimer = () => {
    return timers.filter((timers, index) => index === timerIndex)[0].C;
  }
  return (
    <div className="grid typescale-md-major-third grid-col-span-12">
      <div className="col-span-12 buttons m-t-4">
        {timers.map((timer, index) => (
          <Button onButtonClick={() => { setTimerIndex(index) }}
            className={["weight-500 p-x-3 p-y-1 bold",
              index === timerIndex ? "selected text-dark" : ""].join(" ")}
            key={index}
          >{timer.title}</Button>
        ))}
      </div>
      { currentTimer() }
    </div>
  );
}

const AppProvider = () => {
  return (<TimersViewProvider>
    <App />
  </TimersViewProvider>)
};

export default AppProvider;
