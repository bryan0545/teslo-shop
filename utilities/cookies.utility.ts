import Cookie from 'js-cookie';

export const getCookie = (key: string) => {
  return Cookie.get(key);
};

export const setCookie = (key: string, value: any) => {
  return Cookie.set(key, value);
};
