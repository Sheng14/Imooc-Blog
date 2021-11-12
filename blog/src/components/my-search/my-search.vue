<template>
  <div class="my-search">
      <view class="my-search-container">
        <!-- 搜索按钮 -->
        <view class="my-search-box">
          <image class="icon" src="@/static/search.png" />
          <text
            class="placeholder"
            :style="{
              color: config.textColor
            }"
            >{{ placeholderText }}</text
          >
        </view>
    </view>
  </div>
</template>

<script>

export default {
  name: 'my-search',
  props: {
    placeholderText: {
      type: String,
      default: '搜索'
    }
  },
  data: () => ({}),
  computed: {},
  methods: {},
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

<style lang="scss">
.my-search-container {
  display: flex;
  align-items: center;
  .my-search-box {
    height: 36px;
    background-color: #ffffff;
    border-radius: 15px;
    border: 1px solid #c9c9c9;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 $uni-spacing-row-base;
    .icon {
      width: $uni-img-size-sm;
      height: $uni-img-size-sm;
    }
    .placeholder {
      font-size: $uni-font-size-sm;
      margin-left: $uni-spacing-row-sm;
      color: #454545;
    }
  }
}
</style>