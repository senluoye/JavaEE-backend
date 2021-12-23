<template>
  <div class="app">
    <div class="three">
      <div class="introduce">
        <div class="thzuo">
          <el-image style="width: 200px; height: 200px" :src="softwareDetail.software_picurl"></el-image>
        </div>
        <div class="thyou">
          <div v-if="!ischange">
            <div class="aa">
              {{ softwareDetail.software_name }}
            </div>
            <div class="bb">
              <div class="bbbb">
                价格：
              </div>
              <div class="bbb">
                {{ this.currentPrice }}
              </div>
            </div>
            <div class="cc">
              <el-card shadow="never">
                授权发送：<i class="el-icon-check"></i>订单支付完成 10 分钟内，即可在个人订单中心查看授权码
              </el-card>
            </div>
            <div>
              <div class="dd">
                授权类型: {{ this.currentPeriod }}
              </div>
              <div>
                <span v-for="price in priceList" :key="price.price_id" class="ddd">
                <el-button plain @click="handleChangePrice(price.price_id)">
                  {{ price.price_period }}
                </el-button>
                </span>
              </div>
            </div>
          </div>
          <div class="change" v-else>
            <el-form ref="conmunity" :model="conmunity" label-width="80px">
              <el-form-item label="商品名称">
                <el-input v-model="conmunity.name"></el-input>
              </el-form-item>
              <!-- <el-form-item label="套餐类型">
                <el-select v-model="conmunity.region" placeholder="请选择活动区域">
                    <el-option label=price.price_id value=price.price_id v-for="price in priceList" :key="price.price_id"></el-option>
                </el-select>
              </el-form-item> -->

              <el-form-item label="商品价格">
                <el-input v-model="conmunity.price"></el-input>
              </el-form-item>

            </el-form>
          </div>
        </div>
      </div>
      

      <!-- <div>
        {{ softwareDetail.software_introduce }}
      </div> -->
    </div>
    <div class="button">
      <el-button @click="deleteCommunity" type="primary" v-if="!ischange">删除商品</el-button>
      <el-button @click="handleChange" type="primary" v-if="!ischange">点击修改</el-button>
      <el-button @click="handfinishchange" type="primary" v-else>确认修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ischange:false,
      currentPrice: 0,
      currentPeriod: '',
      conmunity: {
          id: 0,
          name: '',
          price: 0,
        }
    }
  },
  methods: {
    deleteCommunity(){
      console.log("商品ID")
      console.log(this.$store.state.software.softwareDetail.software_id)
        this.$store.dispatch("deleteCommunity", this.$store.state.software.softwareDetail.software_id);
        this.$alert('删除成功', '', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
    },
    GoumaiEvent(){
        this.$router.push({
          path:'/goumai'
        })
    },
    onSubmit() {
      console.log('submit!');
    },
    handleChangePrice(price_id) {
      let price = this.priceList.find((element) => element.price_id === price_id);
      this.currentPeriod = price.price_period;
      this.currentPrice = price.price_discount;
    },
    handleChange() {
      this.ischange = true;
    },
    handfinishchange(){
      this.$store.dispatch("changeDetails", {
        softwareid: this.$store.state.software.softwareDetail.software_id,
        priceid: this.$store.state.software.priceList[0].price_id,
        softwarename: this.conmunity.name,
        softwareprice: this.conmunity.price,
      });
      console.log(this.$store.state.software.softwareDetail)
      this.ischange = false
    }
  },
  computed: {
    softwareDetail() {
      return this.$store.state.software.softwareDetail;
    },
    priceList() {
      //加载默认价格（一般为最低价）
      return this.$store.state.software.priceList;
    }
  },
  mounted() {
    this.currentPrice = this.$store.state.software.priceList[0].price_discount;
    this.currentPeriod = this.$store.state.software.priceList[0].price_period;
    console.log(this.$store.state.software)
  }

}
</script>

<style scoped>
.thyou {
  float: right;
  width: 50vw;
  height: 40vh;
  margin-right: 5vw;
}
.change{
  width: 34vw;
  height: 60vh;
  margin-left: -1vw;
  margin-top: 5vh;
  /* background-color: aqua; */
}
.button{
  margin-top: 5vh;
  float: right;
  margin-right: 10vw;
}
.introduce{
  height: 50vh;
}

.app{
  background-color: white;
}
.two {
  width: 100%;
}
.three {
  width: 100%;
  height: 500px;
}

.thzuo {
  width: 20vw;
  float: left;
  margin-left: 8vw;
  margin-top: 6vh;
}

.aa {
  width: 100%;
  height: 27px;
  font-size: 27px;
  margin-bottom: 30px;
}

.bb {
  width: 100%;
  height: 30px;
  margin-bottom: 30px;
}

.bbb {
  font-size: 30px;
  color: red;
  float: left;
}

.bbbb {
  margin-right: 20px;
  float: left;
  font-size: 20px;
}
.cc{
  margin-bottom: 30px;
}
.dd{
  margin-bottom: 30px;
}
.ddd{
  margin-right: 20px;
}

</style>
