const MatIcon = (props) => {
  const { children } = props;
  return  <span className="material-icons size-48"> {children}</span>;
}
export default MatIcon;

MatIcon.propTypes = {} 
MatIcon.defaultProps = {}