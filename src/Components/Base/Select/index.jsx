import classNames from 'classnames';
import PropTypes from 'prop-types';

const Select = ({ className = '', value, children, ...rest }) => {
  const classes = classNames({
    [className]: className
  });
  return <select value={value} className={classes} {...rest}>
    {children}
  </select>
};

Select.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any
};

export default Select;