import { fireEvent, render, screen } from '@testing-library/react';
import Image from './index';

const imgSrc = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";
const imgAlt = "Sample alt text";
const id = "img";

test('render image', () => {
  render(<Image src={imgSrc} alt={imgAlt} data-testid={id} />);
  const imgEl = screen.getByTestId(id);

  expect(imgEl).toBeInTheDocument();
});

test('image props', () => {
  render(<Image src={imgSrc} alt={imgAlt} width={500} height={300} data-testid={id} />);
  const imgEl = screen.getByTestId(id);

  expect(imgEl.src).toBeDefined();
  expect(imgEl.src).toBe(imgSrc);

  expect(imgEl.alt).toBeDefined();
  expect(imgEl.alt).toBe(imgAlt);

  expect(imgEl.width).toBeDefined();
  expect(imgEl.width).toBe(500);

  expect(imgEl.height).toBeDefined();
  expect(imgEl.height).toBe(300);
});
