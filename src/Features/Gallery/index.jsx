import { useState } from 'react';

import Container from 'Components/Base/Container';
import { MEDIA_FILES } from 'Services/Constants';
import Gallery from './Gallery';

const GalleryWrapper = (props) => {
  const [visibleItems, setVisibleItems] = useState(1);

  const onChangeVisibleItems = (e) => {
    setVisibleItems(parseInt(e.target.value));
  }

  return <>
    <Container className="align-center">
      <select value={visibleItems} onChange={onChangeVisibleItems}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
    </Container>
    <Container className="align-center">
      <Gallery
        data={MEDIA_FILES}
        visibleItems={visibleItems}
        auto={false}
      />
    </Container>

  </>
}

export default GalleryWrapper;