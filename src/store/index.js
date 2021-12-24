import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import da from "element-ui/src/locale/lang/da";

Vue.use(Vuex)

const moduleSoftware = {
    state: {
        //软件列表
        softwareList: [],
        softwareDetail: null,
        user: {
            id: "",
            name: "",
            password: "",
        },
        code: -2,
        NumberList: [],
        token: '',
    },
    mutations: {
        setDiscountList(state, data) {
            state.discountList = data;
        },
        setRecommendList(state, data) {
            state.recommendList = data;
        },
        setWinList(state, data) {
            state.winList = data;
        },
        setMacList(state, data) {
            state.macList = data;
        },
        setSoftwareList(state, data) {
            state.softwareList = data;
        },
        setSoftwareDetail(state, data) {
            state.softwareDetail = data;
        },
        setPriceList(state, data) {
            state.priceList = data;
        },
        setCartList(state, data) {
            state.cartList = data;
        },
        setClientList(state, data) {
            state.clientList = data;
        },
        setUserDetails(state, data) {
            state.islogin = true;
            state.user.id = data.data.id;
            state.user.name = data.data.name;
            state.user.password = data.data.password;
            state.token = data.data.token;
            localStorage.token = data.data.token;
            localStorage.id = data.data.id;
            localStorage.name = data.data.name;
            localStorage.password = data.data.password;
        },
        setNumberList(state, data) {
            state.NumberList = data;
        }
    },
    actions: {
        deleteCommunity(context, software_id) {
            axios.post("/api/deletecommunity", {
                software_id: software_id,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    return res.data;
                }
            })
        },

        changeUser(context, details) {
            axios.post("/api/changeuser", {
                email: details.email,
                username: details.username,
                qq: details.qq,
                wechat: details.wechat,
                phone: details.phone,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    return res.data;
                }
            })
        },

        zhuxiao(context, email) {
            axios.post("/api/zhuxiao", {
                email: email,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    return res.data;
                }
            })
        },

        changeDetails(context, details) {
            axios.post("/api/changedetails", {
                software_id: details.softwareid,
                price_id: details.priceid,
                software_name: details.softwarename,
                price_value: details.softwareprice,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    return res.data;
                }
            })
        },

        //修改商品信息
        modify(context, commodity) {
            axios({
                url: '/api/admin/modify',
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                },
                data: commodity
            }).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            });
        },


        // 获得主页信息
        getNumber(context) {
            axios.get("/api/getNumber", {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200)
                    return res.data;
            }).then((json) => {
                setTimeout(() => {
                    context.commit("setNumberList", Array.from(json.NumberList));
                })
            })
        },

        //拿到商品列表
        getSoftwares(context) {
            axios.get("/api/admin", {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                    token: localStorage.getItem('token')
                }
            }).then((res) => {
                if (res.status === 200)
                    return res.data;
            }).then((json) => {
                setTimeout(() => {
                    console.log(json)
                    context.commit("setSoftwareList", Array.from(json.data));
                })
            })
        },

        //增加商品
        addGoods(context, data) {
            axios({
                url: '/api/admin/add',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: localStorage.getItem('token')
                },
                data: data
            }).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            });
        },

        //获取客户
        getClient(context) {
            axios.get("/api/getclient", {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200)
                    return res.data;
            }).then((json) => {
                setTimeout(() => {
                    console.log(json);
                    context.commit("setClientList", json.data);
                }, 50)
            })
        },

        // 注册
        register(context, user) {
            console.log(user);
            axios.post("/api/user/register", {
                name: user.name,
                password: user.password,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200)
                    return res.data;
            })
        },

        // 登陆
        login(context, user) {
            axios.post("/api/user/login", {
                name: user.name,
                password: user.password,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200) {
                    return res.data;
                }
            }).then((json) => {
                setTimeout(() => {
                    if (json.code == 0)
                        context.commit("setUserDetails", json);
                })
            })
        },

        changeQuantity(context, cart) {
            axios.post("/api/changeQuantity", {
                cart_id: cart.id,
                cart_count: cart.count,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200)
                    return res.data;
            })
        },

        deleteById(context, id) {
            axios({
                url: '/api/admin/del',
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                },
                data: id
            }).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            });
        },


    }
}

export default new Vuex.Store({
    modules: {
        software: moduleSoftware
    }
})