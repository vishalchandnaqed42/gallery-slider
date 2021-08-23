import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Container from 'Components/Base/Container';
import scrollTo from 'Services/Helpers/scroll';
import GalleryItem from './GalleryItem';
import GalleryNavigationButton from './GalleryNavigationButtons';
import { deriveCSSNumber, mobileMatchMedia } from 'Services/Helpers/styles';
import { NAVIGATION_ERROR, NO_DATA } from './constants';
import './style.css';


const Gallery = ({ data = [], maxWidth = 800, maxHeight = 400, visibleItems = 1, spacing = 10, auto = false, autoInterval = 5000, }) => {
  const galleryRef = useRef(null);
  const [width, setWidth] = useState(maxWidth);
  const [error, setError] = useState(null);
  const [slideStartIndex, setSlideStartIndex] = useState(0);

  const styles = {
    gallery: {
      // In case of mobile, limit the height to 30%
      maxWidth, maxHeight: mobileMatchMedia.matches ? '30%' : maxHeight,
    },
    galleryItem: {
      // deriveCSSNumber, a small utility, to convert it into CSS format wrt its value.
      minWidth: `calc(${deriveCSSNumber(width)}/${visibleItems} - 2 * ${deriveCSSNumber(spacing)})`,
      minHeight: '100%',
      padding: `0 ${deriveCSSNumber(spacing)}`,
    },
  };

  const onNext = useCallback(
    () => {
      const galleryEl = galleryRef.current;
      try {
        const scroll = scrollTo(galleryEl);
        const { scrollLeft, clientWidth, scrollWidth } = galleryEl;
        if (scrollWidth - (scrollLeft + clientWidth) <= (!isNaN(spacing) ? spacing : 10))
          // A small wrapped utility to handle scrolling.
          scroll({ left: 0, behaviour: 'smooth' });
        else
          scroll({ left: scrollLeft + clientWidth, behaviour: 'smooth' });

        const leftSlides = data.length - slideStartIndex - visibleItems;
        // Set the active indexes on the elements
        if (leftSlides === 0) setSlideStartIndex(0);
        else setSlideStartIndex(leftSlides >= visibleItems ? slideStartIndex + visibleItems : slideStartIndex + leftSlides);
      } catch (error) {
        console.error(error);
        setError(NAVIGATION_ERROR);
      }
    }, [slideStartIndex, data, spacing, visibleItems]
  );


  const onPrev = useCallback(
    () => {
      const galleryEl = galleryRef.current;
      try {
        const scroll = scrollTo(galleryEl);
        const { scrollLeft, clientWidth, scrollWidth } = galleryEl;
        if (scrollLeft <= (!isNaN(spacing) ? spacing : 10))
          scroll({ left: scrollWidth - clientWidth, behaviour: 'smooth' });
        else
          scroll({ left: scrollLeft - clientWidth, behaviour: 'smooth' });

        // Set the active indexes on the elements
        if (slideStartIndex === 0) setSlideStartIndex(data.length - 1 - visibleItems);
        else setSlideStartIndex(slideStartIndex >= visibleItems ? slideStartIndex - visibleItems : 0);
      } catch (error) {
        console.error(error);
        setError(NAVIGATION_ERROR);
      }
    }, [slideStartIndex, data, spacing, visibleItems]
  );


  useEffect(() => {
    if (!auto) return;

    const timer = setInterval(() => {
      onNext();
    }, autoInterval);
    return () => {
      clearInterval(timer);
    }
  }, [auto, autoInterval, onNext]);

  useEffect(() => {
    const galleryEl = galleryRef.current
    galleryEl.scrollLeft = 0;
    galleryEl.style.scrollBehavior = "smooth"; // smooth behaviour polyfill for Safari
    setWidth(galleryEl.clientWidth); // Get the actual width in case if it is set in relative number e.g 40%
    setSlideStartIndex(0);
  }, [visibleItems]);


  const isActiveIndex = (index) => (index >= slideStartIndex) && (index < (slideStartIndex + visibleItems));
  return (
    <Container id="gallery" className="gallery" style={styles.gallery}>
      <Container className="gallery-scroller" ref={galleryRef}>
        {data.length === 0 && NO_DATA}
        {data.map((item, index) => {
          const { id } = item
          return <GalleryItem key={id} data={item} style={styles.galleryItem} title={`Gallery item - ${id}`} alt={`Gallery item - ${id}`} data-active={isActiveIndex(index)}></GalleryItem>
        })}
      </Container>
      <GalleryNavigationButton onPrev={onPrev} onNext={onNext} />
      {error}
    </Container >
  );
}

Gallery.propTypes = {
  data: PropTypes.array.isRequired,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  visibleItems: PropTypes.number,
  auto: PropTypes.bool,
  spacing: PropTypes.number,
  autoInterval: PropTypes.number,
};

export default Gallery;