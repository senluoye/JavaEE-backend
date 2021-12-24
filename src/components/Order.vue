<template>
  <div class="one">
    <div v-if="!islogin">
      请先登陆
    </div>
    <div class="two" v-else>
      <el-form ref="form" :model="form">
        <el-form-item label="商品名称" class="item">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" class="item">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="价格" class="item">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="数量" class="item">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <el-upload
          class="upload-demo item"
          ref="upload"
          :auto-upload="false"
          action=""
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <!-- <input id="file" type="file" multiple name="file" /> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">点击创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top: 20px;margin-bottom: 50px"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      form: {
        name: "",
        description: "",
        price: "",
        num: "",
        id: "",
      },
    };
  },
  methods: {
    onSubmit() {
      let data = new FormData();
      let file = this.$refs.upload.uploadFiles[0].raw;
      let commoditytemp = {
        name: this.form.name,
        description: this.form.description,
        price: this.form.price,
        num: this.form.num,
        creatorId: localStorage.getItem("id"),
      };
      let commodity = JSON.stringify(commoditytemp);
      data.append("file", file);
      data.append("commodity", commodity);
      this.$store.dispatch("addGoods", data);
    },
  },
  computed: {
    cartList() {
      return this.$store.state.software.cartList;
    },
    islogin() {
      if (localStorage.getItem("token") != null) {
        this.$store.state.software.token = localStorage.getItem("token");
        return true;
      }
      return false;
    },
    totalPrice() {
      var sum = 0;
      this.cartList.forEach(
        (element) => (sum += element.cart_price * element.cart_count)
      );
      return sum;
    },
  },
  mounted() {},
};
</script>

<style scope>
.one {
  width: 100%;
  background-color: white;
  margin-top: 200px;
}
.two {
  width: 50vw;
  margin: 0 auto;
}
.bg-white {
  background: #ffffff;
}
.item {
  height: 70px;
}
.grid-content {
  min-height: 36px;
}
.upload {
  margin-top: 20px;
}
</style>
