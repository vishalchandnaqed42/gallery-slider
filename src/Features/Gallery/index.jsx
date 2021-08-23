import { useState } from 'react';

import Container from 'Components/Base/Container';
import { MEDIA_FILES } from 'Services/Constants';
import Gallery from './Gallery';
import Select from 'Components/Base/Select';

const GalleryWrapper = (props) => {
  const [visibleItems, setVisibleItems] = useState(1);

  const onChangeVisibleItems = (e) => {
    setVisibleItems(parseInt(e.target.value));
  }

  return <>
    <Container className="align-center">
      <Select value={visibleItems} onChange={onChangeVisibleItems}>
        {[1, 2, 3, 4].map(item => {
          return <option value={item}>{item}</option>
        })}
      </Select>
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