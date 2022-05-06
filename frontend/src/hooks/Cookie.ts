import Cookies, { CookieSetOptions, CookieGetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (
  name: string,
  value: string,
  options?: CookieSetOptions,
) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string, options?: CookieGetOptions) => {
  return cookies.get(name, options);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
