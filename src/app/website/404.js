import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t, i18n } = useTranslation();
  return (
    <Result
      status='404'
      title='404'
      subTitle={t('page_not_found')}
      extra={
        <Link to='/'>
          <Button type='primary'>{t('return_homepage')}</Button>
        </Link>
      }
    />
  );
};

export default Page404;
