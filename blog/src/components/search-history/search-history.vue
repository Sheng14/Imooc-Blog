<template>
  <div class="search-history">
    <view class="search-history-container">
      <!-- title 区域 -->
      <view class="search-history-title-box">
        <view class="search-history-title">搜索历史</view>
        <view v-if="!isShowClear">
          <uni-icons type="trash" @click="isShowClear = true" />
        </view>
        <view v-else>
          <text class="txt"  @click="onClearAll">全部删除</text>
          <text class="txt" @click="isShowClear = false">完成</text>
        </view>
      </view>
      <!-- 内容区域 -->
      <view class="search-history-box">
        <block v-for="(item, index) in searchData" :key="index">
          <view class="search-history-item" @click="onHistoryItemClick(item, index)">
            <text class="history-txt line-clamp">{{ item }}</text>
            <uni-icons v-show="isShowClear" type="clear" />
          </view>
        </block>
      </view>
    </view>
  </div>
</template>

<script>

export default {
  name: 'search-history',
  props: {
    searchData: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    isShowClear: false
  }),
  computed: {},
  methods: {
    onClearAll() {
      uni.showModal({
        title: '提示',
        content: '删除搜索历史记录？',
        showCancel: true,
        success: ({ confirm, cancel }) => {
          if (confirm) {
            // 删除 searchData
            this.$emit('removeAllSearchData');
            // 返回状态
            this.isShowClear = false;
          }
        }
      });
    },
    onHistoryItemClick(item, index) {
      if (this.isShowClear) {
        // 删除指定的 searchData
        this.$emit('removeSearchData', index);
      } else {
        this.$emit('onItemClick', item);
      }
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
.search-history-container {
  padding: $uni-spacing-col-lg $uni-spacing-row-lg;
  .search-history-title-box {
    display: flex;
    justify-content: space-between;

    .search-history-title {
      font-size: $uni-font-size-sm;
      color: $uni-text-color;
      padding: $uni-spacing-col-sm $uni-spacing-row-sm;
    }
    .txt {
      color: $uni-text-color-grey;
      font-size: $uni-font-size-sm;
      padding: $uni-spacing-col-sm $uni-spacing-row-sm;
    }
  }
  .search-history-box {
    margin-top: $uni-spacing-col-lg;
    .search-history-item {
      width: 50%;
      box-sizing: border-box;
      display: inline-block;
      padding: $uni-spacing-col-base $uni-spacing-row-base;
      position: relative;
      .history-txt {
        width: 85%;
        display: inline-block;
        color: $uni-text-color;
        font-size: $uni-font-size-base;
      }
    }
    .search-history-item:nth-child(odd):before {
      content: ' ';
      border-left: 1px solid #999;
      display: inline-block;
      height: 10px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
  }
}
</style>
