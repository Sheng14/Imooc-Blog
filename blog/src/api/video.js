import request from '../utils/request';

/**
 * 热播视频列表
 */
export function getHotVideoList(data) {
  return request({
    url: '/video/list',
    data
  });
}