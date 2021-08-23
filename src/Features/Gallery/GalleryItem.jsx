import PropTypes from 'prop-types';
import { MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO } from './constants';
import Image from 'Components/Base/Image';
import VideoIframe from 'Components/VideoIframe';

const GalleryItem = ({ data, ...others }) => {
  const { src, type } = data;
  switch (type) {
    case MEDIA_TYPE_IMAGE:
      return <Image src={src} fit="cover" {...others} />
    case MEDIA_TYPE_VIDEO:
      return <VideoIframe src={src} {...others}></VideoIframe>
    default:
      return null;
  }
};

GalleryItem.propTypes = {
  data: PropTypes.shape({
    src: PropTypes.string.isRequired,
    type: PropTypes.oneOf([MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO]).isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default GalleryItem;