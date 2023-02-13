// import { createMemoryHistory } from 'history';
import { createMemoryHistory } from "history";
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

export const renderWithRouter = (
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
};
