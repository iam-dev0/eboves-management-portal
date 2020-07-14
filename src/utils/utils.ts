/* eslint-disable no-use-before-define */
import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import { Route } from '@/models/connect';
import { CategoryItem } from '@/pages/ProductModule/Categories/data';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends Route>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};

export const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getARandomNumber = () => {
  return Math.floor(Math.random() * 1000000);
};

export const addLevelToHierarchy = (data: CategoryItem[] | any, level = 0) => {
  return data.map((item: CategoryItem) => {
    return {
      level,
      ...item,
      childrens: item.childrens?.length
        ? addLevelToHierarchy(item.childrens, level + 1)
        : item.childrens,
    };
  });
};

export const CascaderStructure = (data: any) => {
  return data.map((item: any) => {
    return {
      ...item,
      value: item.id,
      label: item.name,
      children: item.childrens?.length ? CascaderStructure(item.childrens) : item.childrens,
    };
  });
};

export const findPathHelper = (node: any, category: any): any => {
  if (node.id === category.id) {
    return [node];
  }

  if(node.children)
  // eslint-disable-next-line no-restricted-syntax
  for (const child of node.children) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const childPath = findPathHelper(child, category);
    if (Array.isArray(childPath)) {
      childPath.unshift(node);
      return childPath;
    }
  }
  return undefined;
};

export const findPath = (nodes: any, category: any): any => {
  if (!Array.isArray(nodes)) throw Error('Only arrays');
  // eslint-disable-next-line no-restricted-syntax

  // eslint-disable-next-line no-restricted-syntax
  for (const node of nodes) {
    const something = findPathHelper(node, category);
    if (something) return something;
  }
  return undefined;
};
