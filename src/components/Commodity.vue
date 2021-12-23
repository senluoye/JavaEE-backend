<template>
  <div class="app">
    <div v-if="islogin">
      请先登录
    </div>
    <div v-else>
      <div class="toutou">
          <el-card shadow="always" class="top">
            <div class="all">
              所有商品
            </div>
          </el-card>
      </div>
      <div class="shangpin">
        <el-row>
          <el-col :span="6" v-for="project in currentPageList" :key="project.software_id">
            <div @click="GoumaiEvent(project.software_id)">
              <el-card class="cards">
                <el-row>
                  <!--                    空白内容，目的只是为了让图片居中-->
                  <el-col :span="8">
                    <div class="grid-content bg-white"></div>
                  </el-col>
                  <el-col :span="8">
                    <el-image style="width: 100px; height: 100px" :src="project.software_picurl"></el-image>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-white"></div>
                  </el-col>
                </el-row>
                <div style="margin-top: 20px">
                  <div class="text">
                    商品id：{{project.software_id}}
                  </div>
                  <div class="name">
                    {{ project.software_name }}
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="block">
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="8"
            :total="softwareList.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPageList:[]
    }
  },
  methods: {
    GoumaiEvent: function (software_id) {
      this.$store.dispatch("getSoftwareDetail",  software_id);
      setTimeout(() => {
        this.$router.push({
          path: '/changedetails'
        })
      },100)
    },
    addComnunity: function(){
        this.$router.push({
          path: '/addcomnunity'
        })
    },
    handleCurrentChange(val) {
      this.currentPageList =  this.softwareList.slice((val-1)*8,val*8);
      console.log(val);
      console.log(this.currentPageList);
    }
  },
  computed: {
    softwareList() {
      this.currentPageList = this.$store.state.software.softwareList.slice(0,8);
      // console.log(this.currentPageList)
      return this.$store.state.software.softwareList;
    },
    islogin(){
      return !this.$store.state.software.islogin
    }
  },
  mounted() {
    this.$store.dispatch("getSoftwares");
  }
}
</script>

<style scoped>
.name{
  margin-top: 10px;
}
.all{
  float: left;
}
.add{
  float: right;
  margin-right: 5vw;
}
.top{
  height: 70px;
}
.app{
  background-color: white;
}
.aa {
  font-size: 13px;
}

.toutou {
  height: 80px;
  width: 83vw;
}

.cards {
  width: 33vh;
  height: 16vw;
  margin-top: 2vh;
  margin-left: 2vw;
  transition: all 0.3s;
}
.cards:hover{
  box-shadow: 4px 10px 10px #888888;
}
.bg-white {
  background: #FFFFFF;
}

.grid-content {
  min-height: 36px;
}
.block{
  float: right;
  margin-right: 10vw;
  margin-top: 3vh;
}

</style>
