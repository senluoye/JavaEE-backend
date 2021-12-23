<template>
  <div class="one">
    <div v-if="islogin">
      请先登陆
    </div>
    <div class="two" v-else>
      <el-table
          ref="multipleTable"
          :data="clientList"
          tooltip-effect="dark"
          style="width: 100%"
          v-if="!isAdd"
          @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="客户ID" width="300">
          <template slot-scope="scope">
            <div></div>
            <div style="font-weight: bold">
              {{ scope.row.client_id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="客户名称">
          <template slot-scope="scope">
            <div style="font-weight: bold; font-size: large">
              {{ scope.row.client_name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="联系方式">
          <template slot-scope="scope">
            <div style="font-weight: bold; font-size: large">
              {{ scope.row.client_phone }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelete(scope.row.client_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="tianjia">
        <el-button type="primary" @click="addclient">添加客户</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      isAdd:false,
    }
  },
  methods: {
    addclient(){
      this.$alert('添加成功', '', {
              confirmButtonText: '前往登陆',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleChange(cart_id,cart_count) {
      this.$store.dispatch("changeQuantity",{
        id:cart_id,
        count:cart_count
      })
    },
    handleDelete(client_id){
      this.$store.dispatch("deleteFromClient", client_id);
      setTimeout(() => {
        this.$store.dispatch("getClient");
      });
      this.$alert('删除成功', '', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    }
  },
  computed: {
    clientList() {
      console.log(this.$store.state.software.clientList)
      return this.$store.state.software.clientList;
    },
    islogin(){
      return !this.$store.state.software.islogin
    },

  },
  mounted() {
    this.$store.dispatch("getClient");
  }
}
</script>

<style scope>
.tianjia{
  float: right;
  margin-right: 10vw;
  margin-top: 5vh;
}
.one {
  width: 100%;
  background-color: white;
}

.bg-white {
  background: #FFFFFF;
}

.grid-content {
  min-height: 36px;
}
</style>
