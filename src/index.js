import { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import Home from './pages/home';
import Authors from './pages/authors';
import Jokes from './pages/jokes';
import ErrorPage from './pages/error_page';

export const routes = [
  {
    element: <Home />,
    path: '/',
    name: 'home',
  },
  {
    element: <Authors />,
    path: '/authors',
    name: 'authors',
  },
  {
    element: <Jokes />,
    path: '/:authors?/:authorId?/jokes',
    name: 'joke',
  },
  {
    element: <ErrorPage />,
    path: '*',
    name: '404',
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      name: route.name,
      element: route.element,
      errorElement: <ErrorPage />,
      nodeRef: createRef(),
    })),
  },
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
