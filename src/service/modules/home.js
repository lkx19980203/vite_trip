import KXRequest from '../request/index';

export const getHomeHotSuggests = () => {
  return KXRequest.get({
    url: '/home/hotSuggests',
  });
};
export const getHomeCategories = () => {
  return KXRequest.get({
    url: '/home/categories',
  });
};
export function getHomeHouselist(currentPage) {
  return KXRequest.get({
    url: '/home/houselist',
    params: {
      page: currentPage,
    },
  });
}
