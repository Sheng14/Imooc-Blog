<template>
  <div class="hot-ranking">
    <view class="ranking">
      <image class="ranking-bg" :src="getRankingBg" />
      <text class="ranking-text" :class="{ 'text-white': ranking <= 3 }">{{ranking}}</text>
    </view>
  </div>
</template>

<script>

export default {
  name: 'hot-ranking',
  props: {
    ranking: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    getRankingBg() {
      if (this.ranking <= 3) {
        return require(`@/static/rank-${this.ranking}.png`);
      }
      return require('@/static/rank-other.png');
    }
  },
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
.ranking {
  position: relative;
  text-align: center;
  width: 18px;
  height: 20px;
  .ranking-bg {
    width: 100%;
    height: 100%;
  }
  .ranking-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-55%, -55%);
    font-size: $uni-font-size-sm;
    font-weight: bold;
    color: $uni-text-color;
  }
  .text-white {
    color: white;
  }
}
</style>
