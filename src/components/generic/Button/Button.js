import './Button.scss';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { disabled, onButtonClick, children, tooltip, className } = props;
  return <button
    data-tooltip-bottom={tooltip}
    className={['btn bold flat RoundButton', className].join(" ")}
    disabled={disabled}
    onClick={onButtonClick}>
    {children ? children : "Button"}
  </button>;
}

export default Button;

Button.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  onClick: PropTypes.func
}

Button.defaultProps = {
  disabled: false,
  className: "primary bold raised",
  tooltip: null,
  onButtonClick: () => { console.log("button clicked!"); }
}