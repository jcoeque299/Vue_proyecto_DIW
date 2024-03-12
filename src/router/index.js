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
            component: () => import("../views/LoginView.vue")
        },
        {
            path: "/contact",
            name: "contact",
            component: () => import("../views/ContactView.vue")
        },
        {
            path: "/profile",
            name: "profile",
            component: () => import("../views/ProfileView.vue")
        }
    ]
})

export default router