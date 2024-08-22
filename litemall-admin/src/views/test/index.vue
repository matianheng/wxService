<template>
  <div>
    <el-button type="primary" @click="toggleSelection">全选/取消全选</el-button>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="150"> </el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>
  
  <script>
function ff() {}
export default {
  data() {
    return {
      tableData: [],
      isSelectAll: false,
      loading: false,
      timeOut: null,
    };
  },
  created() {
    // 模拟数据
    for (let i = 0; i < 1000; i++) {
      this.tableData.push({
        date: "2016-05-07",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      });
    }
  },
  methods: {
    toggleSelection() {
      console.log("让你第一次先执行");
      debugger;
      this.loading = true;
      this.isSelectAll = !this.isSelectAll;
      this.$nextTick(() => {
        if (this.isSelectAll) {
          this.$refs.multipleTable.toggleAllSelection();
        } else {
          this.$refs.multipleTable.clearSelection();
        }
        this.debounce(this.fn(), 1000);
      });
    },
    debounce(fn, time) {
      let _this = this;
      return function () {
        clearTimeout(_this.timeOut);
        _this.timeOut = setTimeout(() => {
          ff.apply(this, args);
        }, time);
      };
    },
    fn() {
      let _this = this;
      setTimeout(function () {
        _this.loading = false;
      }, 1000);
    },
    handleSelectionChange(val) {
      console.log("让你第二次先执行");
      debugger;
      console.log("选中项:", val);
      debugger;
    },
  },
};
</script>
  <style scoped>
.el-table>>>.has-gutter .el-checkbox__input {
    display: none;
}
.el-button {
    top: 30px;
    z-index: 999;
    position: relative;
}
  </style>
  