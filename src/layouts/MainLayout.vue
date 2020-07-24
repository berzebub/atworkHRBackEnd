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
        <div v-if="$route.name == 'reward'" class="q-ml-sm text-h6">รางวัล</div>
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
      content-class="bg-blue-10"
      v-if="isLoadUserInfo"
    >
      <!-- KPI -->
      <div
        @click="$route.name != 'kpi' ? $router.push('/kpi') : null"
        class="cursor-pointer relative-position"
        :class="$route.name == 'kpi' ? 'bg-light-blue-7' : null"
        align="center"
        v-ripple
        v-if="userInfo.permissions.includes('kpi')"
      >
        <div class="row">
          <div
            v-if="$route.name == 'kpi'"
            class="bg-white"
            style="width:7px"
          ></div>
          <div
            v-if="$route.name != 'kpi'"
            class="bg-blue-10"
            style="width:7px"
          ></div>
          <div class="q-pa-sm col">
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
        </div>
        <q-separator />
      </div>
      <!-- รายงาน -->
      <div
        @click="$route.name != 'report' ? $router.push('/report') : null"
        class="cursor-pointer relative-position"
        :class="$route.name == 'report' ? 'bg-light-blue-7' : null"
        align="center"
        v-ripple
        v-if="userInfo.permissions.includes('report')"
      >
        <div class="row">
          <div
            v-if="$route.name == 'report'"
            class="bg-white"
            style="width:7px"
          ></div>
          <div
            v-if="$route.name != 'report'"
            class="bg-blue-10"
            style="width:7px"
          ></div>

          <div class="q-pa-sm col">
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
        </div>
        <q-separator />
      </div>
      <!-- พนักงาน -->
      <div
        @click="$route.name != 'employee' ? $router.push('/employee') : null"
        class="cursor-pointer relative-position"
        :class="$route.name == 'employee' ? 'bg-light-blue-7' : null"
        align="center"
        v-ripple
        v-if="userInfo.permissions.includes('personel')"
      >
        <div class="row">
          <div
            v-if="$route.name == 'employee'"
            class="bg-white"
            style="width:7px"
          ></div>
          <div
            v-if="$route.name != 'employee'"
            class="bg-blue-10"
            style="width:7px"
          ></div>

          <div class="q-pa-sm col">
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
        </div>
        <q-separator />
      </div>
      <!-- รางวัล -->

      <div
        @click="$route.name != 'reward' ? $router.push('/reward') : null"
        class="cursor-pointer relative-position"
        :class="$route.name == 'reward' ? 'bg-light-blue-7' : null"
        align="center"
        v-ripple
        v-if="userInfo.permissions.includes('reward')"
      >
        <div class="row">
          <div
            v-if="$route.name == 'reward'"
            class="bg-white"
            style="width:7px"
          ></div>
          <div
            v-if="$route.name != 'reward'"
            class="bg-blue-10"
            style="width:7px"
          ></div>

          <div class="q-pa-sm col">
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
        </div>
        <q-separator />
      </div>
      <!-- ฝ่ายบุคคล -->
      <div
        @click="
          $route.name != 'departmentMain'
            ? $router.push('/departmentMain')
            : null
        "
        class="cursor-pointer relative-position"
        :class="$route.name == 'departmentMain' ? 'bg-light-blue-7' : null"
        align="center"
        v-ripple
        v-if="userInfo.isHrAdmin"
      >
        <div class="row">
          <div
            v-if="$route.name == 'departmentMain'"
            class="bg-white"
            style="width:7px"
          ></div>
          <div
            v-if="$route.name != 'departmentMain'"
            class="bg-blue-10"
            style="width:7px"
          ></div>

          <div class="q-pa-sm col">
            <div>
              <q-img
                src="../../public/statics/hricon.png"
                style="height:35px; max-width: 35px"
              />
            </div>
            <div class="q-mt-xs text-body2 text-white">ฝ่ายบุคคล</div>
          </div>
        </div>
        <q-separator />
      </div>
      <!-- ตั้งค่า -->
      <div
        @click="$route.name != 'setting' ? $router.push('/setting') : null"
        class="cursor-pointer relative-position"
        :class="$route.name == 'setting' ? 'bg-light-blue-7' : null"
        align="center"
        v-ripple
      >
        <div class="row">
          <div
            v-if="$route.name == 'setting'"
            class="bg-white"
            style="width:7px"
          ></div>
          <div
            v-if="$route.name != 'setting'"
            class="bg-blue-10"
            style="width:7px"
          ></div>

          <div class="q-pa-sm col">
            <div>
              <q-icon
                class="q-pt-sm"
                size="md"
                color="white"
                name="fas fa-cog"
              />
            </div>
            <div class="q-mt-xs text-body2 text-white">ตั้งค่า</div>
          </div>
        </div>
        <q-separator />
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { db, auth, axios } from "../router";

export default {
  name: "MainLayout",

  data() {
    return {
      drawer: true,
      userInfo: {},
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
      this.loadingShow();
      auth.onAuthStateChanged(async user => {
        if (user) {
          // กรณี Login อยู่ในระบบ
          let apiURL =
            "https://us-central1-atwork-dee11.cloudfunctions.net/atworkFunctions/getUserData?uid=" +
            user.uid;
          let getData = await axios.get(apiURL);
          this.userInfo.permissions =
            getData.data.customClaims.dataEntryPermissions;
          this.userInfo.isHrAdmin = getData.data.customClaims.isHrAdmin;
          this.isLoadUserInfo = true;
          this.loadingHide();
        } else {
          this.loadingHide();
          this.$router.push("/");
          this.$q.localStorage.clear();
        }
      });
    }
  },
  mounted() {
    this.loadUserInfo();
  }
};
</script>
