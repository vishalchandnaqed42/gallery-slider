import { fireEvent, render, screen } from '@testing-library/react';
import Iframe from './index';

test('render iframe', () => {
  const youtubeVideoUrl = "https://www.youtube.com/embed/BHACKCNDMW8";
  const title = "iframe title";
  const id = "iframe";
  render(<Iframe src={youtubeVideoUrl} title={title} data-testid={id} />);
  const iframeEl = screen.getByTestId(id)
  expect(iframeEl).toBeInTheDocument();
});

test('iframe props', () => {
  const youtubeVideoUrl = "https://www.youtube.com/embed/BHACKCNDMW8";
  const title = "iframe title";
  const id = "iframe";
  render(<Iframe src={youtubeVideoUrl} title={title} data-testid={id} />);
  const iframeEl = screen.getByTestId(id)

  expect(iframeEl.src).toBeDefined();
  expect(iframeEl.src).toBe(youtubeVideoUrl);

  expect(iframeEl.title).toBeDefined();
  expect(iframeEl.title).toBe(title);
});

test('iframe content load', () => {
  const youtubeVideoUrl = "https://www.youtube.com/embed/BHACKCNDMW8";
  const title = "iframe title";
  const id = "iframe";

  const handleLoad = jest.fn();
  render(<Iframe src={youtubeVideoUrl} title={title} data-testid={id} onLoad={handleLoad} />);
  const iframeEl = screen.getByTestId(id)

  fireEvent.load(iframeEl);
  expect(handleLoad).toHaveBeenCalledTimes(1)
});
