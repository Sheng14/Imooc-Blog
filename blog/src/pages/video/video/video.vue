<template>
  <div class="video">
    <view class="hot-video-container">
      <block v-for="(item, index) in videoList" :key="index">
        <hot-video-item :data="item" @click="onItemClick"/>
      </block>
    </view>
  </div>
</template>

<script>
const MAX_VIDEO = 100; // 最多加载视频数量
import { getHotVideoList } from 'api/video';
import { mapMutations } from 'vuex';
export default {
  components: {},
  data: () => ({
    // 数据源
    videoList: [],
    size: 10,
    page: 1
  }),
  computed: {},
  methods: {
    ...mapMutations('video', ['setVideoData']),
    /**
     * 获取列表数据
     */
    async loadHotVideoList() {
      if (this.page * this.size >= MAX_VIDEO) {
        uni.showToast({
          title: '已经加载完毕',
          icon: 'none',
          mask: true
        })
        return;
      }
      const { data: res } = await getHotVideoList({ page: this.page, size: this.size });
      // 判断是否为第一页数据
      if (this.page === 1) {
        this.videoList = res.list;
      } else {
        this.videoList = [...this.videoList, ...res.list];
      }
      this.page++;
    },
    /**
     * item 点击事件
     */
    onItemClick(data) {
      // 保存当前点击的 video 数据到 vuex
      this.setVideoData(data);
      uni.navigateTo({
        url: `/subpkg/pages/video-detail/video-detail`
      });
    }    
  },
  watch: {},
  created() {
    this.loadHotVideoList();
  },
  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
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
  onReachBottom() {
    this.loadHotVideoList();
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.hot-video-container {
  background-color: $uni-bg-color-grey;
}
</style>