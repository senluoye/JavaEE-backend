<template>
  <div class="one">
    <div class="three">
      <div class="thzuo">
        <el-image style="width: 200px; height: 200px" :src="softwareDetail.software_picurl"></el-image>
      </div>
      <div class="thyou">
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
        <div class="ee">
          <el-button @click="handleAddToCart" type="primary">加入订单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPrice: 0,
      currentPeriod: ''
    }
  },
  methods: {
    //选择授权类型，并改变价格
    handleChangePrice(price_id) {
      let price = this.priceList.find((element) => element.price_id === price_id);
      this.currentPeriod = price.price_period;
      this.currentPrice = price.price_discount;
    },
    handleAddToCart() {
        this.$store.dispatch("addToCart", {
        client_id: 1,
        cart_software: this.softwareDetail.software_id,
        cart_softwarename: this.softwareDetail.software_name,
        cart_price: this.currentPrice,
        cart_count: 1,
        cart_period: this.currentPeriod,
        cart_picurl: this.softwareDetail.software_picurl});
      this.$alert('已成功添加订单', '提示', {
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
    softwareDetail() {
      return this.$store.state.software.softwareDetail;
    },
    priceList() {
      return this.$store.state.software.priceList;
    }
  },
  mounted() {
    this.currentPrice = this.$store.state.software.priceList[0].price_discount;
    this.currentPeriod = this.$store.state.software.priceList[0].price_period;
  }

}
</script>

<style scoped>
.two {
  width: 100%;
}

.three {
  width: 100%;
  height: 500px;
}

.thzuo {
  float: left;
  text-align: center;
  margin-top: 100px;
  margin-left: 8vw;
}

.thyou {
  float: right;
  width: 632px;
  height: 375px;
  margin-right: 18vw;
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
.ee{
  margin-top: 30px;
  float: right;
  margin-right: 60px;
}
</style>
