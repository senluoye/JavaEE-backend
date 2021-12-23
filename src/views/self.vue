<template>
    <div class="app" v-bind="this.user">
        <div v-if="islogin">请先登陆</div>
        <div class="from" v-else>
            <div class="top"></div>
            <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <h3><i class="el-icon-message"></i>邮箱</h3>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div  class="aa">
                        {{this.user.email}}
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <h3><i class="el-icon-lollipop"></i>昵称</h3>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div v-if="ischange"  class="aa">
                        {{this.user.username}}
                    </div>
                    <div id="input1" class="grid-content bg-purple-light" v-else>
                        <h3>
                            <el-input v-model="user.username" placeholder="请输入内容"></el-input>
                        </h3>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                    <h3><i class="el-icon-phone"></i>手机</h3>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div v-if="ischange" class="aa">
                        {{this.user.phone}}
                    </div>
                    <div id="input3" class="grid-content bg-purple-light" v-else>
                        <h3>
                            <el-input v-model="user.phone" placeholder="请输入内容"></el-input>
                        </h3>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <h3><i class="el-icon-chat-dot-round"></i>微信</h3>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div v-if="ischange"  class="aa">
                        {{this.user.wechat}}
                    </div>
                    <div id="input4" class="grid-content bg-purple-light" v-else>
                        <h3>
                            <el-input v-model="user.wechat" placeholder="请输入内容"></el-input>
                        </h3>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" class="row-bg">
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <h3><i class="el-icon-chat-dot-square"></i>QQ</h3>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div v-if="ischange" class="aa">
                        {{this.user.qq}}
                    </div>
                    <div id="input5" class="grid-content bg-purple-light" v-else>
                        <h3>
                            <el-input v-model="user.qq" placeholder="请输入内容"></el-input>
                        </h3>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="buttom">
                <el-col :span="6" >
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="tuichu">退出登录</el-button>
                    </div>
                </el-col>
                <el-col :span="6" >
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="zhuxiao">注销账号</el-button>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple" v-if="ischange">
                        <el-button type="primary" @click="change" >修改信息</el-button>
                    </div>
                    <div class="grid-content bg-purple" v-else>
                        <el-button type="primary" @click="surechange">确认修改</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            user:{
                username:"",
                email:"",
                qq:"",
                wechat:"",
                phone:""
            },
            ischange:true
        }
    },
    methods:{
        zhuxiao(){
            console.log(this.$store.state.software.user)
            this.$store.dispatch("zhuxiao", this.user.email);
            this.$alert('注销成功', '提示', {
            confirmButtonText: '确定',
            callback: action => {
                this.$message({
                type: 'info',
                message: `action: ${ action }`
                });
                }
            });
            this.$store.state.software.islogin = false;
        },
        surechange(){
            this.$store.dispatch("changeUser", {
            email: this.user.email,
            username: this.user.username,
            qq: this.user.qq,
            wechat: this.user.wechat,
            phone: this.user.phone
            });
            this.ischange = true
        },
        tuichu(){
            this.$store.state.software.islogin = false
        },
        change(){
            this.ischange = false
        }
    },
    computed:{
        islogin(){
            return !this.$store.state.software.islogin
        },
    },
    mounted() {
        this.user.username = this.$store.state.software.user.username;
        this.user.email = this.$store.state.software.user.email;
        if(this.$store.state.software.user.phone === "0")
            this.user.phone = "未设置";
        if(this.$store.state.software.user.qq == "0")
            this.user.qq = "未设置";
        if(this.$store.state.software.user.wechat == "0")
            this.user.wechat = "未设置";
        console.log(this.$store.state.software.user)
        console.log(this.user)
  }
}
</script>

<style scoped>
.aa{
    margin-top: 20px;
}
.buttom{
    margin-top: 10vh;
    /* margin-left: 20vw; */
    width: 40vw;
}
.top{
    height: 10vh;
}
.app{
    background-color: white;
}
.from{
    margin-left: 20vw;
    /* margin-top: 0vh; */
    width: 60vw;
    height: 60vh;
}

</style>