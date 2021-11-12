<template>
  <div class="hot">
    <view class="hot-container">
      <image
        src="@/static/a.webp"
        mode="aspectFit"
        class="logo"
      />
      <view class="search-box">
        <!-- 搜索模块 -->
        <my-search placeholderText="uni-app 自定义组件" />
      </view>
      <!-- 热点模块 原来不需要像Vue一样引入，直接用就行,假的，还是要引入的，只不过名字可以不一样！！-->
      <my-tabs :tabData="tabData" :defaultIndex="currentIndex"/>
    </view>
  </div>
</template>

<script>
import { getHotTabs } from 'api/hot';
import MySearch from '../../../components/my-search/my-search'
import MyTabs from '../../../components/my-tabs/my-tabs'
export default {
  components: {
    MySearch,
    MyTabs
  },
  data: () => ({
    // tabs 数据源
      tabData: [],
    // 当前的切换 index
      currentIndex: 0
  }),
  computed: {},
  methods: {
    // 获取热搜标题数据
    async getHotTabs() {
      // uniapp 支持 async await
      const { data: res } = await getHotTabs();
      this.tabData = res.list;
    }
  },
  watch: {},

  // 在实例创建完成后被立即调用
  created() {
    this.getHotTabs();
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
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.hot-container {
  background-color: $uni-bg-color;
  .logo {
    margin-left: 60rpx;
    height: 400rpx;
  }
  .search-box {
    padding: 0 16px;
    margin-bottom: $uni-spacing-col-base;
  }
}
</style>
