import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router.tsx';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './styles/global.style.ts';


const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          refetchOnWindowFocus: false,
      },
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router}/>
    </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
