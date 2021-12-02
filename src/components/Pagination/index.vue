<!--
 * @description:
 * @Author: changjia
 * @Date: 2021-12-02 21:05:33
 * @LastEditors: changjia
 * @LastEditTime: 2021-12-02 21:53:29
-->
<template>
  <div class="pagination">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total,sizes,prev,pager,next,jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageSize: {
      type: Number,
      // default: null
      default: 20
    },
    page: {
      type: Number,
      default: null
    },
    total: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      currentPage:this.page
    }
  },
  methods: {
    handleSizeChange(row) {
      this.$emit('handleSizeChange',row)
      // console.log(`每页 ${row} 条`);
    },
    handleCurrentChange(row) {
      this.$emit('handleCurrentChange',row)
      // console.log(`当前页：${row}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  position: relative;
  bottom: 0;
  right: 40px;
}
</style>
