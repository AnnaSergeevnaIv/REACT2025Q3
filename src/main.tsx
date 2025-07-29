import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App.tsx';
import { NoMatch } from './pages/NoMatch';
import { MainPage } from './pages/MainPage';
import { CardsLayout } from './components/CardsLayout';
import { AboutPage } from './pages/AboutPage';
import { DetailPage } from './pages/DetailPage';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    id: 'root',
    children: [
      {
        path: '',
        element: <MainPage />,
        children: [
          {
            path: '',
            // loader: charactersLoader,
            id: 'cards-layout',
            element: <CardsLayout />,
            children: [
              {
                path: 'character/:id',
                // loader: characterDetailLoader,
                id: 'detail',
                element: <DetailPage />,
              },
            ],
          },
          {
            path: '/about',
            element: <AboutPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NoMatch />,
      },
    ],
  },
]);

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
}
