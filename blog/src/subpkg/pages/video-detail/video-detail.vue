<template>
  <div class="video-detail">
    <view class="video-detail-container">
      <view class="video-box">
        <video id="myVideo" class="video" :src="videoData.play_url" :danmu-list="danmuList" enable-danmu danmu-btn controls />
        <hot-video-info :data="videoData" />
      </view>
      <!-- 弹幕模块 -->
      <view class="danmu-box">
        <!-- 弹幕列表 -->
        <view class="comment-container">
          <view class="all-comment-title">全部弹幕</view>
          <view class="list">
            <block v-for="(item, index) in commentList" :key="index">
              <article-comment-item :data="item"/>
            </block>
          </view>
        </view>
      </view>
      <!-- 底部功能区 -->
      <article-operate tag="video" @danmuClick="onSendDanmu" />
    </view>    
  </div>
</template>

<script>
import { getVideoDanmuList } from 'api/video';
import { mapState } from 'vuex';
import { getRandomColor } from 'utils';
export default {
  components: {},
  data: () => ({
    // 弹幕数据源
    danmuList: [],
    // 弹幕列表数据源
    commentList: [],
    // video 组件上下文
    videoContext: null    
  }),
  computed: {
     ...mapState('video', ['videoData'])
  },
  methods: {
    /**
     * 获取弹幕数据
     */
    async loadVideoDanmuList() {
      const { data: res } = await getVideoDanmuList({
        videoId: this.videoData.id
      });
      // 定义随机颜色
    /*  res.list.forEach((item) => {
        item.color = getRandomColor();
      });*/
      this.danmuList = res.list;
      this.commentList = res.list;
    },
    /**
     * 弹幕发布成功之后的回调
     */
    onSendDanmu(data) {
      console.log(data);
      // 发送弹幕
      this.videoContext.sendDanmu({
        text: data,
        color: getRandomColor()
      });
      // 添加弹幕到数据源
      this.danmuList.unshift(data);
      // 提示用户
      uni.showToast({
        title: '发表成功'
      });
    }  
  },
  watch: {},
  created() {
    this.loadVideoDanmuList();
  },
  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady(res) {
    // 获取 video 组件上下文
    this.videoContext = uni.createVideoContext('myVideo');
  },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.video-detail-container {
  .video-box {
    background-color: $uni-bg-color;
    position: sticky;
    top: 0;
    z-index: 9;
    .video {
      width: 100%;
      height: 230px;
    }
  }
  .danmu-box {
    border-top: $uni-spacing-col-sm solid $uni-bg-color-grey;
    margin-bottom: 36px;
    .comment-container {
      padding: $uni-spacing-col-lg $uni-spacing-row-lg;
      .all-comment-title {
        font-size: $uni-font-size-lg;
        font-weight: bold;
      }
    }
  }  
}
</style>
