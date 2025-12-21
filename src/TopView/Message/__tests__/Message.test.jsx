import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from '../Message';

test('renders message title and lead', () => {
  render(<Message />);
  const title = screen.getByText(/Message/i);
  expect(title).toBeInTheDocument();
});
