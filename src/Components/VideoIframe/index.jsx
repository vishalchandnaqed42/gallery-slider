import classNames from "classnames";
import PropTypes from 'prop-types';

import Iframe from "Components/Base/Iframe";

const VideoIframe = ({ className = '', src, ...rest }) => {
  const classes = classNames({
    className: className
  });
  return <Iframe className={classes} src={src} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} {...rest}></Iframe>
};

VideoIframe.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default VideoIframe;