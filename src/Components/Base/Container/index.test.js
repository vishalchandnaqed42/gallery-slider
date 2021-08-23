import { render, screen } from '@testing-library/react';
import Container from './index';

test('render container', () => {
  render(<Container>Container</Container>);
  const containerEl = screen.getByText('Container');
  expect(containerEl).toBeInTheDocument();
});

test('container props and children', () => {
  render(<Container className="container">
    Container
    <span>Children Text</span>
  </Container>);
  const containerEl = screen.getByText('Container');
  expect(containerEl.className).toBeDefined();
  expect(containerEl.className).toBe('container');

  const spanEls = containerEl.getElementsByTagName('span');
  expect(spanEls).toHaveLength(1);
  expect(spanEls[0]).toHaveTextContent('Children Text');
});
