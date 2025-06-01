import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {theme} from "./theme";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={Router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

