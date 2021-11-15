<template>
  <div class="search-result-list">
    <view class="search-result-list-container">
      <empty-data v-if="isEmpty"></empty-data>
      <view v-else>
        <!-- 循环渲染列表数据 -->
        <block v-for="(item, index) in resultList" :key="index">
          <view class="search-result-item-box" @click="onItemClick(item)">
            <!-- 内容区 - 样式 1 -->
            <search-result-item-theme-1
              v-if="!item.pic_list || item.pic_list.length === 0"
              :data="item"
            />

            <!-- 内容区 - 样式 2 -->
            <search-result-item-theme-2 v-else-if="item.pic_list.length === 1" :data="item" />

            <!-- 内容区 - 样式 3 -->
            <search-result-item-theme-3 v-else :data="item" />

            <!-- / -->
          </view>
        </block>
      </view>
    </view>
  </div>
</template>

<script>
import { getSearchResult } from 'api/search';
export default {
  name: 'search-result-list',
  props: {
    // 搜索关键字
    queryStr: {
      type: String,
      required: true
    }
  },
  data: () => ({
    // 数据源
    resultList: [],
    // 页数
    page: 1,
    isEmpty: false
  }),
  created() {
    this.loadSearchResult();
  },
  computed: {},
  methods: {
    /**
     * 获取搜索数据
    */
    async loadSearchResult() {
      const { data: res } = await getSearchResult({
        q: this.queryStr,
        p: this.page
      });
      // 更改返回数据样式（行内样式）
      res.list.forEach((item) => {
        item.title = item.title.replace(/<em>/g, "<em style='color:#f94d2a; margin:0 2px'>");
        item.description = item.description.replace(
          /<em>/g,
          "<em style='color:#f94d2a; margin:0 2px'>"
        );
      });
      this.resultList = res.list;
      // 无数据，显示空数据组件
      if (this.resultList.length === 0) {
        this.isEmpty = true;
      };
      console.log(this.resultList);
    },
    /**
     * item 点击事件
     */
    onItemClick(item) {
      uni.navigateTo({
        url: `/subpkg/pages/blog-detail/blog-detail?author=${item.author}&articleId=${item.id}`
      });
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
.search-result-list-container {
  padding: $uni-spacing-col-lg $uni-spacing-row-lg;
  .search-result-item-box {
    margin-bottom: $uni-spacing-col-big;
  }
}
</style>
