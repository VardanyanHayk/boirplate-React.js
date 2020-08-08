import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Menu, Input, Dropdown, Button, Grid } from 'antd';
import {
  UnorderedListOutlined,
  CloseOutlined,
  DownOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';
// shared
import Container from 'shared/layout/container';
import Image from 'shared/image';
// mocks
// import Logo_ru from 'assets/logo_ru.png';
// import Logo_en from 'assets/logo_en.png';
// import Logo_am from 'assets/logo_am.png';
import { websiteRoutes } from 'routes/website';
import { languages } from 'constants/localization';
// redux
import { useSelector, useDispatch } from 'react-redux';
import selectors from 'store/selectors';
import actions from 'store/actions';
import { select } from 'redux-saga/effects';
const { Header } = Layout;
const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const renderMenuItems = (routes, translation, path, language) => {
  return routes?.map((item) => {
    if (item.isMenuItem) {
      return item.subRoutes ? (
        <SubMenu
          className={path && path.includes(item.lastPath) && 'selected-menu'}
          key={item.id}
          icon={item.icon}
          title={<Link to={`${language !== 'ru' ? `/${language}` : ''}${item.path}`}>{translation(item.t_key)}</Link>}
        >
          {renderMenuItems(item.subRoutes, translation, path, language)}
        </SubMenu>
      ) : (
        <Menu.Item
          className={path && path.includes(item.lastPath) && 'selected-menu'}
          key={item.id}
          icon={item.icon}
        >
          <Link to={`${language !== 'ru' ? `/${language}` : ''}${item.path}`}>{translation(item.t_key)}</Link>
        </Menu.Item>
      );
    }
  });
};

const renderLanguage = (action, selected, notSelected) => {
  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <Menu>
          {Object.keys(notSelected).map((it, key) => (
            <Menu.Item key={key} onClick={() => action(languages[it])}>
              {languages[it].text}
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      {
        <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
          <GlobalOutlined />
          {` ${selected.text}`}
          <DownOutlined />
        </a>
      }
    </Dropdown>
  );
};
export default () => {
  const screen = useBreakpoint();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  // const [language, setLanguage] = useState(false);
  const { location } = history;
  const path = location.pathname.split('/');
  useEffect(() => {
    open && setOpen(false);
  }, [location]);

  useEffect(() => {
    const path = location.pathname.split('/').filter(it => it !== 'am' && it !== 'en').join('/');
    history.push(`${i18n.language !== 'ru' ? `/${i18n.language}` : ''}${path}`)
  }, [i18n.language]);

  const dispatch = useDispatch();
  const changeLanguage = (payload) =>
    dispatch(actions.localization.change(payload));
  const setLanguage = (language) => {
    changeLanguage(language);
    i18n.changeLanguage(language.code);
  };

  const { selected, notSelected } = useSelector(selectors.localization);

  return (
    <Container>
      <div className='header'>
        <div className='language'>
          {screen.md
            ? renderLanguage(setLanguage, selected, notSelected)
            : null}
        </div>
        <Image.Static
          src='https://www.dreamworksautohouse.co.za/wp-content/uploads/2017/10/logo.png'
          width='auto'
          minWidth='100px'
        />
      </div>
      {screen.md ? (
        <Menu
          mode='horizontal'
          style={{ height: '100%' }}
          theme='dark'
          selectedKeys={[]}
        >
          {renderMenuItems(websiteRoutes(), t, path, i18n.language)}
        </Menu>
      ) : (
        <Menu
          mode='inline'
          style={{ height: '100%' }}
          theme='dark'
          selectedKeys={[]}
        >
          <Menu.Item
            onClick={() => setOpen(!open)}
            icon={
              open ? (
                <CloseOutlined style={{ fontSize: '24px' }} />
              ) : (
                <UnorderedListOutlined style={{ fontSize: '24px' }} />
              )
            }
          ></Menu.Item>
          {open
            ? [
                renderMenuItems(websiteRoutes(), t, path, i18n.language),
                <Menu.Item>
                  {renderLanguage(setLanguage, selected, notSelected)}
                </Menu.Item>,
              ]
            : null}
        </Menu>
      )}
    </Container>
    // </Header>
  );
};
