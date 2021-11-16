<template>
    <page-meta root-font-size="52px">
      <view class="detail-container">
        <!-- 文章内容区域 -->
        <block v-if="articleData">
          <!-- 标题 -->
          <view class="title">{{ articleData.articleTitle }}</view>
          <view class="detail-info">
            <view class="detail-left">
              <view class="avatar-box">
                <!-- 头像 -->
                <image class="avatar" :src="articleData.avatar"></image>
              </view>
              <view class="author-box">
                <!-- 作者 -->
                <text class="author">{{ articleData.nickName }}</text>
                <!-- 发布时间 -->
                <text class="release-time">{{ articleData.date }}</text>
              </view>
            </view>
            <view class="detail-right">
              <!-- 关注按钮 -->
              <button class="follow" size="mini">关注</button>
            </view>
          </view>
          <!-- 文章内容 <rich-text :nodes="articleData.content"></rich-text> -->        
          <mp-html class="markdown_views" :content="addClassFromHTML(articleData.content)" scroll-table />
          <!-- 评论列表 -->
          <view class="comment-box">
            <article-comment-list :articleId="articleId" />
          </view>
        </block>
        <!-- 底部功能区 -->
        <article-operate />
      </view>
    </page-meta> 
</template>

<script>
// 导入解析富文本组件
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html';
import { getArticleDetail } from 'api/article';
export default {
  components: {
    mpHtml
  },
  data: () => ({
    // 作者名
    author: '',
    // 文章 ID
    articleId: '',
    // 文章详情数据
    articleData: null
  }),
  computed: {},
  methods: {
    /**
     * 为所有的 DOM 增加类名
     */
    addClassFromHTML(info) {
      // 先替换 blockquote
      return info
        .replace(/<p>/gi, '<p class="p-cls">')
        .replace(/<a>/gi, '<a class="a-cls">')
        .replace(/<h1>/gi, '<h1 class="h1-cls">')
        .replace(/<h2>/gi, '<h2 class="h2-cls">')
        .replace(/<h3>/gi, '<h3 class="h3-cls">')
        .replace(/<h4>/gi, '<h4 class="h4-cls">')
        .replace(/<h5>/gi, '<h5 class="h5-cls">')
        .replace(/<h6>/gi, '<h6 class="h6-cls">')
        .replace(/<ul>/gi, '<ul class="ul-cls">')
        .replace(/<li>/gi, '<li class="li-cls">')
        .replace(/<ol>/gi, '<ol class="ol-cls">')
        .replace(/<td>/gi, '<td class="td-cls">')
        .replace(/<th>/gi, '<th class="th-cls">')
        .replace(/<tr>/gi, '<tr class="tr-cls">')
        .replace(/<dl>/gi, '<dl class="dl-cls">')
        .replace(/<dd>/gi, '<dd class="dd-cls">')
        .replace(/<hr>/gi, '<hr class="hr-cls">')
        .replace(/<pre>/gi, '<pre class="pre-cls">')
        .replace(/<strong>/gi, '<strong class="strong-cls">')
        .replace(/<input>/gi, '<input class="input-cls">')
        .replace(/<table>/gi, '<table class="table-cls">')
        .replace(/<details>/gi, '<details class="details-cls">')
        .replace(/<code>/gi, '<code class="code-cls">')
        .replace(/<kbd>/gi, '<kbd class="kbd-cls">')
        .replace(/<summary>/gi, '<summary class="summary-cls">')
        .replace(/<blockquote>/gi, '<blockquote class="blockquote-cls">')
        .replace(/<img/gi, '<img class="img-cls"');
    },
    /**
     * 获取文章详情数据
     */
    async loadArticleDetail() {
      // 展示加载框
      uni.showLoading({
        title: '加载中'
      });
      const { data: res } = await getArticleDetail({
        author: this.author,
        articleId: this.articleId
      });
      this.articleData = res.data;
      console.log(this.articleData);
      uni.hideLoading();
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.author = options.author;
    this.articleId = options.articleId;
    this.loadArticleDetail();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss">
@import '~@/styles/article-detail.scss';
.detail-container {
  padding: $uni-spacing-col-base $uni-spacing-row-base;
  margin-bottom: 70px;
  .title {
    font-size: $uni-font-size-title;
    color: $uni-text-color-title;
    font-weight: bold;
  }
  .detail-info {
    padding: $uni-spacing-col-base 0;
    display: flex;
    justify-content: space-between;

    .detail-left {
      display: flex;
      .avatar-box {
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #e5e5e5;
        }
      }
      .author-box {
        margin-left: $uni-spacing-row-base;
        display: flex;
        flex-direction: column;
        .author {
          font-size: $uni-font-size-base;
          font-weight: bolder;
          color: $uni-color-title;
        }
        .release-time {
          font-size: $uni-font-size-sm;
          color: $uni-text-color-grey;
        }
      }
    }

    .detail-right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
