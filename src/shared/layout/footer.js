import React from 'react';
import {
  Layout,
  Row,
  Col,
  Typography,
  Input,
  Form,
  Button,
  message,
} from 'antd';
import Container from 'shared/layout/container';
import Image from 'shared/image';
import { Link } from 'react-router-dom';
import { SendOutlined } from '@ant-design/icons';
// mocks

import { useTranslation } from 'react-i18next';

//redux
import { useDispatch } from 'react-redux';
import actions from 'store/actions';

import i18n from 'localization';
const { Paragraph } = Typography;
const { Footer } = Layout;

export default () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  return (
    <Footer>
      <Container>
        <Row type='flex' justify='center'>
          2020
        </Row>
      </Container>
    </Footer>
  );
};
