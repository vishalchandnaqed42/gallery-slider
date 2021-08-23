import classNames from 'classnames';
import PropTypes from 'prop-types';

const Iframe = ({ className = '', title, src, ...rest }) => {
  const classes = classNames({
    [className]: className
  });
  return <iframe className={classes} src={src} title={title} {...rest}>
  </iframe>
};

Iframe.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Iframe;