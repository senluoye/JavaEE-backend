<template>
  <div class="app">
    <div v-if="islogin">
      <div class="ma"></div>
      <h1 class="ni">欢迎您      {{username}}</h1>
    </div>
    <div v-else class="nologin">
      请先登陆
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getNumberList:[],
    }
  },
  methods: {
  },
  computed: {
    islogin(){
      return this.$store.state.software.islogin;
    },
    username(){
      return this.$store.state.software.user.username;
    }
  },
  mounted() {
    // this.$store.dispatch("getNumber");
  }
}
</script>

<style scoped>
.ma{
  height: 30vh;
}
.ni{
  text-align: center;
}
.app{
  background-color: white;
}
.show{
  width: 18vw;
  height: 38vh;
  background-color: aqua;
  float: left;
  margin-left: 6vw;
  margin-top: 5vh;
  
}
.card{
  width: 100%;
  height: 100%;
}
/* .show:hover{

} */
.nologin{
  text-align: center;
}
</style>

