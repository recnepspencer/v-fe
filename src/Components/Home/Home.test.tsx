// src/Components/Home/Home.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom/extend-expect'; // for the extra matchers

test('renders the home component with name', async () => {
  render(<Home />);
  
  // Assuming the loading text appears initially
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Here you might want to mock the API call to immediately resolve with the data
  // So that you can check the rendered name
  
  // Wait for the loading state to be removed and name to be rendered
  await screen.findByText('Spencer Hepworth');
  
  expect(screen.getByText('Spencer Hepworth')).toBeInTheDocument();
});