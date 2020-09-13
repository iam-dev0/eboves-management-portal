import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link, connect, Dispatch } from 'umi';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginForm from './components/Login';

import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;
interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="Basic">
          {status === 'error' && !submitting && (
            <LoginMessage content="invalid username or credential" />
          )}

          <UserName
            name="userName"
            placeholder="email or username"
            rules={[
              {
                required: true,
                message: 'feild is required!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="password"
            rules={[
              {
                required: true,
                message: 'feild is required!',
              },
            ]}
          />
        </Tab>
        {/* <Tab key="mobile" tab="Mobile">
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="invalid username or credential" />
          )}
          <Mobile
            name="mobile"
            placeholder="phone no"
            rules={[
              {
                required: true,
                message: 'feild is required!',
              },
              {
                pattern: /^1\d{10}$/,
                message: 'wrong number!',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="captcha"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: 'feild is required!',
              },
            ]}
          />
        </Tab> */}
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            Remember me
          </Checkbox>
        </div>
        <Submit loading={submitting}>Login</Submit>
        {/* <div className={styles.other}>
          其他登录方式
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div> */}
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
