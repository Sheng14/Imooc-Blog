<template>
  <div class="hot">
    <view class="hot-container">
      <image
        src="@/static/a.webp"
        mode="aspectFit"
        class="logo"
      />
      <view class="search-box" @click="onToSearch">
        <!-- 搜索模块 -->
        <my-search placeholderText="uni-app 自定义组件" />
      </view>
      <!-- 热点模块 原来不需要像Vue一样引入，直接用就行,假的，还是要引入的，只不过名字可以不一样！！-->
      <view class="tab-sticky">
        <my-tabs @tabClick="tabClick" :tabData="tabData" :defaultIndex="currentIndex"/>
      </view>
    </view>
     <!-- 基于 swiper 的 list 列表 current的意义在于点击tab的时候swiper会滚动到对应的索引，即自动滚动-->
    <swiper class="swiper" :current="currentIndex" :style="{ height: currentSwiperHeight + 'px' }" @change="onSwiperChange">
      <swiper-item class="swiper-item" v-for="(tabItem, tabIndex) in tabData" :key="tabIndex">
        <view>
          <!-- 加载动画 -->
          <uni-load-more status="loading" v-if="isLoading"></uni-load-more>
          <!-- 列表 -->
          <block v-else>
            <!-- 列表循环数据更改为 listData[tabIndex] -->
            <hot-list-item
              v-for="(item, index) in listData[tabIndex]"
              :key="index"
              :data="item"
              :ranking="index + 1"
              class="listItem"
              @click="onItemClick(item)"
            ></hot-list-item>
          </block>
        </view>
      </swiper-item>
    </swiper>
    <!--
    <view>
       加载动画 
      <uni-load-more status="loading" v-if="isLoading"></uni-load-more> 
     list 列表 寄了，这里又不需要引用就能使用列表组件~，两种混一起吧，找不到就亲自引入
      <block v-else>
        <hot-list-item v-for="(item, index) in listData[currentIndex]" :key="index" :data="item" :ranking="index + 1"></hot-list-item>
      </block>
    </view>-->
  </div>
</template>

<script>
import { getHotTabs, getHotListFromTabType } from 'api/hot';
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
      currentIndex: 0,
    // list 列表数据加载过程
      isLoading: true,
    // 以 index 为 key，对应的 list 为 val
      listData: {},
      currentSwiperHeight: 0, // 滚动列表的高度
      swiperHeightCatch: {} // 存储各个tab对应scroll的高度
  }),
  computed: {},
  methods: {
    // 获取热搜标题数据
    async getHotTabs() {
      // uniapp 支持 async await
      const { data: res } = await getHotTabs();
      this.tabData = res.list;
      this.getHotListFromTab(); // 获取默认索引所在的列表数据
    },
    /**
     * list 列表数据
     */
    async getHotListFromTab() {
      // 展示 loading
      this.isLoading = true;
      // 判断缓存是否有数据，不存在则重新获取数据
      if (!this.listData[this.currentIndex]) {
        // 添加提示框
        uni.showLoading({
          title: '加载中',
          mask: true
        });
        // 获取列表数据
        const id = this.tabData[this.currentIndex].id;
        const { data: res } = await getHotListFromTabType(id);
        // 放入数据缓存
        this.listData[this.currentIndex] = res.list;
        this.currentSwiperHeight = res.list.length * 265; // 计算高度
        // 隐藏提示框
        setTimeout(() => {
          uni.hideLoading();
        }, 1000); // 请求回来之后因为一些加载渲染的问题内容还没展示，故加多一点延迟
      }
      // 隐藏 loading
      this.isLoading = false;
    },
    /*
      监听scrollview的变化来与tab联动加载对应列表内容
    */
    onSwiperChange(e) {
      this.currentIndex = e.detail.current;
      this.tabClick(this.currentIndex);
    },
    /**
      搜索框点击事件
     */
    onToSearch() {
      uni.navigateTo({
        url: '/subpkg/pages/search-blog/search-blog'
      });
    },
    /**
     * tab item 的点击事件
     */
    tabClick(index) {
      this.currentIndex = index;
      // 获取列表数据
      this.getHotListFromTab();
    },
    // 进入文章详情
    onItemClick(item) {
      uni.navigateTo({
        url: `/subpkg/pages/blog-detail/blog-detail?author=${item.user_name}&articleId=${item.id}`
      });
    }
  },
  watch: {},
    /*获取滚动列表需要的高度（缺陷在于每个item的高度不一致，加起来可能没那么合适） 
    getScrollHeight() {
      if (this.swiperHeightCatch[this.currentIndex]) {
        this.currentSwiperHeight = this.swiperHeightCatch[this.currentIndex];
      }
      const query = uni.createSelectorQuery().in(this);
      query.selectAll('.listItem').boundingClientRect(data => {
        console.log('obj is :' + data);
        this.currentSwiperHeight = data.length * 137;
        this.swiperHeightCatch[this.currentIndex] = this.currentSwiperHeight;
      }).exec();
      console.log(this.swiperHeightCatch[this.currentIndex]);
    },*/
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
  .tab-sticky {
    position: -webkit-sticky;
    position: sticky;
    z-index: 99;
    top: 0;
  }
}
</style>
