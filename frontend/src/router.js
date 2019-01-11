import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { define } from "./resources/ability";
import { path } from "ramda";

const requireAuth = (to, from, next) => {
  const abilities = define()
  const permission = path(["meta", "permission"], to);
  if (permission && abilities.cannot(permission[0], permission[1])) {
    const redirect = path(["meta", "redirect"], to);
    if(redirect) {
      next(redirect);
    } else {
      next("/fe/login");
    }
  }
  next();
};

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/",
      alias: "/fe/tools",
      name: "tools",
      component: () => import("./views/Tools.vue"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "Tools"],
        redirect: "/fe/login"
      }
    },
    {
      path: "/fe/tools/categories",
      name: "categories",
      component: () => import("./views/ToolCategories.vue"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "Categories"],
        redirect: "/fe/login"
      }
    },
    {
      path: "/fe/tools/revision-type",
      name: "revision-type",
      component: () => import("./views/ToolRevisionType.vue"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "RevisionType"],
        redirect: "/fe/login"
      }
    },
    {
      path: "/fe/tools/revision-type/:id",
      name: "revision-type-detail",
      component: () => import("./views/ToolRevisionTypeDetail.vue"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "RevisionTypeDetail"],
        redirect: "/fe/login"
      }
    },
    {
      path: "/fe/tools/revision-upcoming",
      name: "revision-upcoming",
      component: () => import("./views/ToolRevisionUpcoming.vue"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "RevisionUpcoming"],
        redirect: "/fe/login"
      }
    },
    {
      path: "/fe/move-history",
      name: "move-history",
      component: () => import("./views/MoveHistory.vue"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "MoveHistory"],
        redirect: "/fe/login"
      }
    },
    {
      path: "/pdf",
      name: "PDF",
      component: () => import("./views/PDF.vue")
    },
    {
      path: "/fe/move-in-stock",
      name: "move-in-stock",
      component: () => import("./views/MoveInStock"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "MoveInStock"],
        redirect: "/fe/login"
      }
    },
    {
      path: "/fe/users",
      name: "users",
      component: () => import("./views/Users"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "Users"],
        redirect: "/fe/login"
      }
    },
    {
      path: "/fe/warehouse",
      name: "warehouse",
      component: () => import("./views/Warehouse"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "Warehouse"],
        redirect: "/fe/login"
      }
    },
    {
      path: "/fe/task",
      name: "task",
      component: () => import("./module/task/views/TaskTable"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "Task"],
        redirect: "/fe/login"
      }
    },
    {
      path: "/fe/login",
      name: "login",
      component: () => import("./views/Login")
    },
    {
      path: "/a",
      name: "a",
      component: () => import("./module/tool/ToolsTable")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
