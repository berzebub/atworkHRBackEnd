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
    path: "/genEmulators",
    component: () => import("pages/genEmulators.vue")
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
      {
        path: "/departmentAdd",
        name: "departmentAdd",
        component: () => import("pages/departmentInput.vue")
      },
      {
        path: "/departmentEdit/",
        name: "departmentEdit",
        component: () => import("pages/departmentInput.vue")
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
      },
      // KPI
      {
        path: "/kpi",
        name: "kpi",
        component: () => import("pages/kpi.vue")
      },
      //reward - วางวัล
      {
        path: "/reward",
        name: "reward",
        component: () => import("pages/reward.vue")
      },
      //ตั้งค่า
      {
        path: "/setting",
        name: "setting",
        component: () => import("pages/setting.vue")
      }
    ]
  },
  // พนักงานปริ้น
  {
    path: "/employeePrint",
    name: "employeePrint",
    component: () => import("pages/employeePrint.vue")
  },
  // รายงานปริ้น
  {
    path: "/reportPrint",
    name: "reportPrint",
    component: () => import("pages/reportPrint.vue")
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
