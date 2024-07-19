import KXRequest from '../request/index';

export const getCityAll = () => {
  return KXRequest.get({
    url: '/city/all',
  });
};
