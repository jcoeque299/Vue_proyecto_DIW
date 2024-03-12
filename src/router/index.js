import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/search",
            name: "search",
            component: () => import("../views/SearchView.vue")
        },
        {
            path: "/event/:id",
            name: "event",
            props: route => ({...route.params, id: route.params.id}),
            component: () => import("../views/EventView.vue")
        },
        {
            path: "/watched",
            name: "watched",
            component: () => import("../views/WatchedView.vue")
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
            meta: {
                requiresNoAuth: true,
            }
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/RegisterView.vue"),
            meta: {
                requiresNoAuth: true,
            }
        },
        {
            path: "/contact",
            name: "contact",
            component: () => import("../views/ContactView.vue")
        },
        {
            path: "/profile",
            name: "profile",
            component: () => import("../views/ProfileView.vue"),
            meta: {
                requiresAuth: true,
            }
        }
    ]
})
router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && !window.user) {
        return {name: "login", query: {redirect: to.fullPath}}
    }
    if(to.meta.requiresNoAuth && window.user) {
        return {name: "profile", query: {redirect: to.fullPath}}
    }
})

export default router