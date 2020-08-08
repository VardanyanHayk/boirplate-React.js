import React from 'react';
import { Switch, Route } from 'react-router-dom';
import useLazy from 'shared/hoc/withLazy';
const WebSite = useLazy(() => import('app/website/index'));
// const AdminPanel = useLazy(() => import('../app/admin'));

export const RootRoutes = [
  // {
  //   id: 1,
  //   path: '/dashboard',
  //   exact: false,
  //   t_key: 'dashboard',
  //   component: AdminPanel,
  // },
  {
    id: 2,
    path: `/`,
    exact: false,
    t_key: 'main',
    component: WebSite,
  },
  {
    id: 3,
    path: `/am`,
    exact: false,
    t_key: 'main',
    component: WebSite,
  },
  {
    id: 4,
    path: `/en`,
    exact: false,
    t_key: 'main',
    component: WebSite,
  },
];

export default () => (
  <Switch>
    {RootRoutes.map((route) => (
      <Route key={route.id} exact={route.exact} path={route.path} render={() => <route.component />} />
    ))}
  </Switch>
);
