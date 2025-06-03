import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import { RouterProvider } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  // </React.StrictMode>
);

