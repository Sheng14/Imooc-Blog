<template>
  <div class="article-operate">
    <view class="operate-container">
      <!-- 输入框 -->
      <view class="comment-box">
        <my-search isShowInput='true' placeholderText="评论一句，前排打call..."></my-search>
      </view>
      <!-- 点赞 -->
      <view class="options-box">
        <article-praise />
      </view>
      <!-- 收藏 -->
      <view class="options-box">
        <article-collect />
      </view>
    </view>
  </div>
</template>

<script>

export default {
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
.operate-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $uni-bg-color;
  padding: 4px 6px 0px 6px;
  display: flex;
  border-top: 1px solid $uni-bg-color-grey;
  align-items: center;
  .comment-box {
    flex-grow: 2;
  }
  .options-box {
    flex-grow: 1;
  }
}
</style>