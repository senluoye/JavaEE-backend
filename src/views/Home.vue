<template>
    <div id="app">
        <!-- <el-row> -->
            <!-- <el-col :span="24"> -->
                <!-- <div class="grid-content bg-purple-dark">

                </div> -->

            <!-- </el-col> -->
        <!-- </el-row> -->

        <!-- <div class="top-two">
            <div class="gouwuche">
                <el-button plain @click="gouevent">我的购物车</el-button>
            </div>
        </div> -->

<!-- 导航 -->
        <div class="title">
                <div class="titleleft">
                    <i class="el-icon-s-unfold"></i>
                    商品信息管理系统
                </div>

                <div class="titleright">
                    <el-button
                        plain
                        class="home-button"
                        @click="goLogin"
                        v-if="!isLogin">
                            登陆
                    </el-button>
                    <p v-if="isLogin" class="self" @click="goself">
                        {{this.$store.state.software.user.username}}
                    </p>
                    <el-button
                        plain
                        class="home-button"
                        @click="goRegister"
                        v-if="!isLogin">
                            注册 
                    </el-button>
                </div>
        </div>
        <div class="daohanglan">
            <div class="imgfather">
                <img src="./1.png" alt="" class="img">
            </div>
            <div class="daohanglan1">
                <el-menu
                    :default-active="this.$route.path" 
                    router mode="horizontal"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#2B2E3B"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" class="item">
                        <template slot="title">
                            <div class="text">
                                <i class="el-icon-s-platform"></i>
                                <span > {{ item.navItem }}</span>
                            </div>
                        </template>
                    </el-menu-item>
                </el-menu>
            </div>
            <router-view class="menu-right"/>
        </div>

    </div>
</template>

<script>
import lunbotu from '../components/lunbotu'
export default {
    name: 'Home',
    data(){
        return {
            input2:'',
            navList:[
            {name:'/shouye',navItem:'首页'},
            {name:'/client',navItem:'客户'},
            {name:'/commodity',navItem:'商品信息'},
            {name:'/order',navItem:'订单信息'},
            {name:'/self',navItem:'管理员信息'},
            ],
            imgs:[
                {
                    index:0,
                    src: "https://static.easyicon.net/preview/116/1164797.gif"

                },
                {
                    index:1,
                    src: "https://static.easyicon.net/preview/116/1164771.gif"

                },
                {
                    index:2,
                    src: "https://static.easyicon.net/preview/116/1164783.gif"

                },
                {
                    index:3,
                    src: "https://static.easyicon.net/preview/116/1164661.gif"

                }
            ]

        }
    },
    methods:{
        goLogin:function(){
            this.$router.push({
                path:'/login'
            })
        },
        goRegister:function(){
            this.$router.push({
                path:'/register'
            })
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        gouevent:function(){
            this.$router.push({
                path:'/gouwuche'
            })
        },
        goself:function(){
            this.$router.push({
                path:'/self'
            })
        }
    },
    components:{
        'v-lunbotu':lunbotu
    },
    mounted:function(){
        console.log(this)
    },
    computed:{
        isLogin(){
            return this.$store.state.software.islogin
        }
    }
}
</script>

<style scoped>
.titleright{
    float:left;
    margin-top: 0.6%;
    margin-left: 65vw;
    position: absolute;
    /* height: 7vh%; */
}
.titleleft{
    float: left;
    font-size: 24px;
    margin-left: 3vw;
    margin-top: 2.1vh;
}
.title{
    width: 83.9vw;
    height: 7vh;
    max-height: 100px;
    float: right;
    background-color: #2b2e3bc2;
    color: white;
    position: relative;
    border-bottom-right-radius: ;
}

.menu-right{
    width: 85vw;
    height: 93vh;
    margin-top: -5vh;
    margin-left: 15vw;
}
.item{
    width: 15vw;
}
.img{
    width: 5vw;
    margin-left: 4.7vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
}
.imgfather{
    background-color: #2B2E3B;
    margin: 0 auto;
}
.text{
    margin-left: 2vw;
}

.daohanglan{
    height: 100vh;
    width: 15vw;
    float: left;
    background-color: #2B2E3B;
}
.daohanglan1{
    width: 15vw;
    height: 40vh;
    float: left;
    margin:0 auto;
    /* margin-top: 10vh; */
}
/* .self{
    margin-top: 10px;
    margin-right: 19vw;
} */
.home-button {
    border:none;
    background-color: #2B2E3B;
    color: white;
}
.home-sousuo{
    width: 520px;
    float: left;
    margin-left: 300px;
}
.home-input{
    width: 400px;
    margin-top: 20px;
}
.gouwuche{
    float: right;
    margin-top: 20px;
}

.shangzuoyi{
    font-size: 18px;
}
</style>
