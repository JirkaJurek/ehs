import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { define } from "./resources/ability";
import { path, propEq, find } from "ramda";
import tool from "./store/tool";

const requireAuth = (to, from, next) => {
  const abilities = define();
  const permission = path(["meta", "permission"], to);
  if (permission && abilities.cannot(permission[0], permission[1])) {
    const redirect = path(["meta", "redirect"], to);
    const page = find(propEq("actions", "page"), abilities.rules);
    if (redirect) {
      return next(redirect);
    } else if (page) {
      alert("Nemáte dostatečná oprávnění");
      return next("/");
    }
    return next("/fe/login");
  }
  return next();
};

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "Home"]
      }
    },
    {
      path: "/fe/tools",
      name: "tools",
      component: () => import("./views/Tools.vue"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "Tool"]
      }
    },
    {
      path: "/fe/tools/categories",
      name: "categories",
      component: () => import("./views/ToolCategories.vue"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "Categories"]
      }
    },
    {
      path: "/fe/tools/revision-type",
      name: "revision-type",
      component: () => import("./views/ToolRevisionType.vue"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "RevisionType"]
      }
    },
    {
      path: "/fe/tools/revision-type/:id",
      name: "revision-type-detail",
      component: () => import("./views/ToolRevisionTypeDetail.vue"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "RevisionTypeDetail"]
      }
    },
    {
      path: "/fe/tools/revision-upcoming",
      name: "revision-upcoming",
      component: () => import("./views/ToolRevisionUpcoming.vue"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "RevisionUpcoming"]
      }
    },
    {
      path: "/fe/move-history",
      name: "move-history",
      component: () => import("./views/MoveHistory.vue"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "MoveHistory"]
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
        permission: ["ReceiverAndExporter", "Stock"]
      }
    },
    {
      path: "/fe/users",
      name: "users",
      component: () => import("./views/Users"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "User"]
      }
    },
    {
      path: "/fe/warehouse",
      name: "warehouse",
      component: () => import("./views/Warehouse"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "Warehouse"]
      }
    },
    {
      path: "/fe/task",
      name: "task",
      component: () => import("./module/task/views/PreviewTasks"),
      beforeEnter: requireAuth,
      meta: {
        permission: ["page", "Task"]
      }
    },
    {
      path: "/fe/login",
      name: "login",
      component: () => import("./views/Login")
    },
    {
      path: "/fe/logout",
      name: "logout",
      beforeEnter: (to, from, next) => {
        localStorage.basicToken = '';
        location.href = "/";
      }
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
