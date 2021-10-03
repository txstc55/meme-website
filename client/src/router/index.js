import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Image",
        component: () => import("../views/Image.vue"),
    },
    {
        path: "/gif",
        name: "Gif",
        component: () => import("../views/Gif.vue"),
    },
    {
        path: "/video",
        name: "Video",
        component: () => import("../views/Video.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
