<template>
  <div class="article-comment">
    <view class="comment-box">
      <image class="img" src="/static/comment.png" />
      <text class="txt">评论</text>
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
.comment-box {
  display: flex;
  flex-direction: column;
  align-items: center;

  .img {
    width: $uni-img-size-base;
    height: $uni-img-size-base;
    color: $uni-text-color;
  }

  .txt {
    font-size: $uni-font-size-sm;
    color: $uni-text-color;
  }
}
</style>
