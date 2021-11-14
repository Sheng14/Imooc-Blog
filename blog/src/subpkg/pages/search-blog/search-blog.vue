<template>
  <view class="search-blog-container">
    <!-- search模块 -->
    <view class="search-bar-box">
      <my-search 
        :placeholderText="defaultText"
        v-model="searchVal"
        :isShowInput="true"
        :config="{
          backgroundColor: '#f1f0f3'
        }"
        @search="onSearchConfirm"
        @focus="onSearchFocus"
        @blur="onSearchBlur"
        @clear="onSearchClear"
        @cancel="onSearchCancel"
      />
    </view>
    <!-- 热搜列表 -->
    <view class="search-hot-list-box card" v-if="showType === HOT_LIST">
      <!-- 列表 -->
      <search-hot-list @onSearch="onSearchConfirm"/>
    </view>
    <!-- 搜索历史 -->
    <view class="search-history-box"  v-else-if="showType === SEARCH_HISTORY">
      <search-history :searchData="searchData" @removeAllSearchData="onRemoveAllSearchData" @removeSearchData="onRemoveSearchData"
        @onItemClick="onSearchConfirm"/>
    </view>
    <!-- 搜索结果 -->
    <view class="search-result-box" v-else>
      <search-result-list />
    </view>
  </view>
</template>

<script>
import { getDefaultText } from 'api/search';
// 0: 热搜列表 - 默认
const HOT_LIST = '0';
// 1：搜索历史
const SEARCH_HISTORY = '1';
// 2：搜索结果
const SEARCH_RESULT = '2';
export default {
  props: {},
  data: () => ({
    // 绑定输入框中的内容
    searchVal: '',
    // 默认的placeholderText
    defaultText: '默认的placeholderText',
    HOT_LIST,
    SEARCH_HISTORY,
    SEARCH_RESULT,
    // 默认情况下 || 点击输入框的取消按钮时，显示【热搜列表】
    // 当 searchBar 获取焦点时 || 点击输入框清空按钮时，显示 【搜索历史】
    // 用户点击热搜列表 item || 用户点击搜索历史 || 用户按下搜索键，显示 【搜索结果】
    showType: HOT_LIST,
    // 搜索历史数据
    searchData: []
  }),
  computed: {},
  created() {
    this.loadDefaultText();
  },
  methods: {
    /**
     * 搜索内容
     */
    onSearchConfirm(val) {
      // 用户未输入文本，直接搜索时，使用【推荐搜索文本】
      this.searchVal = val ? val : this.defaultText;
      // 保存搜索历史数据
      this.saveSearchData();
      if (this.searchVal) {
        this.showType = SEARCH_RESULT;
      }
    },
    /**
     * 保存搜索历史数据
     */
    saveSearchData() {
      // 1. 如果数据已存在，则删除
      const index = this.searchData.findIndex((item) => item === this.searchVal);
      if (index !== -1) {
        this.searchData.splice(index, 1);
      }
      // 2. 新的搜索内容需要先于旧的搜索内容展示
      this.searchData.unshift(this.searchVal);
    },
    /**
     * 删除数据
     */
    onRemoveSearchData(index) {
      this.searchData.splice(index, 1);
    },
    onRemoveAllSearchData() {
      this.searchData = [];
    },    
    // searchbar 获取焦点
    onSearchFocus(val) {
      this.showType = SEARCH_HISTORY;
    },
    /**
     * searchbar 失去焦点
     */
    onSearchBlur(val) {
      console.log('searchbar 失去焦点');
    },
    /**
     * searchbar 清空内容
     */
    onSearchClear() {
      this.showType = SEARCH_HISTORY;
    },
    /**
     * searchbar 取消按钮
     */
    onSearchCancel(val) {
      this.showType = HOT_LIST;
    },
    /**
     * 获取推荐搜索文本
     */
    async loadDefaultText() {
      const { data: res } = await getDefaultText();
      this.defaultText = res.defaultText;
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
.search-blog-container {
  .search-bar-box {
    background-color: $uni-bg-color;
    padding: $uni-spacing-row-sm;
    position: sticky;
    top: 0px;
    z-index: 9;
    .card {
      border: 1px solid #f9f9f9;
      border-radius: 5px;
      margin: 12px;
      padding: 12px;
      box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
    }
  }
}
</style>
