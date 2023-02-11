import { render, screen } from '@testing-library/react';
import Logo from './Logo';

test('renders the logo text', () => {
  render(<Logo/>);
  const txt = screen.getByText(/Ref-Notes/i);
  expect(txt).toBeInTheDocument();
})
