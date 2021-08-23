import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.css';

const Image = ({ fit = 'cover', alt, src, className = '', ...rest }) => {
  const classes = classNames({
    fit: fit,
    [className]: className
  });
  return <img alt={alt} src={src} className={classes} {...rest}>
  </img>
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  fit: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Image;