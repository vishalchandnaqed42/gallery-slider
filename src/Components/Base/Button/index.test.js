import { fireEvent, render, screen } from '@testing-library/react';
import Button from './index';

test('render button', () => {
  render(<Button>ClickMe</Button>);
  const buttonEl = screen.getByText('ClickMe');
  expect(buttonEl).toBeInTheDocument();
});

test('button props', () => {
  render(<Button className="btn">ClickMe</Button>);
  const buttonEl = screen.getByText('ClickMe');
  expect(buttonEl.className).toBeDefined();
  expect(buttonEl.className).toBe('btn');
});

test('button click event', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>ClickMe</Button>);
  const buttonEl = screen.getByText('ClickMe');
  fireEvent.click(buttonEl);
  expect(handleClick).toHaveBeenCalledTimes(1)
  fireEvent.click(buttonEl);
  fireEvent.click(buttonEl);
  expect(handleClick).toHaveBeenCalledTimes(3)
});


