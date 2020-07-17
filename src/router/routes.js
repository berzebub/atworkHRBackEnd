const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("pages/login.vue")
  },
  {
    path: "/forgetPassword",
    name: "Login",
    component: () => import("pages/forgetPassword.vue")
  },
  {
    path: "/welcomeBack",
    component: () => import("pages/welcomeBack.vue")
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "test", component: () => import("pages/Index.vue") },
      // ฝ่ายบุคคล
      {
        path: "/departmentMain",
        name: "departmentMain",
        component: () => import("pages/departmentMain.vue")
      },
      // รายงาน
      {
        path: "/report",
        name: "report",
        component: () => import("pages/report.vue")
      },
      // พนักงาน
      {
        path: "/employee",
        name: "employee",
        component: () => import("pages/employee.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
