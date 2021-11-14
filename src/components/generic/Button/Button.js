import './Button.scss';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { disabled, onButtonClick, children, tooltip, className } = props;
  return <button
    data-tooltip-bottom={tooltip}
    className={['btn RoundButton flat', className].join(" ")}
    disabled={disabled}
    onClick={e => onButtonClick(e.target.value)}>
    {children}
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
  children: "Button",
  disabled: false,
  className: "primary",
  tooltip: null,
  onButtonClick: () => { }
}