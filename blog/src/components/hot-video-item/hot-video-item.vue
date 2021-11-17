<template>
  <div class="hot-video-item">
    <view class="hot-video-item-container">
      <view class="video-box">
        <video id="myVideo" class="video" :src="data.play_url" enable-danmu danmu-btn controls />
      </view>
      <view @click="$emit('click', data)">
        <hot-video-info :data="data" />
      </view>
    </view>
  </div>
</template>

<script>

export default {
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
.hot-video-item-container {
  margin-bottom: $uni-spacing-col-lg;
  position: relative;
  .video {
    width: 100%;
    height: 230px;
  }
}
</style>
