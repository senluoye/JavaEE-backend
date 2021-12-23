<template>
  <div class="one">
    <div v-if="islogin">
      请先登陆
    </div>
    <div class="two" v-else>
      <el-table
          ref="multipleTable"
          :data="cartList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column width="80">
          <template slot-scope="scope">
            <el-image :src="scope.row.cart_picurl"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" width="300">
          <template slot-scope="scope">
            <div></div>
            <div style="font-weight: bold">
              {{ scope.row.cart_softwarename }}
            </div>
            <div style="color: dodgerblue">
              授权类型：{{ scope.row.cart_period }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <div style=" font-weight: bold; font-size: large">
              {{ scope.row.cart_date }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="客户ID">
          <template slot-scope="scope">
            <div style="font-weight: bold; font-size: large">
              {{ scope.row.client_id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <!-- <el-input-number size="small" v-model="scope.row.cart_count" @change="handleChange(scope.row.cart_id, scope.row.cart_count)" :min="1" :max="99"
                             label="描述文字"></el-input-number> -->
            {{scope.row.cart_count}}
          </template>
        </el-table-column>
        <el-table-column label="总价">
          <template slot-scope="scope">
            <div style="color: red; font-weight: bold; font-size: large">
              ¥ {{ scope.row.cart_count * scope.row.cart_price }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelete(scope.row.cart_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;margin-bottom: 20px">
        <el-row>
<!--          <el-col :span="4">-->
<!--            <el-button type="text">删除选中商品</el-button>-->
<!--          </el-col>-->
          <el-col :span="20">
            <div class="grid-content bg-white"></div>
          </el-col>
          <el-col :span="4">
            <div>
              交易总额: <span style="color: red;font-weight: bold;font-size: large">¥ {{ totalPrice }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px;margin-bottom: 50px">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleChange(cart_id,cart_count) {
      this.$store.dispatch("changeQuantity",{
        id:cart_id,
        count:cart_count
      })
    },
    handleDelete(cart_id){
      this.$store.dispatch("deleteFromCart", cart_id);
      setTimeout(() => {
        this.$store.dispatch("getShoppingCart", 7);
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
    cartList() {
      console.log("12312312391273813")
      console.log(this.$store.state.software.cartList)
      return this.$store.state.software.cartList;
    },
    islogin(){
      return !this.$store.state.software.islogin
    },
    totalPrice() {
      var sum = 0;
      this.cartList.forEach((element) => sum += element.cart_price * element.cart_count)
      return sum;
    }
  },
  mounted() {
    this.$store.dispatch("getShoppingCart", 7);
    console.log("------------------")
    console.log( this.$store.state.software.cartList)
  }
}
</script>

<style scope>
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
