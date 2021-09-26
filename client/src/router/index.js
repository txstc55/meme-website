import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Image",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Image.vue"),
    },
    {
        path: "/gif",
        name: "Gif",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Gif.vue"),
    },
    {
        path: "/video",
        name: "Video",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Video.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
