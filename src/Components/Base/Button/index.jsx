import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ className = '', children, ...rest }) => {
  const classes = classNames({
    [className]: className
  });
  return <button className={classes} {...rest}>
    {children}
  </button>
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;