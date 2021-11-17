<template>
  <div class="article-operate">
    <view class="operate-container">
      <!-- 输入框 -->
      <view class="comment-box" @click="onCommitClick">
        <my-search isShowInput='true' placeholderText="评论一句，前排打call..." @input="record"></my-search>
      </view>
      <!-- 评论 -->
      <view class="options-box"  @click="onBtnClick">
        <article-comment />
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
let inputVal = '';
import { mapActions } from 'vuex';
import { userArticleComment } from 'api/user';
export default {
  name: 'article-operate',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  methods: {
    ...mapActions('user', ['isLogin']),
    /**
     * my-search 的点击事件
     */
    async onCommitClick() {
      // 进行登录判定，登录之后允许发布评论
      if (!(await this.isLogin())) {
        return;
      }
      this.$emit('commitClick');
    },
    record(val) { // 记录输入框的值
      inputVal = val;
    },
    /**
     * 发送按钮点击事件
     */
    async onBtnClick() {
      if (inputVal === '') return;
      // 展示加载框
      uni.showLoading({
        title: '加载中'
      });
      // 异步处理即可
      const { data: res } = await userArticleComment({
        articleId: this.articleId,
        content: inputVal
      });
      uni.showToast({
        title: '发表成功',
        icon: 'success',
        mask: true
      });
      // 发表成功之后的回调
      this.$emit('success', res);
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