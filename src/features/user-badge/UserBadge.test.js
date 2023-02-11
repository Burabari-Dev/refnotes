import { render, screen } from '@testing-library/react';
import UserBadge from './UserBadge';

describe('UserBadges tests', () => {
  test('renders the user sign-in button', () => {
    render(<UserBadge/>);
    const btn = screen.getByText(/Sign In/i);
    expect(btn).toBeInTheDocument();
    expect(btn).toBeInstanceOf(HTMLButtonElement);
  })
  
  test('renders the guest salutation', () => {
    render(<UserBadge/>);
    const txt = screen.getByText(/Hello Guest/i);
    expect(txt).toBeInTheDocument();
  })

})
