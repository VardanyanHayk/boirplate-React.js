import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  CarOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import useLazy from 'shared/hoc/withLazy';
import Container from 'shared/layout/container';
import { languages } from 'constants/localization';
// import { sections } from 'constants/about';

const Page404 = useLazy(() => import('app/website/404'));
// import HomePage from 'app/website/HomePage';
const HomePage = useLazy(() => import('app/website/HomePage'));

export const websiteRoutes = (orgs) => [
  {
    id: 1,
    path: '/homepage',
    exact: true,
    t_key: 'homepage',
    lastPath: 'homepage',
    component: HomePage,
    isMenuItem: true,
    icon: <CarOutlined />,
  },
  {
    id: 2,
    path: '/salon',
    exact: true,
    t_key: 'salon',
    lastPath: 'salon',
    component: HomePage,
    isMenuItem: true,
    icon: <CarOutlined />,
    subRoutes: [
      {
        id: 2.1,
        path: '/salon/seats',
        exact: true,
        t_key: 'seats',
        lastPath: 'seats',
        component: HomePage,
        isMenuItem: true,
        icon: <CarOutlined />,
        subRoutes: [
          {
            id: 2.11,
            path: '/salon/seats/new',
            exact: true,
            t_key: 'seats1.1',
            lastPath: 'new',
            component: HomePage,
            isMenuItem: true,
          },
          {
            id: 2.12,
            path: '/salon/seats/old',
            exact: true,
            t_key: 'seats1.2',
            lastPath: 'old',
            component: HomePage,
            isMenuItem: true,
          },
        ],
      },
      {
        id: 2.2,
        path: '/salon/sevcneliq',
        exact: true,
        t_key: 'seats2',
        lastPath: 'sevcneliq',
        component: HomePage,
        isMenuItem: true,
      },
    ],
  },

  // {
  //   id: 9,
  //   path: '/admin',
  //   exact: true,
  //   t_key: 'admin_panel',
  //   component: AdminLogin,
  //   isMenuItem: false,
  // },
  {
    id: 3,
    path: '/exist',
    exact: true,
    t_key: 'homepage',
    lastPath: 'exist',
    component: HomePage,
    isMenuItem: true,
    icon: <CarOutlined />,
  },
  {
    id: 12,
    path: '/page_not_found',
    component: Page404,
    isMenuItem: false,
  },
];

const defineRoutes = (routes, language) => {
  return routes.map((route, key) => {
    let routes = [];
    if (route.subRoutes) {
      routes = defineRoutes(route.subRoutes, language);
    }
    routes.push(
      <Route
        key={route.id}
        exact={route.exact}
        path={`${language !== 'ru' ? `/${language}` : ''}${route.path}`}
        render={() => <route.component />}
      />
    );
    return routes;
  });
};
export default () => {
  const { t, i18n } = useTranslation();
 return (
  <Switch>
    {defineRoutes(websiteRoutes(), i18n.language)}
    <Redirect from='/' to='/homepage' />
    <Redirect to='/page_not_found' />
  </Switch>
)};
