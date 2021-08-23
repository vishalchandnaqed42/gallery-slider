import { fireEvent, render, screen } from '@testing-library/react';
import Select from './index';

const id = "select";

test('render select', () => {
  render(<Select data-testid={id}></Select>);
  const selectEl = screen.getByTestId(id);
  expect(selectEl).toBeInTheDocument();
});

test('select change event', () => {
  const handleChange = jest.fn();
  render(<Select onChange={handleChange} data-testid={id}>
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
  </Select>);

  const selectEl = screen.getByTestId(id);
  fireEvent.change(selectEl, { target: { value: "2" } })
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(selectEl.value).toBe("2")
});
