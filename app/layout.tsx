'use client';
import {
  PieChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import NavLink from './nav-link';

import 'antd/dist/reset.css';

const { Sider, Content, Footer } = Layout;

import { Typography } from 'antd';
import { HeaderComponent } from '../components/header';

const { Link } = Typography;

export default function RootLayout({ children }: { children: any }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <html>
      <head />
      <body style={{ height: '100vh', width: "100%" }}>
        <Layout style={{ height: '100vh', width: "100%" }}>
          <Sider trigger={null}>
            <Menu
              theme="dark"
              mode="inline"
              style={{ marginTop: '3rem' }}
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1',
                  icon: <PieChartOutlined />,
                  label: <NavLink href="/">Dashboard</NavLink>,
                }
              ]}
            />
          </Sider>
          <Layout className="site-layout">
            <HeaderComponent />
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                height: '52rem',
                background: colorBgContainer,
                overflow: 'auto',
              }}
            >
              {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Made for {' '}
              <Link href="https://www.chiralityresearch.com/" target="_blank">
                Chirality Research
              </Link>
            </Footer>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
