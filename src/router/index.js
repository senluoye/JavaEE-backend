import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Shouye from '../components/Shouye.vue'
import Commodity from '../components/Commodity.vue'
import Order from '../components/Order.vue'
import changeDetails from '../components/changeDetails.vue'
import Self from '../views/self'
import Client from '../components/Client'
import addComnunity from '../components/addComnunity'
import goumai from '../components/goumai'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/shouye',
        name: 'Home',
        component: Home,
        children: [{
                path: '/shouye',
                name: 'Shouye',
                component: Shouye
            },
            {
                path: '/client',
                name: 'Client',
                component: Client
            },
            {
                path: '/commodity',
                name: 'commodity',
                component: Commodity
            },
            {
                path: '/order',
                name: 'Order',
                component: Order
            },
            {
                path: '/self',
                name: 'Self',
                component: Self
            },
            {
                path: '/changedetails',
                name: 'changeDetails',
                component: changeDetails
            },
            {
                path: '/addcomnunity',
                name: 'addComnunity',
                component: addComnunity
            },
            {
                path: '/goumai',
                name: 'goumai',
                component: goumai
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
]

const router = new VueRouter({
    // base: '/vue3/',
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router