import request from '../utils/request';

/**
 * 默认搜索内容
 */
export function getDefaultText() {
  return request({
    url: '/search/default-text'
  });
}

/**
 * 热搜搜索列表
 */
 export function getSearchHotList() {
  return request({
    url: '/search/hot-list'
  });
}