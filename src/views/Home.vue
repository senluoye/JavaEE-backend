<template>
  <div id="app">
    <!-- 导航 -->
    <div class="title">
      <div class="titleleft">
        <i class="el-icon-s-unfold"></i>
        商品信息管理系统
      </div>
      <div class="titleright">
        <el-button plain class="home-button" @click="goLogin" v-if="!isLogin">
          登陆
        </el-button>
        <p v-if="isLogin" class="self" @click="goself">
          {{ name }}
        </p>
        <el-button
          plain
          class="home-button"
          @click="goRegister"
          v-if="!isLogin"
        >
          注册
        </el-button>
      </div>
    </div>
    <div class="daohanglan">
      <div class="daohanglan1">
        <el-menu
          :default-active="this.$route.path"
          router
          mode="horizontal"
          class="el-menu-vertical-demo you"
          @open="handleOpen"
          @close="handleClose"
          background-color="#2B2E3B"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            v-for="(item, i) in navList"
            :key="i"
            :index="item.name"
            class="item"
          >
            <template slot="title">
              <div class="text">
                <i class="el-icon-s-platform"></i>
                <span> {{ item.navItem }}</span>
              </div>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
      <router-view class="menu-right" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      input2: "",
      navList: [
        { name: "/shouye", navItem: "首页" },
        { name: "/commodity", navItem: "商品管理" },
        { name: "/add", navItem: "增加商品" },
        { name: "/self", navItem: "商家信息" },
      ],
    };
  },
  methods: {
    goLogin: function() {
      this.$router.push({
        path: "/login",
      });
    },
    goRegister: function() {
      this.$router.push({
        path: "/register",
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    gouevent: function() {
      this.$router.push({
        path: "/gouwuche",
      });
    },
    goself: function() {
      this.$router.push({
        path: "/self",
      });
    },
  },

  mounted: function() {
    console.log(this);
  },
  computed: {
    isLogin() {
      if (localStorage.getItem("token") != null) {
        this.$store.state.software.token = localStorage.getItem("token");
        return true;
      }
      return false;
    },
    name() {
      if (localStorage.getItem("name") != null) {
        this.$store.state.software.name = localStorage.getItem("name");
        return localStorage.getItem("name");
      }
      return "";
    },
  },
};
</script>

<style scoped>
.titleright {
  float: left;
  margin-top: 0.6%;
  margin-left: 65vw;
  position: absolute;
}
.titleleft {
  float: left;
  font-size: 24px;
  margin-left: 3vw;
  margin-top: 2.1vh;
}
.title {
  width: 84.9vw;
  height: 60px;
  float: left;
  margin-left: 15vw;
  background-color: #2b2e3bc2;
  color: white;
  position: relative;
}

.menu-right {
  width: 85vw;
  height: 93vh;
  margin-top: 10vh;
  margin-left: 15vw;
}
.item {
  width: 15vw;
}
.img {
  width: 5vw;
  margin-left: 4.7vw;
  margin-top: 2vh;
  margin-bottom: 2vh;
}
.imgfather {
  background-color: #2b2e3b;
  margin: 0 auto;
}
.text {
  margin-left: 2vw;
}

.daohanglan {
  height: 100vh;
  width: 15vw;
  float: left;
  background-color: #2b2e3b;
  margin-top: -60px;
}
.daohanglan1 {
  width: 15vw;
  float: left;
  margin: 0 auto;
  margin-top: 40px;
  /* margin-top: 10vh; */
}
.you {
  margin-top: 20px;
}
.home-button {
  border: none;
  background-color: #2b2e3b;
  color: white;
}
.home-sousuo {
  width: 520px;
  float: left;
  margin-left: 300px;
}
.home-input {
  width: 400px;
  margin-top: 20px;
}
.gouwuche {
  float: right;
  margin-top: 20px;
}

.shangzuoyi {
  font-size: 18px;
}
</style>
