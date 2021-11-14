import TimersViewProvider, { TimersViewContext } from './context/TimersViewContext';
import { useContext } from "react";

const App = () => {
  const { timers } = useContext(TimersViewContext);
  return (
    
    <div className="grid typescale-md-major-third grid-col-span-12 children-slide-down">
      <div class="col-span-12"></div>
      {timers.map((timer, index) => (
        <div className="col-lg-span-6 " key={index}>
          <div className="m-t-2 m-x-0 p-0">
            {timer.C}
          </div>
        </div>
      ))}
    </div>
  );
}

export default () => {
  return (<TimersViewProvider>
    <App />
  </TimersViewProvider>)
};
