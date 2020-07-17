const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("pages/login.vue")
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
