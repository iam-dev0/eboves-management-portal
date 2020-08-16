/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: 'The request has succeeded',
  201: 'New resource has been created ',
  202: 'The request has been received',
  204: 'No Content',
  400: 'The server could not understand the request due to invalid syntax.',
  401: 'Unauthorized Operation',
  403: 'You do not have access rights to the content',
  404: 'Not Found',
  406: 'Not Acceptable',
  410: 'The request content is not longer available',
  422: 'The request was well-formed but was unable to be followed due to semantic errors.',
  500: "The server has encountered a situation it doesn't know how to handle",
  502: 'Bad Gateway',
  503: 'The server is not ready to handle the request',
  504: 'Timeout',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Please check you internet connect',
      message: 'Internet connectivity error',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
  // eslint-disable-next-line no-undef 
  prefix: API_URL,
});

export default request;
