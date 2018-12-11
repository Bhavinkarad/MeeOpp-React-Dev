export const LOADER_SHOW = 'LOADER_SHOW';
export const LOADER_HIDE = 'LOADER_HIDE';

export const loaderShow = data => ({
  type: LOADER_SHOW,
  data,
});
export const loaderHide = data => ({
  type: LOADER_HIDE,
  data,
});
