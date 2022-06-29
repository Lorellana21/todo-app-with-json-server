import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Lista de tareas/i);
  expect(titleElement).toBeInTheDocument();
});
