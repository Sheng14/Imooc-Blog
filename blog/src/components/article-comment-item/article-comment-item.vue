<template>
  <div class="article-comment-item">
    <view class="comment-item-container">
      <!-- 头像 -->
      <view class="avatar-box">
        <image class="avatar" :src="data.avatar" />
      </view>
      <!-- 评论信息 -->
      <view class="info-box">
        <!-- 评论人 -->
        <text class="comment-user">{{ data.nickName || data.uname }}</text>
        <!-- 评论内容 -->
        <text class="comment-info">{{ data.content }}</text>
        <!-- 评论时间 -->
        <text class="comment-time">{{ data.postTime | relativeTime }}</text>
      </view>
    </view>
  </div>
</template>

<script>

export default {
  name: 'article-comment-item',
  props: {
    data: {
      type: Object,
      required: true
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

<style lang="scss" scoped>
.comment-item-container {
  padding: $uni-spacing-col-lg 0;
  display: flex;
  .avatar-box {
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid #e5e5e5;
    }
  }
  .info-box {
    margin-left: $uni-spacing-row-sm;
    display: flex;
    flex-direction: column;
    .comment-user {
      font-size: $uni-font-size-sm;
      font-weight: bolder;
      color: $uni-text-color;
    }
    .comment-info {
      margin-top: $uni-spacing-col-sm;
      font-size: $uni-font-size-base;
      color: $uni-text-color;
    }
    .comment-time {
      margin-top: $uni-spacing-col-sm;
      font-size: $uni-font-size-sm;
      color: $uni-text-color-grey;
    }
  }
}
</style>
