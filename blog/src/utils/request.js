const BASE_URL = 'https://api.imooc-blog.lgdsunday.club/api';
import store from '../store';
function request({ url, data, method }) {
  return new Promise((resolve, reject) => {
    uni.request({
      header: {
        Authorization: store.state.user.token
      },
      url: BASE_URL + url,
      data,
      method,
      success: ({ data }) => {
        if (data.success) {
          resolve(data);
        } else {
          uni.showToast({
            title: data.message,
            icon: 'none',
            mask: true,
            duration: 3000
          });
          reject(data.message);
        }
      },
      fail: (error) => {
        reject(error);
      }/*,
      complete: () => {
        // 关闭加载
        uni.hideLoading();
      } 这个我当然可以在success和fail中开启加载，然后在这里关闭加载中的提示，但是由于tab切换延迟的问题就暂时不在这写了*/
    });
  });
}

export default request;
