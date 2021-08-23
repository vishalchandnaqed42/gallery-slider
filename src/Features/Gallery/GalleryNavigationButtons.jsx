import PropTypes from 'prop-types';

import Button from "Components/Base/Button";

const GalleryNavigationButton = ({ onNext, onPrev }) => {
  return <>
    <Button onClick={onPrev} className="btn prev"></Button>
    <Button onClick={onNext} className="btn next"></Button>
  </>
};

GalleryNavigationButton.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default GalleryNavigationButton;