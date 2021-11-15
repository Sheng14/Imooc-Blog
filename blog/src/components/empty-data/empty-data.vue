<template>
  <div class="empty-data">
    <view class="empty-data-cocntainer">
      <image src="/static/empty.png" class="img" />
      <view class="txt">暂无数据</view>
    </view>
  </div>
</template>

<script>

export default {
  name: 'empty-data',
  props: {},
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

<style lang="scss" scoped>
.empty-data-cocntainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35%;
  .img {
    width: 64px;
    height: 64px;
  }
  .txt {
    margin-top: $uni-spacing-col-sm;
    color: $uni-text-color-grey;
    font-size: $uni-font-size-base;
  }
}
</style>
