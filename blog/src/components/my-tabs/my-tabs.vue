<template>
  <div class="my-tabs">
    <view class="tab-container" style="position: -webkit-sticky; position: sticky; top: 0px; z-index: 99;">
      <view class="tab-box">
        <scroll-view :scroll-left="scrollLeft" id="_scroll" scroll-x class="scroll-view" scroll-with-animation>
          <view class="scroll-content">
            <view class="tab-item-box" id="tabs">
              <block v-for="(item, index) in tabData" :key="index">
                <view class="tab-item" :class="{ 'tab-item-active': activeIndex === index }" @click="tabClick(index)">{{ item.label || item }}</view>
              </block>
            </view>
          </view>
        </scroll-view>
      <!-- 滑块 -->
      <view
        class="underLine"
        :style="{
                transform: 'translateX(' + slider.left + 'px)'
                }"
      />        
      </view>
    </view>
  </div>
</template>

<script>

export default {
  name: 'my-tabs',
  props: {
    // 父组件传入的 tabs 数据
    tabData: {
      type: Array,
      default: () => []
    },
    // 默认激活项
    defaultIndex: {
      type: Number,
      default: 0
    },
    // 配置对象
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data: () => {
    return {
      activeIndex: -1, //  当前激活项的 index
      // 滑块
      slider: {
        // 距离左侧的距离
        left: 15
      },
      // 默认配置
      defaultConfig: {
        // 下划线宽度 px
        underLineWidth: 24,
        // 下划线高度 px
        underLineHeight: 2,
        // 下划线颜色
        underLineColor: '#f94d2a'
      },
      // 内部维护的数据对象，为每个 item 单独额外维护一个 slider 的滑块对象
      tabList: [],
      // scrollView 的横向滚动条位置
      scrollLeft: 0
    }
  },
  computed: {},
  methods: {
        /**
     * tab 的点击事件处理
     */
    tabClick(index) {
      this.activeIndex = index; // 修改正在被点击者的索引并展示颜色
      // 发送通知
      this.$emit('tabClick', index);
      if (this.tabList.length === 0) this.getTabList(); // 如果没有拿到tab们就拿一下
      if (this.activeIndex === 0) {
        this.slider.left = 15;
      } else {
        this.slider.left = this.tabList[this.activeIndex].left + this.tabList[this.activeIndex].width / 3;
        console.log(this.slider.left);
      }
    //  this.scrollLeft = this.tabList[this.activeIndex].left; 让滚动条也滚动
    },
    getTabList() {
    // 获取 dom 的固定写法(注意不是通过ref的方式获取DOM);
    const query = uni.createSelectorQuery().in(this);
    query.selectAll('.tab-item').boundingClientRect(data => {// 拿到所有tab信息
      this.tabList = data;
      console.log(this.tabList);
    }).exec();
   /* query.select('#tabs').boundingClientRect(data => {
      console.log("得到布局位置信息" + JSON.stringify(data));
      console.log("节点离页面顶部的距离为" + data.top);
      console.log(data);
    }).exec();*/
    }
  },
  watch: {
        // 监听激活项目的变化
        defaultIndex: {
          handler(val) {
            this.activeIndex = val;
            this.tabClick(val); // 让滑块与scroll-view同步
          },
          // 该回调将会在侦听开始之后被立即调用
          immediate: true
        },
        // 侦听数据项的变化
      /*  tabData: {
          handler(val) {
            this.tabList = val;
            setTimeout(() => {
              this.updateTabWidth();
            }, 0);
          },
          // 该回调将会在侦听开始之后被立即调用
          immediate: true
        }      */        
  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {
  },
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
.tab-container {
  font-size: $uni-font-size-base;
  height: 45px;
  line-height: 45px;
  background-color: $uni-bg-color;
  .tab-box {
    width: 100%;
    height: 45px;
    display: flex;
    position: relative;
    .scroll-view {
      white-space: nowrap;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .scroll-content {
        width: 100%;
        height: 100%;
        position: relative;

        .tab-item-box {
          height: 100%;
          .tab-item {
            height: 100%;
            display: inline-block;
            text-align: center;
            padding: 0 15px;
            position: relative;
            text-align: center;
            color: $uni-text-color;
            &-active {
              color: $uni-text-color-hot;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .underLine {
    height: 2px;
    width: 25px;
    background-color: #f01414;
    border-radius: 3px;
    transition: 0.5s;
    position: absolute;
    bottom: 0;
  }
}
</style>
