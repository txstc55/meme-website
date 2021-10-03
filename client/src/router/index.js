import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "About",
        component: () => import("../views/About.vue"),
    },
    {
        path: "/image/",
        name: "Image",
        component: () => import("../views/Image.vue"),
    },
    {
        path: "/image/:id",
        name: "Image with ID",
        component: () => import("../views/Image.vue"),
    },
    {
        path: "/gif/",
        name: "Gif",
        component: () => import("../views/Gif.vue"),
    },
    {
        path: "/gif/:id",
        name: "Gif with ID",
        component: () => import("../views/Gif.vue"),
    },
    {
        path: "/video/",
        name: "Video",
        component: () => import("../views/Video.vue"),
    },
    {
        path: "/video/:id",
        name: "Video with ID",
        component: () => import("../views/Video.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
