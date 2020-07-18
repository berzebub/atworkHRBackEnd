<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="$route.name != 'setting'">
      <q-toolbar class="bg-blue-10">
        <!-- KPI -->
        <div v-if="$route.name == 'kpi'" class="q-ml-sm text-h6">KPI</div>
        <!-- รายงาน -->
        <div v-if="$route.name == 'report'" class="q-ml-sm text-h6">รายงาน</div>
        <!-- พนักงาน -->
        <div v-if="$route.name == 'employee'" class="q-ml-sm text-h6">
          พนักงาน
        </div>
        <!-- รางวัล -->
        <div v-if="$route.name == 'reward'" class="q-ml-sm text-h6">วางวัล</div>
        <!-- ฝ่ายบุคคล -->
        <div v-if="$route.name == 'departmentMain'" class="q-ml-sm text-h6">
          ฝ่ายบุคคล
        </div>
        <!-- เพิ่มพนักงาน -->
        <div v-if="$route.name == 'departmentAdd'" class="q-ml-sm text-h6">
          <div class="row">
            <div
              class="cursor-pointer"
              @click="$router.push('/departmentMain')"
            >
              <u>ฝ่ายบุคคล</u>
            </div>
            <div class="q-mx-sm">></div>
            <div>เพิ่มพนักงาน</div>
          </div>
        </div>
        <!-- แก้ไขพนักงาน -->
        <div v-if="$route.name == 'departmentEdit'" class="q-ml-sm text-h6">
          <div class="row">
            <div
              class="cursor-pointer"
              @click="$router.push('/departmentMain')"
            >
              <u>ฝ่ายบุคคล</u>
            </div>
            <div class="q-mx-sm">></div>
            <div>แก้ไขพนักงาน</div>
          </div>
        </div>

        <!-- ตั้งค่า -->
        <div v-if="$route.name == 'setting'" class="q-ml-sm text-h6">
          ตั้งต่า
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="100"
      :breakpoint="500"
      bordered
      content-class="bg-blue-10"
    >
      <!-- KPI -->
      <div
        @click="$route.name != 'kpi' ? $router.push('/kpi') : null"
        class="cursor-pointer relative-position"
        align="center"
        v-ripple
      >
        <div class="q-pa-sm">
          <div>
            <q-icon
              class="q-pt-sm"
              size="md"
              color="white"
              name="far fa-chart-bar"
            />
          </div>
          <div class="q-mt-xs text-body2 text-white">KPI</div>
        </div>
        <q-separator class />
      </div>
      <!-- รายงาน -->
      <div
        @click="$route.name != 'report' ? $router.push('/report') : null"
        class="cursor-pointer relative-position"
        align="center"
        v-ripple
      >
        <div class="q-pa-sm">
          <div>
            <q-icon
              class="q-pt-sm"
              size="md"
              color="white"
              name="fas fa-file-alt"
            />
          </div>
          <div class="q-mt-xs text-body2 text-white">รายงาน</div>
        </div>
        <q-separator class />
      </div>
      <!-- พนักงาน -->
      <div
        @click="$route.name != 'employee' ? $router.push('/employee') : null"
        class="cursor-pointer relative-position"
        align="center"
        v-ripple
      >
        <div class="q-pa-sm">
          <div>
            <q-icon
              class="q-pt-sm"
              size="md"
              color="white"
              name="fas fa-user"
            />
          </div>
          <div class="q-mt-xs text-body2 text-white">พนักงาน</div>
        </div>
        <q-separator class />
      </div>
      <!-- รางวัล -->

      <div
        @click="$route.name != 'reward' ? $router.push('/reward') : null"
        class="cursor-pointer relative-position"
        align="center"
        v-ripple
      >
        <div class="q-pa-sm">
          <div>
            <q-icon
              class="q-pt-sm"
              size="md"
              color="white"
              name="fas fa-gift"
            />
          </div>
          <div class="q-mt-xs text-body2 text-white">รางวัล</div>
        </div>
        <q-separator class />
      </div>
      <!-- ฝ่ายบุคคล -->
      <div
        @click="
          $route.name != 'departmentMain'
            ? $router.push('/departmentMain')
            : null
        "
        class="cursor-pointer relative-position"
        align="center"
        v-ripple
      >
        <div class="q-pa-sm">
          <div>
            <q-img
              src="../../public/statics/hricon.png"
              style="height:35px; max-width: 35px"
            />
          </div>
          <div class="q-mt-xs text-body2 text-white">ฝ่ายบุคคล</div>
        </div>
        <q-separator class />
      </div>
      <!-- ตั้งค่า -->
      <div
        @click="$route.name != 'setting' ? $router.push('/setting') : null"
        class="cursor-pointer relative-position"
        align="center"
        v-ripple
      >
        <div class="q-pa-sm">
          <div>
            <q-icon class="q-pt-sm" size="md" color="white" name="fas fa-cog" />
          </div>
          <div class="q-mt-xs text-body2 text-white">ตั้งค่า</div>
        </div>
        <q-separator class />
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { db, auth } from "../router";

export default {
  name: "MainLayout",

  data() {
    return {
      drawer: true,
      userInfo: "",
      isLoadUserInfo: false,
      isKey: false,
      loginKey: "",
      leftDrawerOpen: false,
      headerBarList: [
        {
          name: "บทเรียน",
          type: "lessonMainList"
        }
      ]
    };
  },
  methods: {
    async loadUserInfo() {
      let getLoginKey = this.$q.localStorage.getItem("loginKey");
      let uid = this.$q.localStorage.getItem("uid");
      this.userInfo = await this.getUserInfo(uid);
      this.isLoadUserInfo = true;
      this.snapUser = db
        .collection("user_admin")
        .where("uid", "==", uid)
        .onSnapshot(getUserId => {
          if (getLoginKey != getUserId.docs[0].data().loginKey) {
            this.snapUser();
            setTimeout(() => {
              this.loadingHide();
              this.logOut();
            }, 2000);
          }
        });
    }
  },
  mounted() {
    this.loadUserInfo();
  }
};
</script>
