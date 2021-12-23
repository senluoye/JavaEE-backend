import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import da from "element-ui/src/locale/lang/da";

Vue.use(Vuex)

const moduleSoftware = {
    state: {
        //软件列表
        discountList: [],
        recommendList: [],
        winList: [],
        macList: [],
        softwareList: [],
        softwareDetail: {},
        priceList: [],
        cartList: [],
        clientList: [],
        user: {
            email: "",
            username: "",
            password: "",
            qq: "",
            wechat: "",
            phone: "",
        },
        code: -2,
        islogin: false,
        NumberList: [],
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
            // console.log(data);
            state.islogin = true;
            state.user.email = data.user.email;
            state.user.username = data.user.username;
            state.user.password = data.user.password;
            state.user.qq = data.user.qq;
            state.user.wechat = data.user.wechat;
            state.user.phone = data.user.phone;
            state.code = data.code;
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

        //添加到订单
        addToCart(context, cart) {
            axios.post("/api/addToCart", {
                client_id: cart.client_id,
                cart_software: cart.cart_software,
                cart_softwarename: cart.cart_softwarename,
                cart_price: cart.cart_price,
                cart_count: cart.cart_count,
                cart_period: cart.cart_period,
                cart_picurl: cart.cart_picurl,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.data === 200)
                    return res.data;
            })
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



        //获取主页应该加载的列表
        getHomePageSoftwares(context) {
            axios.get("/api/getHomePageSoftwares", {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200)
                    return res.data;
            }).then((json) => {
                setTimeout(() => {
                    context.commit("setDiscountList", Array.from(json.discountList));
                    // 设置上面vuex的状态
                    context.commit("setRecommendList", Array.from(json.recommendList));
                    context.commit("setWinList", Array.from(json.winList));
                    context.commit("setMacList", Array.from(json.macList));
                })
            })
        },

        //拿到软件列表
        getSoftwares(context) {
            axios.get("/api/getSoftwares", {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200)
                    return res.data;
            }).then((json) => {
                setTimeout(() => {
                    context.commit("setSoftwareList", Array.from(json.data));
                })
            })
        },

        //获取软件详细信息
        getSoftwareDetail(context, software_id) {
            axios.post("/api/getSoftwareDetail", {
                software_id: software_id,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200)
                    return res.data;
            }).then((json) => {
                setTimeout(() => {
                    // console.log("下面是软甲详细asssss")
                    // console.log(json);
                    context.commit("setSoftwareDetail", json.software);
                    context.commit("setPriceList", Array.from(json.price));
                }, 50)
            })
        },

        //获取订单
        getShoppingCart(context, cart_user) {
            axios.post("/api/getShoppingCart", {
                cart_user: cart_user,
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
                    context.commit("setCartList", json.data);
                }, 50)
            })
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
            axios.post("/api/register", {
                username: user.username,
                password: user.password,
                email: user.email,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200)
                    return res.data;
            }).then((json) => {
                // if (json == 1)
                console.log("json:")
                console.log(json)
            })
        },

        // 登陆
        login(context, user) {
            axios.post("/api/login", {
                email: user.email,
                password: user.password,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200) {
                    console.log("返回的信息：");
                    console.log(res.data);
                    return res.data;
                }
            }).then((json) => {
                console.log(json);
                setTimeout(() => {
                    if (json.code == 1)
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

        deleteFromCart(context, cart_id) {
            axios.post("/api/deleteFromCart", {
                cart_id: cart_id,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200)
                    return res.data;
            })
        },

        deleteFromClient(context, clent_id) {
            axios.post("/api/deletefromclient", {
                clent_id: clent_id,
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                }
            }).then((res) => {
                if (res.status === 200)
                    return res.data;
            })
        }
    }
}

export default new Vuex.Store({
    modules: {
        software: moduleSoftware
    }
})