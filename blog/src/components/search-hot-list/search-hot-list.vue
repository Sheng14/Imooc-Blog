<template>
  <div class="search-hot-list">
    <view class="search-hot-list-container">
      <!-- 标题 -->
      <view class="search-hot-title">慕课热搜 - 全网技术 一网打尽</view>
      <block v-for="(item, index) in hotList" :key="index">
        <view class="search-hot-item" @click="onItemClick(item, index)">
          <!-- 序号 -->
          <hot-ranking :ranking="index + 1"></hot-ranking>
          <!-- 文本 -->
          <text class="title line-clamp">{{ item.label }}</text>
          <!-- hot-icon -->
          <image v-if="index <= 2" class="search-hot-icon" src="/static/hot-icon.png" />
        </view>
      </block>
    </view>
  </div>
</template>

<script>
import { getSearchHotList } from 'api/search';
export default {
  name: 'search-hot-list',
  props: {},
  data: () => ({
    hotList: []
  }),
  computed: {},
  created() {
    this.getSearchHotList();
  },
  methods: {
    /**
     * 获取热搜列表数据
    */
    async getSearchHotList() {
      const { data: res } = await getSearchHotList();
      this.hotList = res.list;
      console.log(this.hotList);
    },
    /**
     * 热键item 点击事件
     */
    onItemClick(item, index) {
      this.$emit('onSearch', item.label);
    }
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.search-hot-list-container {
  .search-hot-title {
    font-weight: bold;
    font-size: $uni-font-size-base;
    color: $uni-text-color-hot;
    padding: 0 12px $uni-spacing-col-lg 12px;
    margin: 0 -12px $uni-spacing-col-lg 0px;
    box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
  }
  .search-hot-item {
    display: flex;
    align-items: center;
    padding: $uni-spacing-col-lg 0;
    margin-left: 20rpx;
    .title {
      color: $uni-text-color;
      font-size: $uni-font-size-base;
      margin: 0 $uni-spacing-row-base;
    }
    .search-hot-icon {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
