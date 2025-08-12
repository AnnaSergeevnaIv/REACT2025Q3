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
type Routes = {
  ROOT: string;
  ABOUT: string;
  DETAIL: string;
  NO_MATCH: string;
};
const ROUTES: Routes = {
  ROOT: '/',
  ABOUT: '/about',
  DETAIL: '/character/:id',
  NO_MATCH: '*',
} as const;
export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <App />,
    id: 'root',
    children: [
      {
        path: ROUTES.ROOT,
        element: <MainPage />,
        children: [
          {
            path: ROUTES.ROOT,
            element: <CardsLayout />,
            children: [
              {
                path: ROUTES.DETAIL,
                element: <DetailPage />,
              },
            ],
          },
          {
            path: ROUTES.ABOUT,
            element: <AboutPage />,
          },
        ],
      },
      {
        path: ROUTES.NO_MATCH,
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
