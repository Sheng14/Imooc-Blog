<template>
  <div class="article-comment-list">
    <!-- 精简评论 -->
    <view class="comment-limt-container" v-if="!isShowAllComment">
      <view class="comment-title">精简评论</view>
      <block v-for="(item, index) in commentList.slice(0, 2)" :key="index">
        <!-- item 项组件 -->
        <article-comment-item :data="item.info" />
      </block>
      <!-- 查看更多 -->
      <view class="show-more" @click="onAllClick">查看更多评论</view>
    </view>
    <!-- 全部评论 -->
    <view class="comment-all-container" v-else>
      <view class="comment-title">全部评论</view>
      <block v-for="(item, index) in commentList" :key="index">
        <!-- item 项组件 -->
        <article-comment-item :data="item.info"></article-comment-item>
      </block>
      <view class="show-more" @click="onMoreClick" v-if="isShowMore">查看更多评论</view>
      <view class="show-more" v-if="!isShowMore">----我也是有底线的----</view>
    </view>
  </div>
</template>

<script>
import { getArticleCommentList } from 'api/article';
export default {
  name: 'article-comment-list',
  props: {
    // 文章 ID
    articleId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    // 当前页数
    page: 1,
    // 每页评论数
    pageSize: 5,
    // 评论列表
    commentList: [],
    // 是否展示全部评论
    isShowAllComment: false,
    isShowMore: true, // 是否显示加载更多
    countAll: 5 // 评论总数
  }),
  computed: {},
  methods: {
    /**
     * 获取评论列表
     */
    async loadCommentList() {
      const { data: res } = await getArticleCommentList({
        articleId: this.articleId,
        page: this.page,
        size: this.pageSize
      });
      if (this.page === 1) {
        this.commentList = res.list;
      } else {
        this.commentList = [...this.commentList, ...res.list];
      }
      this.page++;
      this.countAll = res.count;
    },
    /**
     * 查看全部评论的点击事件
     */
    onAllClick() {
      this.isShowAllComment = true;
    },
    /**
     * 查看更多评论的点击事件
     */
    onMoreClick() {
      if (this.commentList.length < this.countAll) {
        this.loadCommentList();
      } else {
        this.isShowMore = false;
      }
    },
    /**
     * 为 comment 增加一个评论
     */
    addCommentList(data) {
      this.commentList.unshift(data);
    }    
  },
  watch: {},
  created() {
    this.loadCommentList();
  },
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
.comment-title {
  font-weight: bold;
  color: $uni-text-color-title;
  font-size: $uni-font-size-lg;
  margin: $uni-spacing-col-lg 0;
}
.comment-limt-container {
  .show-more {
    margin: $uni-spacing-col-lg;
    text-align: center;
    color: $uni-text-color-more;
    font-size: $uni-font-size-base;
  }
}
.comment-all-container {
  .show-more {
    margin: $uni-spacing-col-lg;
    text-align: center;
    color: $uni-text-color-more;
    font-size: $uni-font-size-base;
  }
}
</style>