import { act, fireEvent, render } from '@testing-library/react';

import Gallery from '../index';
import { MOCK_MEDIA_FILES } from './mockData';

function getActiveElements(elements) {
  return [...elements].filter((item) => item.getAttribute('data-active') === 'true')
}

test('render gallery', () => {
  const { container } = render(<Gallery data={MOCK_MEDIA_FILES} spacing={5} />);

  const galleryEls = container.getElementsByClassName('gallery');

  expect(galleryEls.length).toBe(1);
  expect(galleryEls[0]).toBeInTheDocument();

  const galleryEl = galleryEls[0]
  const nextButton = galleryEl.getElementsByClassName('btn next');
  const prevButton = galleryEl.getElementsByClassName('btn prev');

  expect(nextButton.length).toBe(1);
  expect(prevButton.length).toBe(1);
});

test('no data', () => {
  const { container } = render(<Gallery data={[]} />);

  const galleryScEls = container.getElementsByClassName('gallery-scroller');

  expect(galleryScEls[0].innerHTML.toLowerCase().includes('no data')).toBeTruthy();
});

test('gallery elements and visibleItems', () => {
  const visibleItemsCount = 2;
  const { container } = render(<Gallery data={MOCK_MEDIA_FILES} visibleItems={visibleItemsCount} />);

  const galleryScEls = container.getElementsByClassName('gallery-scroller');
  const galleryScEl = galleryScEls[0];

  expect(galleryScEl.childElementCount).toBe(MOCK_MEDIA_FILES.length);

  const galleryElements = galleryScEl.children;
  const visibleElem = getActiveElements(galleryElements);

  expect(visibleElem.length).toBe(visibleItemsCount);
});

test('gallery navigation with autoplay', async () => {
  const visibleItemsCount = 2;
  const autoInterval = 500;
  const { container } = render(<Gallery data={MOCK_MEDIA_FILES} visibleItems={visibleItemsCount} auto={true} autoInterval={autoInterval} />);

  const galleryScEls = container.getElementsByClassName('gallery-scroller');
  const galleryScEl = galleryScEls[0];

  await act(async () => {
    const galleryElements = galleryScEl.children;
    const visibleElemPrev = getActiveElements(galleryElements);

    await new Promise((r) => setTimeout(r, autoInterval));

    const visibleElemCurrent = getActiveElements(galleryElements);
    const commonEl = visibleElemCurrent.filter(element => visibleElemPrev.includes(element));

    expect(commonEl.length).toBe(0);
  });
});

test('gallery navigation with buttons', async () => {
  const visibleItemsCount = 2;
  const { container } = render(<Gallery data={MOCK_MEDIA_FILES} visibleItems={visibleItemsCount} auto={true} />);

  const galleryEls = container.getElementsByClassName('gallery');
  const galleryEl = galleryEls[0]
  const galleryScEls = container.getElementsByClassName('gallery-scroller');
  const galleryScEl = galleryScEls[0];

  const nextButton = galleryEl.getElementsByClassName('btn next')[0];
  const prevButton = galleryEl.getElementsByClassName('btn prev')[0];

  await act(async () => {
    const galleryElements = galleryScEl.children;
    const visibleElemPrev = getActiveElements(galleryElements);
    // Next button click.
    fireEvent.click(nextButton);

    // A small delay to allow slide to move to the next slide
    await new Promise((r) => setTimeout(r, 100));
    const visibleElemCurrent = getActiveElements(galleryElements);
    const commonEl = visibleElemCurrent.filter(element => visibleElemPrev.includes(element));

    expect(commonEl.length).toBe(0);

    // Prev button click.
    fireEvent.click(prevButton);
    await new Promise((r) => setTimeout(r, 100));
    const updatedVisibleElemCurrent = getActiveElements(galleryElements);
    const updatedCommonEl = updatedVisibleElemCurrent.filter(element => visibleElemPrev.includes(element));

    expect(updatedCommonEl.length).toBe(visibleItemsCount);
  });
});

test('gallery navigation with odd number of items', async () => {
  const visibleItemsCount = 3;
  const { container } = render(<Gallery data={MOCK_MEDIA_FILES} visibleItems={visibleItemsCount} auto={true} />);

  const galleryEls = container.getElementsByClassName('gallery');
  const galleryEl = galleryEls[0]
  const galleryScEls = container.getElementsByClassName('gallery-scroller');
  const galleryScEl = galleryScEls[0];

  const nextButton = galleryEl.getElementsByClassName('btn next')[0];
  const prevButton = galleryEl.getElementsByClassName('btn prev')[0];

  await act(async () => {
    const galleryElements = galleryScEl.children;
    const visibleElemPrev = getActiveElements(galleryElements);

    // Next button click.
    fireEvent.click(nextButton);
    // A small delay to allow slide to move to the next slide
    await new Promise((r) => setTimeout(r, 100));
    const visibleElemCurrent = getActiveElements(galleryElements);
    const commonEl = visibleElemCurrent.filter(element => visibleElemPrev.includes(element));

    expect(commonEl.length).toBe(Math.floor(MOCK_MEDIA_FILES.length / visibleItemsCount));

    // Prev button click.
    fireEvent.click(prevButton);
    // A small delay to allow slide to move to the next slide
    await new Promise((r) => setTimeout(r, 100));
    const updatedVisibleElemCurrent = getActiveElements(galleryElements);
    const updatedCommonEl = updatedVisibleElemCurrent.filter(element => visibleElemCurrent.includes(element));

    expect(updatedCommonEl.length).toBe(Math.floor(MOCK_MEDIA_FILES.length / visibleItemsCount));
  });
});
