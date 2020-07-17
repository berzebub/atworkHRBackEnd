<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-blue-10"></q-toolbar>
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
            <q-icon class="q-pt-sm" size="md" color="white" name="far fa-chart-bar" />
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
            <q-icon class="q-pt-sm" size="md" color="white" name="fas fa-file-alt" />
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
            <q-icon class="q-pt-sm" size="md" color="white" name="fas fa-user" />
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
            <q-icon class="q-pt-sm" size="md" color="white" name="fas fa-gift" />
          </div>
          <div class="q-mt-xs text-body2 text-white">รางวัล</div>
        </div>
        <q-separator class />
      </div>
      <!-- ฝ่ายบุคคล -->
      <div
        @click="$route.name != 'departmentMain' ? $router.push('/departmentMain') : null"
        class="cursor-pointer relative-position"
        align="center"
        v-ripple
      >
        <div class="q-pa-sm">
          <div>
            <q-img src="../../public/statics/hricon.png" style="height:35px; max-width: 35px" />
          </div>
          <div class="q-mt-xs text-body2 text-white">ฝ่ายบุคคล</div>
        </div>
        <q-separator class />
      </div>
      <!-- ตั้งค่า -->
      <div
        @click="$route.name != 'report' ? $router.push('/report') : null"
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
