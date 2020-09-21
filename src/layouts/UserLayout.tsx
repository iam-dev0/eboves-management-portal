import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useIntl, ConnectProps, connect } from 'umi';
import React from 'react';
import SelectLang from '@/components/SelectLang';
import { ConnectState } from '@/models/connect';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';
import { GithubOutlined } from '@ant-design/icons';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                {/* <img alt="logo" className={styles.logo} src={logo} /> */}
                <span className={styles.title}>Eboves</span>
              </Link>
            </div>
            <div className={styles.desc}>Eboves where sky is the limit</div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright="2020 Zidoary"
          links={[
            {
              key: 'Eboves',
              title: 'Eboves',
              href: 'eboves.com',
              blankTarget: true,
            },
            {
              key: 'github',
              title: <GithubOutlined />,
              href: 'https://github.com/awais000',
              blankTarget: true,
            },
            {
              key: 'Zidoary',
              title: 'Zidoary',
              href: 'zidoary.com',
              blankTarget: true,
            },
          ]}
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
