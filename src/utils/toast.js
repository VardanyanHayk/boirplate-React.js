import React from 'react';
import { Typography, Row, notification } from 'antd';
import i18n from 'localization';

const error = (data) => {
  let body = null;
  console.log('data', data);
  switch (true) {
    case !!data.error:
      body = {
        message: data.error,
      };
      break;
    default:
      body = {
        message: 'Something went wrong',
      };
  }
  body && notification.error(body);
};

const success = (description) => {
  notification.success({
    message: description ? description : i18n.t('operation_completed'),
  });
};

export default {
  error,
  success,
};
