import React from 'react';
import { Navigate } from 'react-router-dom';
import NotFoundView from 'src/views/errors/NotFoundView';
import MainView from './views/main';
import FedLayout from './layouts/FedLayout';
import DiscoverView from './views/discover';

const routes = [
  {
    path: '/',
    element: <FedLayout />,
    children: [{ path: '404', element: <NotFoundView /> },
      { path: 'discover', element: <DiscoverView /> },
      { path: 'main', element: <MainView /> },
      { path: '/', element: <Navigate to="/main" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
